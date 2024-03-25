import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";
import hasPermission from "@/lib/utils/api_role_auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const auth = await hasPermission(session, request);
  if( session.user.email == null || session.user.email ==undefined || auth ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const project = await request.json();

  try {
    const data = await prisma.projects.create({
      data : {
        name: project.projectName,
        description: project.description,
        start_date: project.start_date,
        expected_start_date: new Date(project.expected_start_date),
        expected_end_date: new Date(project.expected_end_date),
        team_lead: project.team_lead,
        budget: parseInt(project.budget),
        actual_cost: parseInt(project.actual_cost),
        issues: project.issues,
        notes: project.notes,
        created_date: new Date(),
        last_updated_date: new Date(),
        user_id: session.user.id
      }
    })
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2002'){
        return new Response(JSON.stringify({message:"Duplicate!"}),{ status:409 , headers: { 'Content-Type':'application/json' }}, )
      }
    }
    console.error("Error in Add user API : ", error);
    return new Response(JSON.stringify({message:"Internal Error !"}),{ status:500 , headers: { 'Content-Type':'application/json' }}, )
  }

  return new Response(JSON.stringify({message: "User Created !"}),{status: 201});
}
