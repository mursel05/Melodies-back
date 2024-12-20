const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const {
  createTokens,
  verifyRefreshToken,
} = require("../utils/tokenController");
const crypto = require("crypto");
const { sendMail } = require("../utils/mailController");
const OTPAuth = require("otpauth");
const QRCode = require("qrcode");

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    } else {
      const newUser = new User({
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("hex"),
        playlists: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        subscription: "free",
        favourites: [],
        secret: "",
      });
      await newUser.save();
      createTokens(newUser.id).then((tokens) => {
        if (tokens) {
          res.status(201).json({ success: true, data: tokens });
        } else {
          res
            .status(400)
            .json({ success: false, error: "Something went wrong" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (
        user.password ===
        crypto.createHash("sha256").update(req.body.password).digest("hex")
      ) {
        createTokens(user.id).then((tokens) => {
          if (tokens) {
            res.status(201).json({ success: true, data: tokens });
          } else {
            res
              .status(400)
              .json({ success: false, error: "Something went wrong" });
          }
        });
      } else {
        res.status(400).json({ success: false, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    verifyRefreshToken(refreshToken).then((decoded) => {
      if (decoded) {
        createTokens(decoded.sub).then((tokens) => {
          if (tokens) {
            res.status(201).json({ success: true, data: tokens });
          } else {
            res
              .status(400)
              .json({ success: false, error: "Something went wrong" });
          }
        });
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let resetToken;
      const clientUrl = process.env.CLIENT_URL;
      createTokens(user.id).then((tokens) => {
        if (tokens) {
          resetToken = tokens.accessToken;
          const data = {
            to: user.email,
            subject: "Password reset",
            text: "Reset your password",
            html: `This message is sent to reset your password. Click <a href="${clientUrl}/reset-password/${resetToken}">here</a> to reset your password<br/>If you didn't request this, you can ignore this email`,
          };
          sendMail(data).then((result) => {
            if (result) {
              res.status(200).json({
                success: true,
                message:
                  "An email has been sent to reset your password. Please check your email",
              });
            } else {
              res
                .status(400)
                .json({ success: false, error: "Cannot send email" });
            }
          });
        } else {
          res
            .status(400)
            .json({ success: false, error: "Something went wrong" });
        }
      });
    } else {
      res.status(404).json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const decoded = verifyAccessToken(req.body.token);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    const user = await User.findOne({ id: decoded.sub });
    if (user) {
      user.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
      await user.save();
      res.status(200).json({ success: true, message: "Password updated" });
    } else {
      res.status(404).json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.enable2fa = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    } else {
      const secret = new OTPAuth.Secret();
      const base32_secret = secret.base32;
      user.secret = base32_secret;
      let totp = new OTPAuth.TOTP({
        issuer: "melodies.com",
        label: "melodies",
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
      });
      let otpauth_url = totp.toString();
      QRCode.toDataURL(otpauth_url, (err, qrUrl) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: "Cannot generate QR code",
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              qrCodeUrl: qrUrl,
              secret: base32_secret,
            },
          });
        }
      });
      await user.save();
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.verify2fa = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Account not found" });
  } else {
    let totp = new OTPAuth.TOTP({
      issuer: "Melodies.com",
      label: "Melodies",
      algorithm: "SHA1",
      digits: 6,
      secret: user.secret,
    });
    let delta = totp.validate({
      token: req.body.token,
      window: 1,
    });
    if (delta === 0) {
      res.status(200).json({ success: true, message: "2FA verified" });
    } else if (delta === -1) {
      res.status(400).json({ success: false, message: "Token expired" });
    } else {
      res.status(400).json({ success: false, message: "Invalid token" });
    }
  }
};
