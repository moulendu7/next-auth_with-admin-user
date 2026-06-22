'use client'
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';
export function page() {
 const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const logout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <><div>Hello i am user-dashboard</div>
      <button onClick={logout}>logout</button>
    </>
    

  )
}

export default page;