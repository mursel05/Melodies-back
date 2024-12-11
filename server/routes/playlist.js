const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Endpoints for managing playlists
 */

/**
 * @swagger
 * /playlists/{category}/{limit}:
 *   get:
 *     summary: Get all playlists
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of the playlist to retrieve
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *         description: The number of playlists to retrieve
 *     responses:
 *       200:
 *         description: List of all playlists
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
 *                         description: The playlist ID
 *                       name:
 *                         type: string
 *                         description: The playlist name
 *                       description:
 *                         type: string
 *                         description: The playlist description
 *                       noa:
 *                         type: number
 *                         description: The number of added playlist
 *                       artists:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of playlist artists
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of playlist categories
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Creation date of the playlist
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Updation date of the playlist
 *                       time:
 *                         type: number
 *                         description: Duration of the playlist
 *                         default: 1
 *                       owner:
 *                         type: string
 *                         description: The owner of playlist
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
router.get("/:category/:limit", playlistController.getAllPlaylists);

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Get a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist to retrieve
 *     responses:
 *       200:
 *         description: Playlist found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The playlist ID
 *                       name:
 *                         type: string
 *                         description: The playlist name
 *                       description:
 *                         type: string
 *                         description: The playlist description
 *                       noa:
 *                         type: number
 *                         description: The number of added playlist
 *                       artists:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of playlist artists
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of playlist categories
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Creation date of the playlist
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Updation date of the playlist
 *                       time:
 *                         type: number
 *                         description: Duration of the playlist
 *                         default: 1
 *                       owner:
 *                         type: string
 *                         description: The owner of playlist
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
router.get("/:id", playlistController.getPlaylistById);

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The playlist name
 *               description:
 *                 type: string
 *                 description: The playlist description
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of playlist songs
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of playlist categories
 *               time:
 *                 type: number
 *                 description: Duration of the playlist
 *                 default: 1
 *             required:
 *              - name
 *              - description
 *              - songs
 *              - categories
 *              - time
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
router.post("/", playlistController.createPlaylist);

/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     summary: Update a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The playlist name
 *               description:
 *                 type: string
 *                 description: The playlist description
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of playlist songs
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of playlist categories
 *               time:
 *                 type: number
 *                 description: Duration of the playlist
 *                 default: 1
 *             required:
 *              - name
 *              - description
 *              - 
 *              - categories
 *              - time
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
router.put("/:id", playlistController.updatePlaylist);

/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     summary: Delete a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist to delete
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
router.delete("/:id", playlistController.deletePlaylist);

module.exports = router;
