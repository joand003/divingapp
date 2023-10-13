import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import 'dotenv/config'



export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt');

    if (!token) {
        return NextResponse.json({ error: 'User not logged in' }, { status: 200 });
    }

    const decodedJwt = jwt.verify(token.value, process.env.JWT_SECRET);

    return NextResponse.json({ username: decodedJwt.username, email: decodedJwt.email }, { status: 200 });
}