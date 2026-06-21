import dbConnect from "./dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function db_seeding() {
  try {
    console.log('seeeding............')
    const admin_id = process.env.ADMIN_ID;
    const admin_pass = String(process.env.ADMIN_PASS);
    const p = await bcrypt.hash(admin_pass,7);
    const role = "Admin";
    let u = await UserModel.findOne({
      admin_id,
    });
    if (u) return null;
   else { const user = await UserModel.create({
      username: admin_id,
      password: p,
      role: role,
    }); } 
  } catch (error) {
    console.error("failed to connect with database/Cannot create admin by seeding");
  }
}
