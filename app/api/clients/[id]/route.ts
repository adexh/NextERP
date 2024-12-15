import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { clientsInHrm } from "drizzle/schema";
import { and, arrayContains, eq, sql } from "drizzle-orm";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  const jwt = await getToken({req: request});
  let id = parseInt(( await params).id)

  if(!jwt || jwt.role_id == null || jwt.resticted_modules?.includes("Customers") ){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  
  const client = await db.selectDistinct({
    id: clientsInHrm.id,
    fname: clientsInHrm.first_name,
    lname: clientsInHrm.last_name,
    contact: clientsInHrm.contact,
    email: clientsInHrm.email,
    org_name: clientsInHrm.org_name,
    gender: clientsInHrm.gender,
    address: clientsInHrm.address,
    city: clientsInHrm.city,
    state: clientsInHrm.state,
    country: clientsInHrm.country,
    pincode: clientsInHrm.pincode,
    dob: clientsInHrm.dob,
    service_provider_ids: clientsInHrm.service_provider_ids,
  }).from(clientsInHrm)
  .where(
    and(
      eq(clientsInHrm.id, id),
      arrayContains(clientsInHrm.service_provider_ids, [jwt.id])
    )
  )

  return Response.json(client[0]);
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
  const user = await request.json();

  try {
    await db.update(clientsInHrm).set({
      first_name:user.fname,
      last_name: user.lname,
      contact: user.contact,
      email: user.email,
      org_name: user.org_name,
      gender: user.gender,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      pincode: user.pincode,
      dob: user.dob,
    })
    .where(
      and(
        eq(clientsInHrm.id, id),
        arrayContains(clientsInHrm.service_provider_ids, [session.user.id])
      )
    )

  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2002'){
        return new Response(JSON.stringify({message:"Duplicate!"}),{ status:409 , headers: { 'Content-Type':'application/json' }}, )
      }
    }
    console.error("Error in Add user API : ", error);
    return new Response(JSON.stringify({message:"Internal Error !"}),{ status:500 , headers: { 'Content-Type':'application/json' }}, )
  }

  return new Response(JSON.stringify({message: "User Updated !"}),{status: 201});
}
