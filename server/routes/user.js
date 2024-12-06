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
 * /songs/{category}/{limit}:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of the song to retrieve
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *         description: The number of songs to retrieve
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
 *                         type: number
 *                         description: Duration of the song
 *                         default: 1
 *                       releaseDate:
 *                         type: string
 *                         format: date-time
 *                         description: Release date of the song
 *                       shareLink:
 *                         type: string
 *                         description: Share link of the song
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   default: false
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get("/:category/:limit", songController.getAllSongs);

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
 *         description: Song found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The song ID
 *                     name:
 *                       type: string
 *                       description: The song name
 *                     url:
 *                       type: string
 *                       description: The song URL
 *                     artists:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of song artists
 *                     nol:
 *                       type: number
 *                       description: Number of likes
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Creation date of the song
 *                     time:
 *                       type: number
 *                       description: Duration of the song
 *                       default: 1
 *                     releaseDate:
 *                       type: string
 *                       format: date-time
 *                       description: Release date of the song
 *                     shareLink:
 *                       type: string
 *                       description: Share link of the song
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   default: false
 *                 error:
 *                   type: string
 *                   description: Error message
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
 *               name:
 *                 type: string
 *                 description: The song name
 *               url:
 *                 type: string
 *                 description: The song URL
 *               artists:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of song artists
 *               time:
 *                 type: number
 *                 description: Duration of the song
 *                 default: 1
 *               releaseDate:
 *                 type: string
 *                 format: date-time
 *                 description: Release date of the song
 *             required:
 *              - name
 *              - url
 *              - artists
 *              - time
 *              - releaseDate
 *     responses:
 *       201:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   default: false
 *                 error:
 *                   type: string
 *                   description: Error message
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
 *              name:
 *                type: string
 *                description: The song name
 *              url:
 *                type: string
 *                description: The song URL
 *              artists:
 *                type: array
 *                items:
 *                  type: string
 *                  description: List of song artists
 *              time:
 *                type: number
 *                description: Duration of the song
 *                default: 1
 *              releaseDate:
 *                type: string
 *                format: date-time
 *                description: Release date of the song
 *             required:
 *              - name
 *              - url
 *              - artists
 *              - time
 *              - releaseDate
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   default: false
 *                 error:
 *                   type: string
 *                   description: Error message
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
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   default: false
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.delete("/:id", songController.deleteSong);

module.exports = router;
