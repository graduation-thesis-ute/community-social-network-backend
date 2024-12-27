import express, { Request, Response } from "express";
import upload from "../middlewares/upload";

const router = express.Router();

// Test route to check if the server is running
router.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response): void => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
      const file = req.file as Express.Multer.File;

      res.status(200).json({
        message: "File uploaded successfully",
        url: file.path,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Error uploading file" });
    }
  }
);

export default router;
