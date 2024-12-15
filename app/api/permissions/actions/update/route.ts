
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { and, eq, inArray, sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { actionsRolesInHrm } from "drizzle/schema";

export async function POST(request: NextRequest) {
  const session = await auth();

  const data = await request.json();

  console.log(JSON.stringify(data, null, 2));
  

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const role_id = session.user.id;
  const tenant_id = session.user.tenant_id;

  const actionsInsertValues = data.modules.notAllowed.map( (id:number) => ({
    action_id: id,
    role_id: data.roleId,
    tenant_id: tenant_id
  }))

  if( data.modules.notAllowed.length > 0 ) {
    await db.insert(actionsRolesInHrm)
    .values(actionsInsertValues)
    .onConflictDoNothing();
  }

  await db.delete(actionsRolesInHrm).where(and(eq(actionsRolesInHrm.role_id, data.roleId), eq(actionsRolesInHrm.tenant_id, tenant_id), inArray(actionsRolesInHrm.action_id, data.modules.allowed)))

  return Response.json({message: "Updated"}, {status: 201});
}