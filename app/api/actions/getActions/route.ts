
import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { and, eq, isNull, sql } from "drizzle-orm";
import { actionsInHrm, actionsRolesInHrm, modulesInHrm } from "drizzle/schema";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  const role_id = session.user.role_id;
  const tenant_id = session.user.tenant_id;

  const data = await db.select().from(actionsRolesInHrm).fullJoin()

  return Response.json(rows);
}
