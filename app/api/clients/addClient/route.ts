
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { clientsInHrm } from "drizzle/schema";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  const jwt = await getToken({req: request});
  
  if(!jwt || jwt.role_id == null || jwt.resticted_modules?.includes("Add Client") ){
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
      service_provider_ids: [jwt.id]
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
