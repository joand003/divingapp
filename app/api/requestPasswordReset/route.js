import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongo/index";
import nodemailer from "nodemailer";
const crypto = require('crypto');


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
    const { email } = await req.json();

    if (!email) {
        console.log("missing fields");
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    if (!user) await init();

    const isEmail = await user.countDocuments({ email });
    if (isEmail > 0) {
        const expires = Date.now() + 1800000;
        const token = crypto.randomBytes(20).toString('hex');
        try {
            await user.updateOne({ email }, { $set: { resetPasswordToken: token, resetPasswordExpires: expires} }, { upsert: false });
        } catch (error) {
            return NextResponse.json({ message: "Server error, please try again." }, { status: 500 });
        }
        

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
    
        try {
            await transporter.sendMail({
                from: {
                    name: "Diving App",
                    address: process.env.GMAIL_USER,
                },
                to: email,
                subject: `Username Recovery from Diving App`,
                text: `You're receiving this message because you or someone else requested a password reset.\n
                If you did not request this, just ignore this email.\n
                Your password reset link is: https://diveapp-cce6b60b0629.herokuapp.com/resetPassword?token=${token}\n
                Please note that this link will expire in 30 minutes.\n
                `,
                html: `You're receiving this message because you or someone else requested a password reset.<br>
                If you did not request this, just ignore this email.<br>
                Your password reset link is: https://diveapp-cce6b60b0629.herokuapp.com/resetPassword?token=${token}<br>
                Please note that this link will expire in 30 minutes.<br>`,
            });
            return NextResponse.json(
                { message: "Message sent to email, check email to continue." },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Message failed to send, please try again." },
                { status: 200 }
            );
        }

        
    } else {
        return NextResponse.json({ message: "Error with the email provided." }, { status: 400 });
    }
}
    

