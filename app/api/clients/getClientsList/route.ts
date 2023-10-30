import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  let data = await prisma.clients.findMany({
    select: {
      id:true,
      
      first_name:true,
      last_name:true,
    }
  });
  data.forEach(el=>{
    //Manipulation for Frontend
    //@ts-expect-error
    el["name"] = el.first_name + " " + el.last_name;
  })
  
  return Response.json(data);
}
