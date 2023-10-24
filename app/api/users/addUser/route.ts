import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if(!session || session.user.role != "1"){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const user = await request.json();
  console.debug("User from Form : ", user);

  try {
    const data = await prisma.user.create({
      data : {
        f_name:user.fname,
        l_name: user.lname,
        contact: user.contact,
        email: user.email,
        password: await hash(user.password, 10),
        role_id: parseInt(user.role)
      }
    })
  } catch (error) {
    console.error("Error in Add user API : ",error);
    return new Response(JSON.stringify({message:"Internal Error !"}),{ status:500 , headers: { 'Content-Type':'application' }}, )
  }

  return Response.json({message: "User Created !"});
}
