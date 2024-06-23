import { Database } from "@/server/Database";
import { User } from "@/server/userModel";
import { redirect } from "next/navigation";

import bcrypt from 'bcrypt';

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



// POST Request

export async function POST(req) {
  try {
    const data = await req.json();
    const {name, email, password} = data;

    if (
      !data.hasOwnProperty("name") ||
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

    if (user) {
      return Response.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await User.create({name, email, password: hashedPassword});
    
    if (res)
      return Response.json(
        { message: "account created", success: true },
        { status: 201 }
      );

  } catch (error) {
    return Response.json(
      { message: "Invalid response", success: false },
      { status: 500 }
    );
  }
}
