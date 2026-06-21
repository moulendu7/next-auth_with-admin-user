import dbConnect from "@/app/helpers/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";

export  async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 },
    );
  }
  else if (session.user.role !== "Admin") {
  return Response.json(
    { message: "Forbidden" },
    { status: 403 }
  );
}
  try {
    await dbConnect();
    const { username, password } = await request.json();
    const user = await UserModel.findOne({
      username,
    });
    if (user) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
          data: null,
        },
        { status: 400 },
      );
    }
    const p = await bcrypt.hash(password, 7);
    const _user = await UserModel.create({
      username,
      password : p,
      role: "User",
    });
    return Response.json(
      {
        success: true,
        message: "New user created successfully",
        data: _user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(
      "failed to connect db/something happened in signup api endpoint",
    );
    throw error;
  }
}
