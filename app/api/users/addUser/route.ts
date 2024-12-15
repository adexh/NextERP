
import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { userInHrm } from "drizzle/schema";

export async function POST(request: Request) {
  const session = await auth();
  
  if( !session ){
    return Response.json({error: 'Unauthorized Access!'}, {status:401})
  }
  const user = await request.json();
  console.debug("User from Form : ", user);

  try {

    // await db.insert(userInHrm).values(user);
    

  } catch (error) {
    console.error("Error in Add user API : ",error);
    return new Response(JSON.stringify({message:"Internal Error !"}),{ status:500 , headers: { 'Content-Type':'application' }}, )
  }

  return Response.json({message: "User Created !"});
}
