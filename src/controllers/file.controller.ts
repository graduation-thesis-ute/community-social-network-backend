import { Request, Response } from "express";
import { APIResponse } from "../utils/api-response.util";

// Upload a new file (image) to the cloudinary
const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      return APIResponse.fail(res, 400, "File is required");
    }

    const file = req.file as Express.Multer.File;
    return APIResponse.success(res, 201, "File uploaded successfully", file);
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return APIResponse.error(res, 500, "Error uploading file", [error.message]);
  }
};

export { uploadFile };
