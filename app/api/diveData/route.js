import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongo/index";
import { cookies } from "next/headers"; 
import  jwt  from 'jsonwebtoken';


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
  })();

export async function POST(req, res) {
    let username;
    let email;
    let decodedJwt;
    const { data } = await req.json();

    const location = data.meetInfoObject.location;
    const nameArray = data.diverNameArray;
    const scoreArray = data.diverScoreArray;
    const codesArray = data.diverCodesArray;
    const difficultyArray = data.diverDifficultyArray;
    const meetDate = data.meetInfoObject.date;
    
    const newMeetObject = {
            date: meetDate,
            location: location,
            scores: scoreArray,
            names: nameArray,
            difficulty: difficultyArray,
            codes: codesArray,
            createdAt: Date.now(),
            updatedAt: Date.now()

        }

    try {
        if (!user) await init();

        const cookieStore = cookies();
        const token = cookieStore.get('jwt');

        console.log(`token: ${token.value}`) 

        // check if jwt is valid
        try {
            decodedJwt = jwt.verify(token.value, process.env.JWT_SECRET);
        } catch (error) {
            console.log(`error: ${error}`)
            return NextResponse.json({msg: 'jwt not valid'}, {status: 400});
        }

        username = decodedJwt.username;
        email = decodedJwt.email;

        try {
            const data = await user.find({ username }).toArray();
            
            if (!data) {
                return NextResponse.json({msg: 'user not found'}, {status: 400});
            }

            const updatedData = await user.updateOne({username}, {$push: {'girlsDiving.sy2324Meets': newMeetObject}})

        } catch (error) {
            return NextResponse.json({msg: 'error in finding user'}, {status: 400});
        }

        return NextResponse.json({msg: 'Meet info saved'}, {status: 201});
      } catch (e) {
        return NextResponse.json("error in entering data");
      }
}

// TODO use the get function to retrieve data from the database and display it for analysis on the front end. This feature is not implemented yet.
// export async function GET() {
//     console.log("made it to async function GET")
//     try {
//         if (!meets) await init();
//         const result = await meets.find({code: 'code'}).limit(20).toArray();
//         console.log(`results: ${result}`)
//         return NextResponse.json({data: result});
//       } catch (e) {
//         console.log("error in GET function")
//         return NextResponse.json("error in retrieving data");
//       }
// }