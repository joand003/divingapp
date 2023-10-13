import { NextResponse } from 'next/server';
// import User from '../../../models/User';
// import connect from '../../../lib/mongo/index';
import clientPromise from '@/lib/mongo';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import 'dotenv/config'


let client;
let db;
let user;
const maxAge = 5 * 24 * 60 * 60;

async function init() {
    if (db) {
        return;
    }
    try {
        client = await clientPromise;
        db = await client.db();
        user = await db.collection("user");
    } catch (e) {
        throw new Error("Could not connect to DB");
    }
}

(async () => {
    await init();
}
)();


export const POST = async (req, res) => {
    if (!user) await init();

    const { username, password, email } = await req.json();

    if (!username || !password || !email) {
        console.log('missing fields')
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const isUserNameTaken = await user.countDocuments({ username: username });

    if (isUserNameTaken > 0) {
        console.log(`isUserNameTaken: ${isUserNameTaken}`)
        console.log('username already taken')
        return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    const isEmailTaken = await user.countDocuments({ email: email });

    if (isEmailTaken > 0) {
        console.log(`isEmailTaken: ${isEmailTaken}`)
        console.log('email already taken')
        return NextResponse.json({ error: 'Email already taken' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await user.insertOne({
            username: username,
            password: hashedPassword,
            email: email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        const token = jwt.sign({ username, email }, process.env.JWT_SECRET);

        const response = NextResponse.json({msg: "user successfully created"}, {status: 201});
        response.cookies.set('jwt', token, {
            httpOnly: true,
            maxAge: maxAge,
            sameSite: 'strict',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
