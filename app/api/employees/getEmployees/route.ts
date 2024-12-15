
import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { NextRequest } from "next/server";
import { employeesInHrm, modulesInHrm, role_modules_mapInHrm, rolesInHrm, userInHrm } from "drizzle/schema";
import { and, eq, notExists } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await auth();
  console.log("Session : ", session);


  if (!session) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  if (session.user.email == null || session.user.email == undefined) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  const data = await db.select({
    id: employeesInHrm.id,
    first_name: employeesInHrm.first_name,
    last_name: employeesInHrm.last_name,
    contact: employeesInHrm.contact,
    designation: employeesInHrm.designation,
    email: employeesInHrm.email
  }).from(employeesInHrm)
    .leftJoin(userInHrm, eq(userInHrm.id, employeesInHrm.employer_id))
    .where(
      and(
        eq(employeesInHrm.employer_id, session.user.id),
        notExists(
          db.select({ id: role_modules_mapInHrm.id }).from(role_modules_mapInHrm)
            .leftJoin(modulesInHrm, eq(modulesInHrm.id, role_modules_mapInHrm.module_id))
            .where(
              and(
                eq(role_modules_mapInHrm.role_id, userInHrm.role_id),
                eq(modulesInHrm.module_name, 'View Employees')
              )
            )
        )
      )
    )
  
  return Response.json(data);
}