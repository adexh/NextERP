import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AllowedModulesSql } from "./allowedModules";
import { kv } from '@vercel/kv';

export async function GET() {
  console.time("t1");
  const session = await getServerSession(authOptions);
  console.timeEnd("t1");

  console.time("t2");

  if (!session || !session.user.role_id) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  const role_id = session.user.role_id;
  const userId = session.user.id;
  const tenant_id = session.user.tenant_id;
  const redisKey = process.env.REDIS_PREFIX + userId+"-"+tenant_id+"-modules";

  const cache = await kv.json.get(redisKey);
  if( cache ) {
    console.log("from cache");
    console.timeEnd("t2");

    return Response.json(cache);
  }

  const {rows} = await db.execute(AllowedModulesSql(role_id, tenant_id))

  await kv.json.set(redisKey,'$',rows);
  await kv.expire(redisKey, 32400)

  console.timeEnd("t2");
  return Response.json(rows);
}