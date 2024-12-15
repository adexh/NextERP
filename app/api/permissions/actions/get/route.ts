
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

  const data = await db.execute(
    sql`
    SELECT
        ag.group_name,
        JSONB_AGG(
            JSON_BUILD_OBJECT(
                'id', a.id,
                'action_name', a.action_name,
                'value', CASE
                            WHEN arm.action_id IS NULL THEN TRUE
                            ELSE FALSE
                        END
            )
        ) AS "actions"
    FROM
        "hrm".actions a
    JOIN "hrm".actions_group ag ON
        ag.id = a.group_id
    LEFT JOIN "hrm".actions_roles_map arm ON
        arm.action_id = a.id
        AND arm.role_id = ${role_id}
        AND arm.tenant_id = ${tenant_id}
    WHERE
        a.active_status = TRUE
    GROUP BY
        ag.group_name
    `)
  
  return Response.json(data.rows);
}