import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import hasPermission from "@/lib/utils/api_role_auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const auth = await hasPermission(session, request);
  if( session.user.email == null || session.user.email ==undefined || auth ) {
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const employee = await request.json();

  try {
    const data = await prisma.employees.create({
      data : {
        first_name: employee.fname,
        last_name: employee.lname,
        contact: parseInt(employee.contact),
        email: employee.email,
        org_email: employee.org_email,
        gender: employee.gender,
        address: employee.address,
        city: employee.city,
        state: employee.state,
        country: employee.country,
        pincode: employee.pincode,
        dob: employee.dob? new Date(employee.dob) : "",
        doj: employee.doj? new Date(employee.doj) : "",
        dor: employee.dor? new Date(employee.dor) : "",
        designation: employee.designation,
        salary_id: 1,
        employer: {
          connect: {id:session.user.id}
        }
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
