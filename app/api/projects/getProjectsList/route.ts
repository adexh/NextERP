import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { projectsInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const data = await db.select().from(projectsInHrm)
  .where(eq(projectsInHrm.user_id, session.user.id))

  return Response.json(data);
}
