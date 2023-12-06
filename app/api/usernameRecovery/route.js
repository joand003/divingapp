import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongo/index";
import nodemailer from "nodemailer";

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
        return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (!user) await init();

    const isEmail = await user.countDocuments({ email });
    if (isEmail > 0) {
        const username = await user.findOne({ email }, { projection: { username: 1 } });


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
              text: `You're receiving this message because you or someone else requested your username.\n
              If you did not request this, it would be best to change your password.\n
              Your username is: ${username.username}\n
              `,
              html: `You're receiving this message because you or someone else requested your username.<br>If you did not request this, it would be best to change your password.<br>Your username is: ${username.username}<br>`,
          });
          return NextResponse.json(
              { message: "Message sent to email, check email to continue." },
              { status: 200 }
          );
      } catch (error) {
          return NextResponse.json(
              { message: "Message failed to send, please try again." },
              { status: 400 }
          );
      }
        
    } else {
        return NextResponse.json({ message: "Error with the email provided." }, { status: 400 });
    }
}
    

