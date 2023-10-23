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

  let data = await prisma.user.findMany({
    where:{
      active_status:true
    },
    select: {
      id:true,
      f_name:true,
      l_name:true,
      contact:true,
      email:true,
      username:true,
      active_status:true,
      role:{
        select:{
          role_name:true
        }
      }
    }
  });
  
  return Response.json(data);
}
