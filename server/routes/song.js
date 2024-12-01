const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Endpoints for managing songs
 */

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of all songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The song ID
 *                       name:
 *                         type: string
 *                         description: The song name
 *                       url:
 *                         type: string
 *                         description: The song URL
 *                       artists:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of song artists
 *                       nol:
 *                         type: number
 *                         description: Number of likes
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Creation date of the song
 *                       time:
 *                         type: string
 *                         description: Duration of the song
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 error:
 *                   type: string
 *                   description: Error message
 *
 */
router.get("/", songController.getAllSongs);

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Get a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the song to retrieve
 *     responses:
 *       200:
 *         description: The song details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The song ID
 *                 title:
 *                   type: string
 *                   description: The song title
 *                 artist:
 *                   type: string
 *                   description: The song artist
 *       404:
 *         description: Song not found
 */
router.get("/:id", songController.getSongById);

/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the song
 *               artist:
 *                 type: string
 *                 description: The artist of the song
 *             required:
 *               - title
 *               - artist
 *     responses:
 *       201:
 *         description: Song created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", songController.createSong);

/**
 * @swagger
 * /songs/{id}:
 *   put:
 *     summary: Update a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the song to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the song
 *               artist:
 *                 type: string
 *                 description: The artist of the song
 *     responses:
 *       200:
 *         description: Song updated successfully
 *       404:
 *         description: Song not found
 */
router.put("/:id", songController.updateSong);

/**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     summary: Delete a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the song to delete
 *     responses:
 *       200:
 *         description: Song deleted successfully
 *       404:
 *         description: Song not found
 */
router.delete("/:id", songController.deleteSong);

module.exports = router;
