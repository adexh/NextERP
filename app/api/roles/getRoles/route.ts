import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { rolesInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const data = await db.select(
    {
      id: rolesInHrm.id,
      role_name: rolesInHrm.role_name,
      active_status: rolesInHrm.active_status
    }
  ).from(rolesInHrm)
  .where(eq(rolesInHrm.active_status, true));
  
  return Response.json(data);
}
