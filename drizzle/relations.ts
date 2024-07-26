import { relations } from "drizzle-orm/relations";
import { rolesInHrm, userInHrm, modulesInHrm, role_modules_mapInHrm, projectsInHrm, clientsInHrm, employeesInHrm, AccountInHrm, SessionInHrm, _employeesToprojectsInHrm } from "./schema";

export const userInHrmRelations = relations(userInHrm, ({one, many}) => ({
	rolesInHrm: one(rolesInHrm, {
		fields: [userInHrm.role_id],
		references: [rolesInHrm.id]
	}),
	projectsInHrms: many(projectsInHrm),
	clientsInHrms: many(clientsInHrm),
	employeesInHrms: many(employeesInHrm),
	AccountInHrms: many(AccountInHrm),
	SessionInHrms: many(SessionInHrm)
}));

export const rolesInHrmRelations = relations(rolesInHrm, ({many}) => ({
	userInHrms: many(userInHrm),
	role_modules_mapInHrms: many(role_modules_mapInHrm)
}));

export const role_modules_mapInHrmRelations = relations(role_modules_mapInHrm, ({one}) => ({
	modulesInHrm: one(modulesInHrm, {
		fields: [role_modules_mapInHrm.module_id],
		references: [modulesInHrm.id]
	}),
	rolesInHrm: one(rolesInHrm, {
		fields: [role_modules_mapInHrm.role_id],
		references: [rolesInHrm.id]
	}),
}));

export const modulesInHrmRelations = relations(modulesInHrm, ({one, many}) => ({
	role_modules_mapInHrms: many(role_modules_mapInHrm),
	modulesInHrm: one(modulesInHrm, {
		fields: [modulesInHrm.parent_id],
		references: [modulesInHrm.id],
		relationName: "modulesInHrm_parent_id_modulesInHrm_id"
	}),
	modulesInHrms: many(modulesInHrm, {
		relationName: "modulesInHrm_parent_id_modulesInHrm_id"
	}),
}));

export const projectsInHrmRelations = relations(projectsInHrm, ({one, many}) => ({
	userInHrm: one(userInHrm, {
		fields: [projectsInHrm.user_id],
		references: [userInHrm.id]
	}),
	_employeesToprojectsInHrms: many(_employeesToprojectsInHrm),
}));

export const clientsInHrmRelations = relations(clientsInHrm, ({one, many}) => ({
	userInHrm: one(userInHrm, {
		fields: [clientsInHrm.user_id],
		references: [userInHrm.id]
	})
}));

export const employeesInHrmRelations = relations(employeesInHrm, ({one, many}) => ({
	userInHrm: one(userInHrm, {
		fields: [employeesInHrm.employer_id],
		references: [userInHrm.id]
	}),
	_employeesToprojectsInHrms: many(_employeesToprojectsInHrm),
}));

export const AccountInHrmRelations = relations(AccountInHrm, ({one}) => ({
	userInHrm: one(userInHrm, {
		fields: [AccountInHrm.userId],
		references: [userInHrm.id]
	}),
}));

export const SessionInHrmRelations = relations(SessionInHrm, ({one}) => ({
	userInHrm: one(userInHrm, {
		fields: [SessionInHrm.userId],
		references: [userInHrm.id]
	}),
}));

export const _employeesToprojectsInHrmRelations = relations(_employeesToprojectsInHrm, ({one}) => ({
	employeesInHrm: one(employeesInHrm, {
		fields: [_employeesToprojectsInHrm.A],
		references: [employeesInHrm.id]
	}),
	projectsInHrm: one(projectsInHrm, {
		fields: [_employeesToprojectsInHrm.B],
		references: [projectsInHrm.id]
	}),
}));