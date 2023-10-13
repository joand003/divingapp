import { NextResponse } from "next/server";
import 'dotenv/config';

export async function GET() {
    console.log(process.env.SENDGRID_API_URL)
    return NextResponse.json({ text: 'Hello' });
}