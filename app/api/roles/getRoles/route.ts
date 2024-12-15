
import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { rolesInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();

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
