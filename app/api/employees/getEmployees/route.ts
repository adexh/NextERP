import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import { employeesInHrm, modulesInHrm, role_modules_mapInHrm, rolesInHrm, userInHrm } from "drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("Session : ", session);
  

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  if( session.user.email == null || session.user.email ==undefined ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const data = await db.select({
    id: employeesInHrm.id,
    first_name: employeesInHrm.first_name,
    last_name: employeesInHrm.last_name,
    contact: employeesInHrm.contact,
    designation: employeesInHrm.designation,
    email: employeesInHrm.email
  }).from(employeesInHrm)
  .fullJoin(userInHrm, eq(userInHrm.id, employeesInHrm.employer_id))
  .fullJoin(rolesInHrm, eq(rolesInHrm.id, userInHrm.role_id))
  .fullJoin(role_modules_mapInHrm, eq(role_modules_mapInHrm.role_id, rolesInHrm.id))
  .fullJoin(modulesInHrm, eq(modulesInHrm.id, role_modules_mapInHrm.module_id))
  .where( and(eq(employeesInHrm.employer_id, session.user.id ), eq(modulesInHrm.module_name,'View Employees')) )
  
  return Response.json(data);
}