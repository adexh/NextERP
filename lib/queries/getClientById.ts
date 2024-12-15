import { db } from "@/lib/db";
import { sql, and, eq, arrayContains } from "drizzle-orm";
import { clientsInHrm, projectsInHrm} from "drizzle/schema";


export const getClientById = async ( userId:number, clientId: number) => {
  
    const clients = await db.selectDistinct({
      id:clientsInHrm.id,
      first_name:clientsInHrm.first_name,
      last_name: clientsInHrm.last_name,
      contact: clientsInHrm.contact,
      email: clientsInHrm.email,
      org_name: clientsInHrm.org_name,
      gender: clientsInHrm.gender,
      address: clientsInHrm.address,
      city: clientsInHrm.city,
      state: clientsInHrm.state,
      country: clientsInHrm.country,
      pincode: clientsInHrm.pincode,
      dob: clientsInHrm.dob,
      service_provider_ids: clientsInHrm.service_provider_ids,
    }).from(clientsInHrm)
    .where(
      and(
        eq(clientsInHrm.id, clientId),
        arrayContains(clientsInHrm.service_provider_ids, [userId])
      )
    )
    return clients[0];
}