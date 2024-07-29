import prisma from "../prisma";
import { Session } from "next-auth";
import { NextRequest } from "next/server";

const checkPermission = async (session: Session, request: NextRequest) => {
  const role = await prisma.roles.findUnique({
    select: {
      backendPermissions: {
        where: {
          active_status: true
        }
      },
    },
    where: { id: session.user.role_id }
  });

  if(!role || !role.backendPermissions) {
    return true;
  }

    return !role.backendPermissions.some(permission => {
    return (permission.endpoint === request.nextUrl.pathname && permission.method === request.method);
  });
}

export default checkPermission;