import prisma from "@/lib/prisma";

export const authRole = async (role: number,module_path: string) => {

  const data = await prisma.role_modules_map.findFirst({
    where: {
      role_id: role,
      active_status: true,
      module:{
        path: module_path
      }
    }
  });

  if (data !== null && data !== undefined) {
    return false
  }
  return true
}