import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongo/index";
import bcrypt from 'bcrypt';



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
    const { email, password, token } = await req.json();

    if (!email) {
        return NextResponse.json({ message: "Missing email" }, { status: 400 });
    }
    if (!password) {
        return NextResponse.json({ message: "Missing password" }, { status: 400 });
    }
    if (!token || token === "none") {
        return NextResponse.json({ message: "Invalid token, request password reset again" }, { status: 400 });
    }

    if (!user) await init();

    const isEmail = await user.countDocuments({ email });
    if (isEmail > 0) {

        // check if token is expired and if so, delete token and send error message
        const dbToken = await user.findOne({ email }, { projection: { resetPasswordToken: 1 } });
        const expires = await user.findOne({ email }, { projection: { resetPasswordExpires: 1 } });
        const now = Date.now();
        if (now > expires.resetPasswordExpires) {
            try {
                await user.updateOne({ email }, { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }, { upsert: false });
                return NextResponse.json({ message: "Your token is expired, please request new password change." }, { status: 401 });
            } catch (error) {
                return NextResponse.json({ message: "Error connecting to server. Please try again." }, { status: 500 });
            }
        }

        if (token !== dbToken.resetPasswordToken) {
            return NextResponse.json({ message: "Your token is invalid, please request new password change." }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            await user.updateOne({ email }, { $set: { password: hashedPassword } }, { upsert: false });
            await user.updateOne({ email }, { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }, { upsert: false });
            return NextResponse.json({ message: "Password reset, go to login page to log in." }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Server error, please try again." }, { status: 400 });
        }
        
        
        
        
    } else {
        return NextResponse.json({ message: "Error with the email provided." }, { status: 401 });
    }
}
    

