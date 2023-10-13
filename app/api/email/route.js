import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    // destructure message into parts
    const { message } = await req.json();

    const codeArray = message.diverCodesArray;
    const difficultyArray = message.diverDifficultyArray;
    const scoreArray = message.diverScoreArray;
    const nameArray = message.diverNameArray;
    const date = message.meetInfoObject.date;
    const location = message.meetInfoObject.location;
    const meet = message.meetInfoObject.meet;


    let diverTable = nameArray.map((diver, index) => {
      return (
          `Diver: ${diver}\n<br>
          Code: ${codeArray[index]}\n<br>
          Difficulty: ${difficultyArray[index]}\n<br>
          Judge Scores: ${scoreArray[index]}\n<br>`
      );
    });

    const cookieStore = cookies();
    const token = cookieStore.get("jwt");

    let decodedJwt;

    try {
      decodedJwt = jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const email = decodedJwt.email;
    const username = decodedJwt.username;


    const content = {
      to: email,
      from: "josh.andersland@gmail.com",
      subject: `Dive meet results for ${meet} @ ${location} on ${date}`,
      text: `Diver Results:\n${diverTable}\n`,
      html: `${username} your dive results for the ${meet}.<br>Diver Results:<br>${diverTable}<br><br>`,
    };

    await sgMail.send(content);
    return NextResponse.json(
      { data: "diverTable", message: "Message sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse({ message: "Message not sent" }, { status: 400 });
  }
}
