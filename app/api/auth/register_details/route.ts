import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, f_name, l_name, role }:{email:string, f_name:string, l_name:string, role:string} = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email
    },
  });
  if (!exists) {
    return NextResponse.json({ error: "User does not exists" }, { status: 400 });
  } else {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        f_name,
        l_name,
        profileComplete: true,
        role: {
          connect: {
            role_name: role
          }
        }
      },
    });
    return NextResponse.json(user);
  }
}