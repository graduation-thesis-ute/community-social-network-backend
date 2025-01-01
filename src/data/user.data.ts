import { createSecretKey } from "../utils/schema.util";

const userData = [
  {
    _id: "670254ae569ff202cee6c049",
    name: "Quản trị viên",
    email: "admin@gmail.com",
    password: "$2a$10$2gs5mOtNphnAcNal1aWbXOv9Ebn8jK.lN71b9VMl9mHE22Vy0UZd.",
    phone: "0351111111",
    memberId: "999999",
    birthDate: null,
    bio: null,
    avatarUrl: null,
    status: 1,
    secretKey: createSecretKey(),
    role: "66de615d6d8829de1df38c68",
    isSuperAdmin: 1,
  },
];

export default userData;
