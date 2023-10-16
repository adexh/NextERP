import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const getModules = async () => {
  const session = await getServerSession(authOptions);

  if(!session){
    throw Error("Unauthorised !");
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
  return data;
}