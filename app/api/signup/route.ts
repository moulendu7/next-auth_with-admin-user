import dbConnect from "@/app/helpers/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export default async function GET(request: Request) {
  try {
    await dbConnect();
    const { username, password } = await request.json();
    const user = await UserModel.find(username);
    if (user) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
          data : null
        },
        { status: 400 },
      );
    }
    const p = bcrypt.hash(password,7)
    const _user = await UserModel.create({
        username,
        password,
        role : 'User',
    })
    return Response.json({
        success : true,
        message : "New user created successfully",
        data : _user,
    },{status : 200});
  } catch (error) {
        console.log("failed to connect db/something happened in signup api endpoint");
        throw error;
  }
}
