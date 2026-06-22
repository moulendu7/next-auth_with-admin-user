"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type LoginFormData = z.infer<typeof loginSchema>;

function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (!response?.ok) {
  toast("Invalid credentials",{ position: "top-right" });
  return;
}

router.refresh();
  };

  const handleCreateAccount = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-sm text-zinc-400">
          Sign in to continue to your account.
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-200">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-200">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?
          <button
            type="button"
            onClick={handleCreateAccount}
            className="font-medium text-blue-500 hover:text-blue-400 hover:underline"
          >
            Create a new account today
          </button>
        </p>
      </div>
    </div>
  );
}

export default Page;
