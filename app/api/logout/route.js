import { NextResponse } from "next/server";

export async function POST(req, res) {
    let response = NextResponse.json({msg: "user successfully logged out"}, {status: 200});
    response.cookies.delete('jwt');

    return response;
    
}