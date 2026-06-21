import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/app/helpers/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          if (!credentials) return null;
          const { username, password } = credentials;
          await dbConnect();
          const user = await UserModel.findOne({
            username: username,
          });
          if (!user) {
            throw new Error("User not found");
          }
          const passwordCorrectness = await bcrypt.compare(
            password,
            user.password,
          );
          if (passwordCorrectness) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
export default authOptions;
