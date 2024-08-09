import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { and, eq, inArray, sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { role_modules_mapInHrm } from "drizzle/schema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const data = await request.json();

  console.log(JSON.stringify(data, null, 2));
  

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const role_id = session.user.id;
  const tenant_id = session.user.tenant_id;

  const modulesInsertValues = data.modules.notAllowed.map( (id:number) => ({
    module_id: id,
    role_id: data.roleId,
    tenant_id: tenant_id
  }))

  await db.insert(role_modules_mapInHrm)
  .values(modulesInsertValues)
  .onConflictDoNothing();
  
  await db.delete(role_modules_mapInHrm).where(and(eq(role_modules_mapInHrm.role_id, data.roleId), eq(role_modules_mapInHrm.tenant_id, tenant_id), inArray(role_modules_mapInHrm.module_id, data.modules.allowed)))

  return Response.json({message: "Updated"}, {status: 201});
}