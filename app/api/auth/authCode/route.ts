
import { auth } from "@/lib/auth"
import { db } from '@/lib/db';
import { authcodesInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";

function generateAuthCode(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

async function insertUniqueAuthCode(adminId: number, maxRetries: number = 2): Promise<{ authCode: number; expiresAt: number }> {
  const expiresAt = Math.floor((Date.now())/1000) + 30;
  let retries = 0;
  let authCode: number;

  while (retries < maxRetries) {
    authCode = generateAuthCode();
    try {
      await db.insert(authcodesInHrm).values({
        code: authCode,
        expiresAt: expiresAt,
        userId: adminId
      }).onConflictDoUpdate({
        target: authcodesInHrm.userId,
        set: { 
          code: authCode,
          expiresAt: expiresAt
        },
      });
      return { authCode, expiresAt };
      
    } catch (error) {
      console.log(error);
      //@ts-expect-error
      if (error.constraint === 'authCodes_authCode_key') {
        retries++;
        console.log("Retrying with unique code : "+retries);
        continue;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Failed to generate a unique auth code after maximum retries');
}

export async function GET() {
  const session = await auth();
  const adminId = session?.user.id;

  if (!session || !adminId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { authCode, expiresAt } = await insertUniqueAuthCode(adminId);
    return Response.json({ authCode, expiresAt }, {status: 200});
  } catch (error) {
    return Response.json({ error: 'Failed to generate auth code' }, { status: 500 });
  }
}