const Song = require("../models/song");
const { v4: uuidv4 } = require("uuid");

exports.getAllSongs = async (req, res) => {
  try {
    let songs;
    const { category, limit } = req.params;
    if (category === "all") {
      songs = await Song.find({}).limit(limit);
    } else if (category === "weekly") {
      songs = await Song.find({}).sort({ wnol: -1 }).limit(limit);
    } else if (category === "new-releases") {
      songs = await Song.find({}).sort({ releaseDate: -1 }).limit(limit);
    } else if (category === "trending") {
      songs = await Song.find({}).sort({ wnol: -1 }).limit(limit);
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid category" });
    }
    if (songs) {
      res.status(200).json({ success: true, data: songs });
    } else {
      res.status(404).json({ success: false, message: "No songs found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findOne({ id: req.params.id });
    if (song) {
      res.status(200).json({ success: true, data: song });
    } else {
      res.status(404).json({ success: false, message: "Song not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.createSong = async (req, res) => {
  try {
    const createdSong = await Song.create({
      id: uuidv4(),
      name: req.body.name,
      url: req.body.url,
      artists: [],
      nol: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      time: req.body.time,
      releaseDate: req.body.releaseDate,
      wnol: 0,
    });
    if (createdSong) {
      res.status(201).json({
        success: true,
        message: "Song created successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Song not created" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        url: req.body.url,
        time: req.body.time,
        releaseDate: req.body.releaseDate,
        artists: req.body.artists,
        updatedAt: new Date(),
      }
    );
    if (updatedSong) {
      res.status(200).json({
        success: true,
        message: "Song updated successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Song not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findOneAndDelete({ id: req.params.id });
    if (deletedSong) {
      res
        .status(200)
        .json({ success: true, message: "Song deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Song not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) });
  }
};
