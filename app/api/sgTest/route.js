import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    console.log(`sendgridapikey: ${process.env.SENDGRID_API_KEY}`)
    const msg = {
    to: 'joshua.andersland@gmail.com', // Change to your recipient
    from: 'josh.andersland@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
    return new NextResponse.json({ msg: 'Email sent' }, { status: 200 });
}
