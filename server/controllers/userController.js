const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const {
  createTokens,
  verifyRefreshToken,
} = require("../utils/tokenController");
const crypto = require("crypto");
const { sendMail } = require("../utils/mailController");

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
      res.status(400).json({ success: false, message: "Account not found" });
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
      const clientUrl = process.env.CLIENT_URL;
      const data = {
        to: user.email,
        subject: "Password reset",
        text: "Reset your password",
        html: `This message is sent to reset your password. Click <a href="${clientUrl}/reset-password/${user.id}">here</a> to reset your password<br/>If you didn't request this, you can ignore this email`,
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
            .json({ success: false, error: "Something went wrong" });
        }
      });
    } else {
      res.status(400).json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
      user.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
      await user.save();
      res.status(200).json({ success: true, message: "Password updated" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};
