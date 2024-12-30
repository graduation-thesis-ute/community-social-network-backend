import { Response } from "express";
import {
  SuccessResponse,
  ErrorResponse,
} from "../interfaces/api-response.interface";

class APIResponse {
  static success<T>(
    res: Response,
    statusCode: number = 200,
    message: string = "Request successful",
    data?: T
  ): void {
    const response: SuccessResponse<T> = {
      status: "success",
      message,
      data,
    };
    res.status(statusCode).json(response);
  }

  static fail(
    res: Response,
    statusCode: number = 400,
    message: string = "Request failed",
    errors: any[] = []
  ): void {
    const response: ErrorResponse = {
      status: "fail",
      message,
      errors,
    };
    res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    statusCode: number = 500,
    message: string = "Internal server error",
    errors: any[] = []
  ): void {
    const response: ErrorResponse = {
      status: "error",
      message,
      errors,
    };
    res.status(statusCode).json(response);
  }
}

export { APIResponse };
