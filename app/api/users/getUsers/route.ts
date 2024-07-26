import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { rolesInHrm, userInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const data = await db.select({
    id: userInHrm.id,
    f_name: userInHrm.f_name,
    l_name: userInHrm.l_name,
    contact: userInHrm.contact,
    email: userInHrm.email,
    username: userInHrm.username,
    active_status: userInHrm.active_status,
    role: rolesInHrm.role_name
  }).from(userInHrm)
  .where(eq(userInHrm.active_status,true))
  .fullJoin(rolesInHrm, eq(userInHrm.role_id, rolesInHrm.id))
  
  return Response.json(data);
}
