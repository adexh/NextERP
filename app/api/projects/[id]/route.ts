import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { modulesInHrm, projectsInHrm, role_modules_mapInHrm, rolesInHrm, userInHrm } from "drizzle/schema";

import { auth } from "@/lib/auth"
import { and, eq, notExists, } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { getProjectById } from "@/lib/queries/getProjectById";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  const jwt = await getToken({req: request});
  let id = parseInt(( await params).id)

  if(!jwt || jwt.role_id == null || jwt.resticted_modules?.includes("Owned Projects") ){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  
  const project = await getProjectById( jwt.id, id );

  if( !project ) {
    return NextResponse.json({ error:"Project not found" }, {status: 404});
  }

  return NextResponse.json(project);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const id = parseInt((await params).id)
  
  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  if( session.user.email == null || session.user.email ==undefined ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const project = await request.json();

  try {
    await db.update(projectsInHrm).set({
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
      last_updated_date: new Date(),
    })
    .where(
      eq(projectsInHrm.id, id)
    )

  } catch (error) {
    console.log(error);
    
    //@ts-expect-error
    if ( error?.message?.includes('duplicate') ) {
      return new Response(JSON.stringify({message:"Project name already exists !"}), { status:400, headers: { 'Content-Type':'application/json' }},)
    }
    console.error("Error in Add user API : ", error);
    return new Response(JSON.stringify({message:"Internal Error !"}),{ status:500 , headers: { 'Content-Type':'application/json' }}, )
  }

  return new Response(JSON.stringify({message: "Project Updated !"}),{status: 201});
}