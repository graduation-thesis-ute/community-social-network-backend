import bcrypt from "bcryptjs";

const encodePassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(rawPassword, salt);
};
const comparePassword = async (rawPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(rawPassword, hashedPassword);
};

export { encodePassword, comparePassword };
