import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { projectsInHrm } from "drizzle/schema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  if( session.user.email == null || session.user.email ==undefined ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const project = await request.json();

  try {
    await db.insert(projectsInHrm).values({
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
    })

  } catch (error) {
    //@ts-expect-error
    if ( error?.message?.includes('duplicate') ) {
      return new Response(JSON.stringify({message:"Project name already exists !"}), { status:400, headers: { 'Content-Type':'application/json' }},)
    }
    console.error("Error in Add user API : ", error);
    return new Response(JSON.stringify({message:"Internal Error !"}),{ status:500 , headers: { 'Content-Type':'application/json' }}, )
  }

  return new Response(JSON.stringify({message: "Project Created !"}),{status: 201});
}
