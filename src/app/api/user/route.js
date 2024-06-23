import { Database } from "@/server/Database";
import { User } from "@/server/userModel";
import { redirect } from "next/navigation";

import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function HEAD(req) {
  return Response.json({ message: req.method }, { status: 200 });
}


export async function GET(req) {
  const cooKies = cookies();
  const token = cooKies.get("token");
  return Response.json({ message: token }, { status: 200 });
  
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
  return Response.json(req.method);
}
