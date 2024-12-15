
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  const role = await request.json();

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const role_id = role.id;
  const tenant_id = session.user.tenant_id;

  const {rows} = await db.execute(
    sql`
    SELECT
        m.id AS id,
        m.module_name,
        m.display_order,
        CASE WHEN rmm.module_id IS NULL THEN true ELSE false END AS has_permission,
        COALESCE(
            (
                SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', sub.id,
                        'module_name', sub.module_name,
                        'has_permission', CASE WHEN rmm2.module_id IS NULL THEN true ELSE false END,
                        'child_modules', COALESCE(
                            (
                                SELECT JSON_AGG(
                                    JSON_BUILD_OBJECT(
                                        'id', sub2.id,
                                        'module_name', sub2.module_name,
                                        'has_permission', CASE WHEN rmm3.module_id IS NULL THEN true ELSE false END
                                    )
                                )
                                FROM "hrm".modules sub2
                                LEFT JOIN "hrm".role_modules_map rmm3 ON rmm3.module_id = sub2.id AND rmm3.tenant_id = ${tenant_id} AND rmm3.role_id = ${role_id}
                                WHERE
                                    sub2.parent_id = sub.id AND
                                    sub2.active_status = true
                            ),
                            '[]'
                        )
                    )
                )
                FROM "hrm".modules sub
                LEFT JOIN "hrm".role_modules_map rmm2 ON rmm2.module_id = sub.id AND rmm2.role_id = ${role_id} AND rmm2.tenant_id = ${tenant_id}
                WHERE
                    sub.parent_id = m.id AND
                    sub.active_status = true
            ),
            '[]'
        ) AS child_modules
    FROM
        "hrm".modules m
    LEFT JOIN
        "hrm".role_modules_map rmm ON rmm.module_id = m.id AND rmm.role_id = ${role_id} AND rmm.tenant_id = ${tenant_id}
    WHERE
        m.parent_id IS NULL AND
        m.active_status = true
    GROUP BY
        m.id, m.module_name, m.display_order, rmm.module_id
    ORDER BY
        m.display_order
    `)
  
  return Response.json(rows);
}