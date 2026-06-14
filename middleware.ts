import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextRequest,NextResponse } from "next/server";
import authOptions from "./app/api/auth/[...nextauth]/options";

export const config = {
    matcher : ['/login','/dashboard-user','/dashboard-admin']
}



export default async function middleware(request : NextRequest){
    const token = getToken({req : request});
    const url = request.nextUrl;
    // restrict both authenticated user && unauthenticated user.
}

