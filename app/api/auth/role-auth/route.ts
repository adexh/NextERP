import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  
  const role_id = session?.user.role;
  const body = await request.json();

  const data = await prisma.role_modules_map.findFirst({
    where: {
      role_id:parseInt(role_id),
      active_status: true,
      module:{
        path: body.module_path
      }
    }
  });
  console.log("role auth ", data);
  
  
  if( data !== null && data !== undefined ){
    return new Response("Authorized",{status:200});
  }
  return new Response("Unauthorized",{status:401});
}
