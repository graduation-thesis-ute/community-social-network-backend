import express, { Request, Response } from "express";
import upload from "../middlewares/upload.middleware";
import { uploadFile } from "../controllers/file.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/file/images:
 *   post:
 *     summary: Upload a new image file to the cloudinary
 *     tags: [File]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The image file to upload
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   example: "image-cloudinary.jpg"
 *       400:
 *         description: File is required
 *       500:
 *         description: Error uploading file
 */

router.post("/images", upload.single("file"), uploadFile);

export default router;
