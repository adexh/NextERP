
import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { projectsInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const jwt = await getToken({req});

  if(!jwt || jwt.role_id == null ){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const data = await db.select({
    id: projectsInHrm.id,
    value: projectsInHrm.name,
  }).from(projectsInHrm)
  .where(eq(projectsInHrm.user_id, jwt.id))

  return Response.json(data);
}
