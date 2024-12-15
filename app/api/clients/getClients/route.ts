
import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import hasPermission from "@/lib/utils/api_role_auth";
import { NextRequest } from "next/server";
import { clientsInHrm } from "drizzle/schema";
import { arrayOverlaps, eq, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  
  const session = await auth();

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  if( session.user.email == null || session.user.email ==undefined ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  let data = await db.select().from(clientsInHrm).where(arrayOverlaps(clientsInHrm.service_provider_ids, [session.user.id]));
  
  return Response.json(data);
}
