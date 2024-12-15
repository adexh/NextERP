import { db } from "@/lib/db";
import { auth } from "@/lib/auth"
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { _employeesToprojectsInHrm, employeesInHrm } from "drizzle/schema";
import { and, arrayContains, eq, sql } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { getEmployeeById } from "@/lib/queries/getEmployeeById";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const jwt = await getToken({ req: request });
  let id = parseInt((await params).id)

  if (!jwt || jwt.role_id == null) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }

  const employee = await getEmployeeById(jwt.id, id)

  return Response.json(employee);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const id = parseInt((await params).id)

  if (!session) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }
  if (session.user.email == null || session.user.email == undefined) {
    return Response.json({ error: 'Unauthorized Access!' }, { status: 401 })
  }
  const employee = await request.json();

  try {
    await db.update(employeesInHrm).set({
      first_name: employee.fname,
      last_name: employee.lname,
      contact: parseInt(employee.contact),
      email: employee.email,
      org_email: employee.org_email,
      gender: employee.gender,
      address: employee.address,
      city: employee.city,
      state: employee.state,
      country: employee.country,
      pincode: employee.pincode,
      dob: employee.dob ? new Date(employee.dob) : new Date(),
      doj: employee.doj ? new Date(employee.doj) : new Date(),
      designation: employee.designation,
      salary_id: 1,
    })
      .where(
        and(
          eq(employeesInHrm.id, id),
          eq(employeesInHrm.employer_id, session.user.id)
        )
      )

    await db.delete(_employeesToprojectsInHrm).where(
      and(
        eq(_employeesToprojectsInHrm.A, id)
      )
    )

    for (let project of employee.projects) {
      await db.insert(_employeesToprojectsInHrm).values({
        A: id,
        B: project.id
      })
    }

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response(JSON.stringify({ message: "Duplicate!" }), { status: 409, headers: { 'Content-Type': 'application/json' } },)
      }
    }
    console.error("Error in Add user API : ", error);
    return new Response(JSON.stringify({ message: "Internal Error !" }), { status: 500, headers: { 'Content-Type': 'application/json' } },)
  }

  return new Response(JSON.stringify({ message: "User Updated !" }), { status: 201 });
}
