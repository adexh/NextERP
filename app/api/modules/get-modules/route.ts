import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { and, eq, isNull, sql } from "drizzle-orm";
import { modulesInHrm } from "drizzle/schema";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  const role_id = session.user.role_id;
  const tenant_id = session.user.tenant_id;

  const {rows} = await db.execute(
    sql`
    SELECT
        m.id AS id,
        m.module_name,
        m.icon,
        m."path",
        m.display_order,
        COALESCE(
            (
                SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', sub.id,
                        'module_name', sub.module_name,
                        'icon', sub.icon,
                        'path', sub."path",
                        'child_modules', COALESCE(
                            (
                                SELECT JSON_AGG(
                                    JSON_BUILD_OBJECT(
                                        'id', sub2.id,
                                        'module_name', sub2.module_name,
                                        'icon', sub2.icon,
                                        'path', sub2."path"
                                    )
                                )
                                FROM "hrm".modules sub2
                                LEFT JOIN "hrm".role_modules_map rmm3 ON rmm3.module_id = sub2.id AND rmm3.role_id = ${role_id} AND rmm3.tenant_id = ${tenant_id}
                                WHERE
                                sub2.parent_id = sub.id AND
                                sub2.active_status = true AND
                                rmm3.module_id IS NULL
                            ),
                            '[]'
                        )
                    )
                )
                FROM "hrm".modules sub
                LEFT JOIN "hrm".role_modules_map rmm2 ON rmm2.module_id = sub.id AND rmm2.role_id = ${role_id} AND rmm2.tenant_id = ${tenant_id}
                WHERE 
                sub.parent_id = m.id AND
                sub.parent_id IS NOT NULL AND
                sub.active_status = true AND
                rmm2.module_id IS NULL
            ),
            '[]'
        ) AS child_modules
    FROM
        "hrm".modules m
    LEFT JOIN
        "hrm".role_modules_map rmm ON rmm.module_id = m.id AND rmm.role_id = ${role_id} AND rmm.tenant_id = ${tenant_id}
    WHERE
        m.parent_id IS NULL AND
        m.active_status = true AND
        rmm.module_id IS NULL
    GROUP BY
        m.id, m.module_name, m.icon, m."path", m.display_order
    ORDER BY
        m.display_order
  `)

  return Response.json(rows);
}
