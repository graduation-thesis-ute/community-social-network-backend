import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { Permission } from "../models/permission.model";
import { Setting } from "../models/setting.model";
import permissionData from "../data/permission.data";
import roleData from "../data/role.data";
import settingData from "../data/setting.data";
import userData from "../data/user.data";

const initDb = async () => {
  try {
    const permissionCount = await Permission.countDocuments();
    if (permissionCount === 0) {
      await Permission.insertMany(permissionData);
      console.log("Permissions inserted successfully.");
    }
    const roleCount = await Role.countDocuments();
    if (roleCount === 0) {
      await Role.insertMany(roleData);
      console.log("Roles inserted successfully.");
    }
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      await Setting.insertMany(settingData);
      console.log("Settings inserted successfully.");
    }
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(userData);
      console.log("Users inserted successfully.");
    }
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export default initDb;
