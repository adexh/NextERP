import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  
  const role_id = session?.user.role;

  const data = await prisma.role_modules_map.findMany({
    select: {
      module: {
        select: {
          module_name: true,
          child_modules: {
            select: {
              module_name: true,
              path: true,
              icon: true,
              display_order: true
            }
          },
          path: true,
          icon: true,
          display_order: true
        }
      }
    },
    where: {
      role_id: parseInt(role_id),
      module: {
        parent_id: null
      }
    },
    orderBy: [
      {
        module:{
          module_name:'asc'
        }
      },
      {
        module:{
          display_order:'asc'
        }
      }
    ]
  });
  console.log("Get modules API Called");
  
  return Response.json(data);
}
