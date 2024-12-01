const Song = require("../models/song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.status(200).json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
};

exports.createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({
      success: true,
      message: "Song created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Song updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
};
