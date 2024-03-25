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
  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const auth = await hasPermission(session, request);
  if( session.user.email == null || session.user.email ==undefined || auth ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  
  const projects = await prisma.projects.findMany({
    where: {
      OR: [
        { user_id: session.user.id },                   // Projects created by the user
        { clients: { some: { id: session.user.id } }}, // Projects accessible by the client
        { employees: { some: { id: session.user.id } }} // Projects assigned to the employee
      ]
    }
  });
  
  return Response.json(projects);
}
