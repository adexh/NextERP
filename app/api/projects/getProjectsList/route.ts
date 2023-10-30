import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  if(!session || session.user.role != "1"){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  let data = await prisma.projects.findMany({
    select: {
      id:true,
      name: true
    }
  });
  
  return Response.json(data);
}
