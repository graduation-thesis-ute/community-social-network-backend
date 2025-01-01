import mongoose, { Schema } from "mongoose";
import { schemaOptions } from "../utils/schema.util";
import { IPermission } from "./permission.model";

export interface IRole {
  name: string;
  permissions: mongoose.Types.ObjectId[] | IPermission[];
  kind: 1 | 2 | 3;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    kind: {
      type: Number,
      enum: [1, 2, 3], // 1: user, 2: manager, 3: admin
      default: 1,
    },
  },
  schemaOptions
);

export const Role = mongoose.model<IRole>("Role", RoleSchema);
