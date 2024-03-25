import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import hasPermission from "@/lib/utils/api_role_auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const auth = await hasPermission(session, request);
  if( session.user.email == null || session.user.email ==undefined || auth ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  let data = await prisma.clients.findMany({
    select: {
      id:true,
      first_name:true,
      last_name:true,
      contact:true,
      email:true,
      org_name: true,
    },
    where: {
      service_providers: {
        some: {
          id: session.user.id,
        }
      }
    }
  });
  
  return Response.json(data);
}
