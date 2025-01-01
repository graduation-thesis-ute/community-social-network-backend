import mongoose, { Schema, Document } from "mongoose";
import { schemaOptions } from "../utils/schema.util";

export interface IPermission {
  name: string;
  groupName: string;
  permissionCode: string;
}

const PermissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    permissionCode: {
      type: String,
      required: true,
    },
  },
  schemaOptions
);

export const Permission = mongoose.model<IPermission>(
  "Permission",
  PermissionSchema
);
