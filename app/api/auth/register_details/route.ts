import { db } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";
import { authcodesInHrm, rolesInHrm, userInHrm } from "drizzle/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const { email, f_name, l_name, role, authCode }:{email:string, f_name:string, l_name:string, role:string, authCode?:number} = await req.json();


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

      if( role != 'Admin' ) {
        if( !authCode ) {
          tx.rollback();
          respMgs.message = "auth code required";
          return false;
        }
        const [amdinTenantId] = await db.select({tenantId: userInHrm.tenant_id}).from(authcodesInHrm).innerJoin(userInHrm, eq(authcodesInHrm.userId, userInHrm.id)).where(and(eq(authcodesInHrm.code, authCode), gt(authcodesInHrm.expiresAt, Math.floor(Date.now()/1000)))).limit(1);

        if( !amdinTenantId ) {
          tx.rollback();
          respMgs.message = "auth code expired";
          return false;
        }

        await tx.update(userInHrm).set({
          f_name : f_name,
          l_name : l_name,
          profileComplete: true,
          role_id : role_id,
          tenant_id: amdinTenantId.tenantId
        }).where(eq(userInHrm.id, session.user.id));

      } else {
        await tx.update(userInHrm).set({
          f_name : f_name,
          l_name : l_name,
          profileComplete: true,
          role_id : role_id
        }).where(eq(userInHrm.id, session.user.id));
      }

      return true;
    })

    if( !trsn ) {
      return Response.json(respMgs,{status:404})
    }

    return NextResponse.json(respMgs);
  }
}