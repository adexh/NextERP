import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { clientsInHrm } from "drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }

  const data = await db.select(
    {
      id: clientsInHrm.id,
      first_name: clientsInHrm.first_name,
      last_name: clientsInHrm.last_name,
    }
  ).from(clientsInHrm)
  .where(eq(clientsInHrm.user_id, session.user.id));

  data.forEach(el=>{
    //Manipulation for Frontend
    //@ts-expect-error
    el["name"] = el.first_name + " " + el.last_name;
  })
  
  return Response.json(data);
}
