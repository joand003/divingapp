import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req) {

    const { useremail, username } = await req.json();

    console.log(useremail);
    console.log(username);

    if (!useremail) {
        return NextResponse.json({ message: "Missing email" }, { status: 200 });
    }

    if (!username) {
        return NextResponse.json({ message: "Missing name" }, { status: 200 });
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
        const info = await transporter.sendMail({
            from: {
                name: "Diving App",
                address: process.env.GMAIL_USER,
            },
            to: useremail,
            subject: "Hello from Diving App",
            text: `Hello ${username},\n
            This is a test email from Diving App.\n
            `,
            html: `Hello ${username},<br>
            This is a test email from Diving App.<br>
            `,
        });
        console.log("Message sent: %s", info?.messageId);
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
    
}


