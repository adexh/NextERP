import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { and, eq, isNull, sql } from "drizzle-orm";
import { modulesInHrm } from "drizzle/schema";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  const role_id = session?.user.role;

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
                                  JOIN "hrm".role_modules_map rmm3 ON rmm3.module_id = sub2.id
                                  WHERE 
                                  sub2.parent_id = sub.id AND
                                  sub2.active_status = true AND
                                  rmm3.role_id = ${role_id}
                              ),
                              '[]'
                          )
                      )
                  )
                  FROM "hrm".modules sub
                  JOIN "hrm".role_modules_map rmm2 ON rmm2.module_id = sub.id
                  WHERE 
                  sub.parent_id = m.id AND
                  sub.parent_id is not null AND
                  sub.active_status = true AND
                  rmm2.role_id = ${role_id}
              ),
              '[]'
          ) AS child_modules
      FROM
          "hrm".modules m
      JOIN
          "hrm".role_modules_map rmm ON rmm.module_id = m.id
      WHERE
          m.parent_id IS NULL
          AND rmm.role_id = ${role_id}
          AND m.active_status = true
      GROUP BY
          m.id, m.module_name, m.icon, m."path", m.display_order
      ORDER BY
          m.display_order
  `)

  return Response.json(rows);
}
