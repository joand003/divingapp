import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongo';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';


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

    const { username, password } = await req.json();

    if (!username || !password) {
        console.log('missing fields')
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    try {
        const isUserName = await user.find({ username: username }).toArray();

        if (!isUserName) {
            return NextResponse.json({ error: 'Username not found' }, { status: 400 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, isUserName[0].password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Password incorrect' }, { status: 400 });
        }

        const token = jwt.sign({ username: isUserName[0].username, email: isUserName[0].email }, process.env.JWT_SECRET, { expiresIn: maxAge });

        const response = NextResponse.json({ msg: "user successfully logged in" }, { status: 200 });

        response.cookies.set('jwt', token, {
            httpOnly: true,
            maxAge: maxAge,
            sameSite: 'strict',

        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: 'Bad request' }, { status: 500 });
    }
    
    
}
