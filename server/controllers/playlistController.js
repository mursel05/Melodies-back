const Playlist = require("../models/playlist");
const { v4: uuidv4 } = require("uuid");
const { verifyAccessToken } = require("../utils/tokenController");

exports.getAllPlaylists = async (req, res) => {
  try {
    let playlists;
    const { category, limit } = req.params;
    if (category === "all") {
      playlists = await Playlist.find({}).limit(limit);
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid category, Only [all] is allowed",
      });
    }
    if (playlists) {
      res.status(200).json({ success: true, data: playlists });
    } else {
      res.status(404).json({ success: false, message: "No playlistss found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const playlist = await Playlist.findOne({ id: req.params.id });
    if (playlist) {
      res.status(200).json({ success: true, data: playlist });
    } else {
      res.status(404).json({ success: false, message: "Playlist not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const createdPlaylist = await Playlist.create({
      id: uuidv4(),
      name: req.body.name,
      noa: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      time: req.body.time,
      description: req.body.description,
      songs: req.body.songs,
      categories: req.body.categories,
      owner: decoded.sub,
    });
    if (createdPlaylist) {
      res.status(201).json({
        success: true,
        message: "Playlist created successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Playlist not created" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const playlist = await Playlist.findOne({ id: req.params.id });
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }
    if (playlist.owner !== decoded.sub) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to update this playlist",
      });
    }
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        updatedAt: new Date(),
        time: req.body.time,
        description: req.body.description,
        songs: req.body.songs,
        categories: req.body.categories,
      }
    );
    if (updatedPlaylist) {
      res.status(200).json({
        success: true,
        message: "Playlist updated successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Playlist not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const playlist = await Playlist.findOne({ id: req.params.id });
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }
    if (playlist.owner !== decoded.sub) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to delete this playlist",
      });
    }
    const deletedPlaylist = await Playlist.findOneAndDelete({
      id: req.params.id,
    });
    if (deletedPlaylist) {
      res
        .status(200)
        .json({ success: true, message: "Playlist deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Playlist not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};
