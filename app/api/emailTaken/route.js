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
    const { email } = await req.json();
    const isEmailTaken = await user.countDocuments({ email });
    if (isEmailTaken > 0) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 200 });
    }
    return NextResponse.json({ msg: 'Email is available' }, { status: 200 });
}
