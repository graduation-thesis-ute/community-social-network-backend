import express, { Request, Response } from "express";
import upload from "../middlewares/upload.middleware";
import { uploadFile } from "../controllers/file.controller";

const router = express.Router();

router.post("/images", upload.single("file"), uploadFile);

export default router;
