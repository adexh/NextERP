import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { rolesInHrm, userInHrm } from "drizzle/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, f_name, l_name, role }:{email:string, f_name:string, l_name:string, role:string} = await req.json();

  const exists = await db.select().from(userInHrm).where(eq( userInHrm.email, email ));

  if (!exists) {
    return NextResponse.json({ error: "User does not exists" }, { status: 400 });
  } else {

    let respMgs = { message: "success" };
    const trsn = await db.transaction(async (tx) => {
      const [{role_id}] = await tx.select({role_id: rolesInHrm.id}).from(rolesInHrm).where(eq(rolesInHrm.role_name, role)).limit(1);

      if( !role_id ) {
        tx.rollback();
        respMgs.message = "role not found";
        return false;
      }

      await tx.update(userInHrm).set({
        f_name : f_name,
        l_name : l_name,
        profileComplete: true,
        role_id : role_id
      })

      return true;
    })

    if( !trsn ) {
      return Response.json(respMgs,{status:404})
    }

    return NextResponse.json(respMgs);
  }
}