import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const { message } = await req.json();

    const codeArray = message.diverCodesArray;
    const difficultyArray = message.diverDifficultyArray;
    const scoreArray = message.diverScoreArray;
    const nameArray = message.diverNameArray;
    const date = message.meetInfoObject.date;
    const location = message.meetInfoObject.location;
    const meet = message.meetInfoObject.meet;

    let diverTable = nameArray.map((diver, index) => {
        return `Diver: ${diver}\n<br>
          Code: ${codeArray[index]}\n<br>
          Difficulty: ${difficultyArray[index]}\n<br>
          Judge Scores: ${scoreArray[index]}\n<br>`;
    });

    const cookieStore = cookies();
    const token = cookieStore.get("jwt");

    let decodedJwt;
    try {
        decodedJwt = jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (error) {
        return NextResponse.json({ msg: "Invalid token, please logout and log back in." }, { status: 401 });
    }
    const email = decodedJwt.email;
    const username = decodedJwt.username;

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
            subject: `Dive meet results for ${meet} @ ${location} on ${date}`,
            text: `Diver Results:\n${diverTable}\n`,
            html: `${username} your dive results for the ${meet}.<br>Diver Results:<br>${diverTable}<br><br>`,
        });
        return NextResponse.json(
            { message: "Message sent to email, check email for results." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Message failed to send, please try again." },
            { status: 400 }
        );
    }
}
