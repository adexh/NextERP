import { db } from "@/lib/db";
import { sql, and, eq } from "drizzle-orm";
import { projectsInHrm} from "drizzle/schema";


export const getProjectById = async ( userId:number, projectId: number) => {
  
    const projects = await db.selectDistinct({
      id: projectsInHrm.id,
      projectName: projectsInHrm.name,
      description: projectsInHrm.description,
      expected_start_date: sql`TO_CHAR(${projectsInHrm.expected_start_date}, 'YYYY-MM-DD')`.as('expected_start_date'),
      expected_end_date: sql`TO_CHAR(${projectsInHrm.expected_end_date}, 'YYYY-MM-DD')`.as('expected_end_date'),
      completion_status: projectsInHrm.completion_status,
      budget: projectsInHrm.budget,
      actual_cost: projectsInHrm.actual_cost,
      issues: projectsInHrm.issues,
      notes: projectsInHrm.notes,
      status: projectsInHrm.status
    }).from(projectsInHrm)
    .where(
      and(
        eq(projectsInHrm.user_id, userId),
        eq(projectsInHrm.id, projectId)
      )
    )

    return projects[0];
}