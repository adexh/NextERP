import { db } from "@/lib/db";
import { sql, and, eq, notExists } from "drizzle-orm";
import { employeesInHrm, userInHrm, role_modules_mapInHrm, modulesInHrm, _employeesToprojectsInHrm, projectsInHrm } from "drizzle/schema";

export const getEmployeeById = async ( userId:number, employeeId: number ) => {
  
  const data = await db.select({
    id: employeesInHrm.id,
    fname: employeesInHrm.first_name,
    lname: employeesInHrm.last_name,
    contact: employeesInHrm.contact,
    designation: employeesInHrm.designation,
    email: employeesInHrm.email,
    org_email: employeesInHrm.org_email,
    gender: employeesInHrm.gender,
    address: employeesInHrm.address,
    city: employeesInHrm.city,
    state: employeesInHrm.state,
    country: employeesInHrm.country,
    pincode: employeesInHrm.pincode,
    dob: employeesInHrm.dob,
    doj: employeesInHrm.doj
  }).from(employeesInHrm)
    .leftJoin(userInHrm, eq(userInHrm.id, employeesInHrm.employer_id))
    .where(
      and(
        eq(employeesInHrm.employer_id, userId),
        eq(employeesInHrm.id, employeeId),
        notExists(
          db.select({ id: role_modules_mapInHrm.id }).from(role_modules_mapInHrm)
            .leftJoin(modulesInHrm, eq(modulesInHrm.id, role_modules_mapInHrm.module_id))
            .where(
              and(
                eq(role_modules_mapInHrm.role_id, userInHrm.role_id),
                eq(modulesInHrm.module_name, 'View Employees')
              )
            )
        )
      )
    )

    const projectsAssigned = await db.select({
      id: projectsInHrm.id,
      value: projectsInHrm.name
    })
    .from(projectsInHrm)
    .innerJoin(_employeesToprojectsInHrm, eq(projectsInHrm.id, _employeesToprojectsInHrm.B))
    .where(
      eq(_employeesToprojectsInHrm.A, employeeId)
    )

    return {...data[0], projects: projectsAssigned};
}