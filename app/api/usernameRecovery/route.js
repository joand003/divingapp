import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongo/index";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        return NextResponse.json({ message: "Invalid email" }, { status: 200 });
    }

    if (!user) await init();

    const isEmail = await user.countDocuments({ email });
    if (isEmail > 0) {
        const username = await user.findOne({ email }, { projection: { username: 1 } });
        console.log(`username.username: ${username.username}`);

        const content = {
            to: email,
            from: "josh.andersland@gmail.com",
            subject: `Username Recovery from Diving App`,
            text: `You're receiving this message because you or someone else requested your username.\n
            If you did not request this, it would be best to change your password.\n
            Your username is: ${username.username}\n
            `,
            html: `You're receiving this message because you or someone else requested your username.<br>If you did not request this, it would be best to change your password.<br>Your username is: ${username.username}<br>`,
          };
      
          try {
            await sgMail.send(content);
          } catch (error) {
            return NextResponse.json(
              { message: "Error sending email, please try again" },
              { status: 200 }
            );
          }
          return NextResponse.json(
            { message: "Message sent to your email, please check your email." },
            { status: 200 }
          );
        
    } else {
        return NextResponse.json({ message: "Error with the email provided." }, { status: 200 });
    }
}
    

