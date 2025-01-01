import otpGenerator from "otp-generator";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (val: any) => {
  if (!val) return null;
  return dayjs(val).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");
};

const createSecretKey = () => {
  return otpGenerator.generate(16, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });
};

const schemaOptions = {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
};

export { formatDate, createSecretKey, schemaOptions };
