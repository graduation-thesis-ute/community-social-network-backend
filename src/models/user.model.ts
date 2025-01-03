import mongoose from "mongoose";
import { formatDate, schemaOptions } from "../utils/schema.util";
import { IRole } from "./role.model";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  memberId: string;
  phone?: string | null;
  birthDate?: Date;
  otp?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  status: 0 | 1;
  secretKey?: string | null;
  role: mongoose.Types.ObjectId | IRole;
  isSuperAdmin: 0 | 1;
  lastLogin: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    birthDate: {
      type: Date,
      default: null,
      get: formatDate,
    },
    otp: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      enum: [0, 1], // 0: inactive, 1: active
      default: 0,
    },
    secretKey: {
      type: String,
      default: null,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    isSuperAdmin: {
      type: Number,
      enum: [0, 1], // 0: inactive, 1: active
      default: 0,
    },
    lastLogin: {
      type: Date,
      default: new Date(),
    },
  },
  schemaOptions
);

export const User = mongoose.model<IUser>("User", UserSchema);
