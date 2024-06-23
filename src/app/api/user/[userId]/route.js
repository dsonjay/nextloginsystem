import { Database } from "@/server/Database";
import { User } from "@/server/userModel";
import { redirect } from "next/navigation";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { validateId } from "@/helper/validator";

import { headers } from "next/headers";
// import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  Database();
  const id = params.userId;
  const cooKies = cookies();
  const token = cooKies.get("token");

  const headersList = headers();
  const authUserId = headersList.get("x-auth-user");

  if (!validateId(id)) {
    return Response.json(
      { message: "Invalid parameter Id", success: false },
      { status: 400 }
    );
  }

  if (id !== authUserId) {
    return Response.json(
      { message: "Invalid User", success: false },
      { status: 400 }
    );
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    return Response.json(
      { message: "Requested User doesn't exists", success: false },
      { status: 400 }
    );
  }

  // return Response.json({ message: params.userId }, { status: 200 });
  return Response.json(
    { message: "User fetched", data: user, success: true },
    { status: 200 }
  );
}

export async function POST(req) {
  return Response.json(
    { message: "Page not found", success: false },
    {
      status: 404,
    }
  );
}

export async function PUT(req, { params }) {
  try {
    await Database();
    const body = await req.json();
    const { name, email, password } = body;
    const userId = params.userId;

    const headersList = headers();
    const authUserId = headersList.get("x-auth-user");

    if (
      !body.hasOwnProperty("name") ||
      !body.hasOwnProperty("email") ||
      !body.hasOwnProperty("password")
    ) {
      return Response.json(
        { message: "Invalid Request name not found", success: false },
        { status: 500 }
      );
    }

    if (!validateId(userId)) {
      return Response.json(
        { message: "Invalid parameter Id", success: false },
        { status: 400 }
      );
    }

    if (!validateId(authUserId)) {
      return Response.json(
        { message: "Invalid auth User Id", success: false },
        { status: 400 }
      );
    }

    if (userId !== authUserId) {
      return Response.json(
        { message: "Invalid User", success: false },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return Response.json(
        { message: "Requested User doesn't exists", success: false },
        { status: 400 }
      );
    }

    // const isNameDifferent = user.name !== name;
    // const isEmailDifferent = user.email !== email;

    const hashedPassword = await bcrypt.hash(password, 10);

    // if (isNameDifferent || isEmailDifferent) {
      
    // }


    const updated = await User.findByIdAndUpdate(
      userId,
      {
        name: name,
        email: email,
        password: password.length === 0 ? user.password : hashedPassword,
      },
      { new: true, select: "-password" }
    );

    return Response.json(
      {
        message: "Success", success: true, data: updated
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.log(error);
    return Response.json({ message: "error", success: false }, { status: 500 });
  }
}


export async function DELETE(req, {params}) {
  try {
    await Database();

    const cooKies = cookies();

    const userId = params.userId;

    const headersList = headers();
    const authUserId = headersList.get("x-auth-user");

    if (!validateId(userId)) {
      return Response.json(
        { message: "Invalid parameter Id", success: false },
        { status: 400 }
      );
    }

    if (!validateId(authUserId)) {
      return Response.json(
        { message: "Invalid auth User Id", success: false },
        { status: 400 }
      );
    }

    if (userId !== authUserId) {
      return Response.json(
        { message: "Invalid User", success: false },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return Response.json(
        { message: "Requested User doesn't exists", success: false },
        { status: 400 }
      );
    }

    const delUser = await User.findByIdAndDelete(userId);

    cooKies.delete("token");

    return Response.json(
      { message: "Deleted", success: true },
      { status: 200 }
    );


  } catch (error) {
    console.log(error);
    return Response.json({ message: "error", success: false }, { status: 500 });
  }
}