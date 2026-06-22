import dbConnect from "@/app/helpers/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";

export async function POST(request: Request) {

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
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      password: hashedPassword,
      role: "User",
    });

    return Response.json(
      {
        success: true,
        message: "New user created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(
      "failed to connect db/something happened in signup api endpoint"
    );

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}