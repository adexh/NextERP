import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  
  const role_id = session?.user.role;

  const data = await prisma.modules.findMany({
    select: {
      id:true,
      module_name: true,
      path: true,
      icon: true,
      child_modules: {
        select: {
          id:true,
          module_name: true,
          path: true,
          icon: true,
          child_modules: {
            select: {
              id:true,
              module_name: true,
              path: true,
              icon: true,
            },
            where: {
              active_status: true,
              role_maps: {
                some: {
                  role_id: parseInt(role_id),
                  active_status: true,
                }
              }
            },
            orderBy: [
              {
                display_order: "asc"
              },
              {
                module_name: "asc"
              }
            ]
          }
        },
        where: {
          active_status: true,
          role_maps: {
            some: {
              role_id: parseInt(role_id),
              active_status: true
            }
          }
        },
        orderBy: [
          {
            display_order: "asc"
          },
          {
            module_name: "asc"
          }
        ]
      }
    },
    where: {
      active_status: true,
      parent_id: null,
      role_maps: {
        some: {
          role_id: parseInt(role_id),
          active_status: true
        }
      }
    },
    orderBy: [
      {
        display_order: "asc"
      },
      {
        module_name: "asc"
      }
    ]
  });
  
  return Response.json(data);
}
