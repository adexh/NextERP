import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import hasPermission from "@/lib/utils/api_role_auth";
import { NextRequest, NextResponse } from "next/server";
import { modulesInHrm, projectsInHrm, role_modules_mapInHrm, rolesInHrm, userInHrm } from "drizzle/schema";
import { and, eq, inArray, or } from "drizzle-orm";
import { Description } from "@radix-ui/react-dialog";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const jwt = await getToken({req: request});
  
  if(!jwt || jwt.role_id == null || jwt.resticted_modules?.includes("Owned Projects") ){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const projects = await db.select({
    id: projectsInHrm.id,
    name: projectsInHrm.name,
    description: projectsInHrm.description,
    start_date: projectsInHrm.start_date,
    completion_status: projectsInHrm.completion_status,
    status: projectsInHrm.status
  }).from(projectsInHrm)
  .fullJoin(role_modules_mapInHrm, eq(role_modules_mapInHrm.role_id, jwt.role_id))
  .fullJoin(modulesInHrm, eq(modulesInHrm.id, role_modules_mapInHrm.module_id))
  .where(
    and(
      eq(projectsInHrm.user_id, jwt.id),
      eq(modulesInHrm.module_name, 'Owned Projects')
    )
  )
  
  return NextResponse.json(projects);
}