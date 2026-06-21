'use client'
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from "react";
import { redirect } from "next/navigation";

export function page() {
  const { data: session, status } = useSession();
  if(!session){
    redirect('/login');
  }
  const logout = async () => {
    signOut();
  }
  return (
    <><div>Hello i am admin-dashboard</div>
      <button onClick={logout}>Logout</button>
    </>
    

  )
}

export default page;