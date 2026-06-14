"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
function page() {
  const [role, setRole] = useState("User");
  const handleLogin = () => {};
  const handleCreateAccount = () => {
    redirect("/signup");
  };
  return (
    <>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        {" "}
        <div className="w-full max-w-md rounded-xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
          {" "}
          <h1 className="mb-2 text-center text-3xl font-bold text-white">
            {" "}
            Welcome Back{" "}
          </h1>{" "}
          <p className="mb-6 text-center text-sm text-zinc-400">
            {" "}
            Sign in to continue to your account.{" "}
          </p>{" "}
          <form onSubmit={handleLogin} className="space-y-4">
            {" "}
            <div>
              {" "}
              <label className="mb-1 block text-sm font-medium text-zinc-200">
                {" "}
                Username{" "}
              </label>{" "}
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="mb-1 block text-sm font-medium text-zinc-200">
                {" "}
                Password{" "}
              </label>{" "}
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                {" "}
                Login As{" "}
              </label>{" "}
              <div className="flex gap-4">
                {" "}
                <button
                  type="button"
                  onClick={() => setRole("User")}
                  className={`flex-1 rounded-md border py-2 font-medium transition ${role === "User" ? "border-blue-600 bg-blue-600 text-white" : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
                >
                  {" "}
                  User{" "}
                </button>{" "}
                <button
                  type="button"
                  onClick={() => setRole("Admin")}
                  className={`flex-1 rounded-md border py-2 font-medium transition ${role === "Admin" ? "border-blue-600 bg-blue-600 text-white" : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
                >
                  {" "}
                  Admin{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              {" "}
              Login{" "}
            </button>{" "}
          </form>{" "}
          <p className="mt-6 text-center text-sm text-zinc-400">
            {" "}
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="font-medium text-blue-500 hover:text-blue-400 hover:underline"
            >
              {" "}
              Create a new account today{" "}
            </button>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
export default page;
