import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";
import hasPermission from "@/lib/utils/api_role_auth";
import { NextRequest } from "next/server";
import { clientsInHrm } from "drizzle/schema";
import { sql } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const auth = await hasPermission(session, request);
  if( session.user.email == null || session.user.email ==undefined || auth ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const user = await request.json();
  console.debug("User from Form : ", user);

  try {
    await db.insert(clientsInHrm).values({
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
      service_provider_ids: [session.user.id]
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
