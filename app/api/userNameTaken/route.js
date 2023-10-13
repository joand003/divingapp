import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongo/index";

let client;
let db;
let user;

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

    const { username } = await req.json();

    const isUserNameTaken = await user.countDocuments({ username });

    if (isUserNameTaken > 0) {
        console.log(`isUserNameTaken: ${isUserNameTaken}`)
        console.log('username already taken')
        return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    return NextResponse.json({ msg: 'Username available' }, { status: 200 });
}
