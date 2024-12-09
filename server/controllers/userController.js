const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { createTokens, verifyRefreshToken } = require("./tokenController");
const crypto = require("crypto");

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
    console.log("register error", error);
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
    console.log("login error", error);
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

exports.refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.headers.authorization.split(" ")[1];
    console.log("refreshToken", refreshToken);
    
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
    console.log("refreshTokens error", error);
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};
