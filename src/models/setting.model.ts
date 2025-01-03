import mongoose from "mongoose";
import { schemaOptions } from "../utils/schema.util";

interface ISetting extends mongoose.Document {
  title: string;
  keyName: string;
  roleKind: 1 | 2 | 3; // 1: user, 2: manager, 3: admin
  value: number;
}

const SettingSchema = new mongoose.Schema<ISetting>(
  {
    title: {
      type: String,
      required: true,
    },
    keyName: {
      type: String,
      required: true,
    },
    roleKind: {
      type: Number,
      enum: [1, 2, 3], // 1: user, 2: manager, 3: admin
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  schemaOptions
);

export const Setting = mongoose.model<ISetting>("Setting", SettingSchema);
