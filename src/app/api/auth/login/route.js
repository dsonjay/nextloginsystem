import { Database } from "@/server/Database";
import { User } from "@/server/userModel";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { cookies } from "next/headers";
import { signToken } from "@/helper/verifyUser";



// POST Request

export async function POST(req) {

  // const signToken = (payload, secret, options) => {
  //   return new Promise((resolve, reject) => {
  //     jwt.sign(payload, secret, options, (err, token) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(token);
  //       }
  //     });
  //   });
  // };


  const cookieObj = cookies();


  try {
    const data = await req.json();
    const { email, password } = data;

    if (
      !data.hasOwnProperty("email") ||
      !data.hasOwnProperty("password")
    ) {
      return Response.json(
        { message: "Invalid Request name not found", success: false },
        { status: 500 }
      );
    }
    
    await Database()

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return Response.json(
        { message: "User doesn't exists", success: false },
        { status: 400 }
      );
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return Response.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await signToken({ usrId: user._id });

    // const token = await signToken({ usrId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    cookieObj.set("token", token, { path: "/", maxAge: 60 * 60 * 24, secure: true });
      return Response.json(
        {
          message: "Authinticated",
          success: true,
          token: token,
          userId: user._id,
        },
        { status: 201 }
      );

  } catch (error) {
    // console.log(error);
    return Response.json(
      { message: "Invalid response", success: false },
      { status: 500 }
    );
  }
}


export async function HEAD(req) {
  return Response.json({ message: req.method }, { status: 200 });
}


export async function GET(req) {
  return Response.json({ message: req.method }, { status: 200 });
  // redirect("/");
}

export async function PUT(req) {
  return Response.json({ message: req.method }, { status: 200 });
}

export async function DELETE(req) {
  return Response.json({ message: req.method }, { status: 200 });
}

export async function PATCH(req) {
  return Response.json({ message: req.method }, { status: 200 });
}
export async function OPTIONS(req) {
  return Response.json({ message: req.method }, { status: 200 });
}




