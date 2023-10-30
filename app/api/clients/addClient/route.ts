import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if(!session || session.user.role != "1"){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const user = await request.json();
  console.debug("User from Form : ", user);

  try {
    const data = await prisma.clients.create({
      data : {
        first_name:user.fname,
        last_name: user.lname,
        contact: user.contact,
        email: user.email,
        org_name: user.org_name,
        gender: user.gender,
        project_ids: user.projects.length > 0 ? user.projects.map((x:any)=>x.id) : undefined,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
        dob: user.dob,
        login_id: user.login_id
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
