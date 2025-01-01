import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.model";
import { APIResponse } from "../utils/api-response.util";
import { IUser } from "../models/user.model";
import { IRole } from "../models/role.model";
import { IPermission } from "../models/permission.model";
import { verifyAccessToken } from "../utils/jwt.util";

interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  userId: string;
  email: string;
}

const auth = (permissionCode?: string) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization) {
      APIResponse.fail(res, 401, "Unauthorized");
      return;
    }

    const token = authorization.split(" ")[1];

    try {
      const { userId } = verifyAccessToken(token) as JwtPayload;
      console.log("userId", userId);
      console.log("token", process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(userId).populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      });

      if (!user) {
        APIResponse.fail(res, 404, "User not found");
        return;
      }

      if (user.status !== 1) {
        APIResponse.fail(res, 403, "User is inactive");
        return;
      }

      if (permissionCode) {
        const hasPermission = (user.role as IRole).permissions.some(
          (perm) => (perm as IPermission).permissionCode === permissionCode
        );

        if (!hasPermission) {
          APIResponse.fail(res, 403, "Forbidden action");
          return;
        }
      }
      await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
      req.user = user;
      next();
    } catch (error: any) {
      APIResponse.error(res, 500, "Error authenticating user", [error.message]);
    }
  };
};

export { auth };
