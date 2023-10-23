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
  const role_id = session?.user.role;

  const data = await prisma.roles.findMany({
    select: {
      id:true,
      role_name:true,
    },
    where:{
      active_status:true
    }
  });
  
  return Response.json(data);
}
