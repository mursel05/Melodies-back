const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;

exports.createTokens = async (userId) => {
  try {
    const accessToken = jwt.sign({ sub: userId }, jwtSecretKey, {
      expiresIn: Number(accessTokenExpiresIn),
    });
    const refreshToken = jwt.sign({ sub: userId }, jwtSecretKey, {
      expiresIn: Number(refreshTokenExpiresIn),
    });
    const tokenData = await Token.findOne({ userId });
    if (tokenData) {
      await Token.deleteOne({ userId });
    }
    await Token.create({
      id: uuidv4(),
      token: crypto.createHash("sha256").update(refreshToken).digest("hex"),
      userId,
      expiresAt: new Date(Date.now() + Number(refreshTokenExpiresIn) * 1000),
      createdAt: new Date(),
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};

exports.verifyAccessToken = (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, jwtSecretKey);
    return decoded;
  } catch (error) {
    return null;
    // return { sub: "e3f069fc-12ec-4bac-b7ae-f7f7a17c0785" };
  }
};

exports.verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, jwtSecretKey);
    const tokenData = await Token.findOne({ userId: decoded.sub });
    if (!tokenData) {
      return null;
    } else {
      const hashToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
      if (hashToken !== tokenData.token) {
        return null;
      } else {
        return decoded;
      }
    }
  } catch (error) {
    return null;
  }
};
