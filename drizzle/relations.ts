import { relations } from "drizzle-orm/relations";
import { rolesInHrm, userInHrm, modulesInHrm, role_modules_mapInHrm, module_groupInHrm, projectsInHrm, clientsInHrm, employeesInHrm, AccountInHrm, SessionInHrm, _UserClientsInHrm, BackendPermissionInHrm, _ClientProjectsInHrm, _employeesToprojectsInHrm } from "./schema";

export const userInHrmRelations = relations(userInHrm, ({one, many}) => ({
	rolesInHrm: one(rolesInHrm, {
		fields: [userInHrm.role_id],
		references: [rolesInHrm.id]
	}),
	projectsInHrms: many(projectsInHrm),
	clientsInHrms: many(clientsInHrm),
	employeesInHrms: many(employeesInHrm),
	AccountInHrms: many(AccountInHrm),
	SessionInHrms: many(SessionInHrm),
	_UserClientsInHrms: many(_UserClientsInHrm),
	_ClientProjectsInHrms: many(_ClientProjectsInHrm),
}));

export const rolesInHrmRelations = relations(rolesInHrm, ({many}) => ({
	userInHrms: many(userInHrm),
	role_modules_mapInHrms: many(role_modules_mapInHrm),
	BackendPermissionInHrms: many(BackendPermissionInHrm),
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
	module_groupInHrm: one(module_groupInHrm, {
		fields: [modulesInHrm.group_id],
		references: [module_groupInHrm.id]
	}),
}));

export const module_groupInHrmRelations = relations(module_groupInHrm, ({many}) => ({
	modulesInHrms: many(modulesInHrm),
}));

export const projectsInHrmRelations = relations(projectsInHrm, ({one, many}) => ({
	userInHrm: one(userInHrm, {
		fields: [projectsInHrm.user_id],
		references: [userInHrm.id]
	}),
	_ClientProjectsInHrms: many(_ClientProjectsInHrm),
	_employeesToprojectsInHrms: many(_employeesToprojectsInHrm),
}));

export const clientsInHrmRelations = relations(clientsInHrm, ({one, many}) => ({
	userInHrm: one(userInHrm, {
		fields: [clientsInHrm.user_id],
		references: [userInHrm.id]
	}),
	_UserClientsInHrms: many(_UserClientsInHrm),
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

export const _UserClientsInHrmRelations = relations(_UserClientsInHrm, ({one}) => ({
	clientsInHrm: one(clientsInHrm, {
		fields: [_UserClientsInHrm.A],
		references: [clientsInHrm.id]
	}),
	userInHrm: one(userInHrm, {
		fields: [_UserClientsInHrm.B],
		references: [userInHrm.id]
	}),
}));

export const BackendPermissionInHrmRelations = relations(BackendPermissionInHrm, ({one}) => ({
	rolesInHrm: one(rolesInHrm, {
		fields: [BackendPermissionInHrm.roleId],
		references: [rolesInHrm.id]
	}),
}));

export const _ClientProjectsInHrmRelations = relations(_ClientProjectsInHrm, ({one}) => ({
	projectsInHrm: one(projectsInHrm, {
		fields: [_ClientProjectsInHrm.A],
		references: [projectsInHrm.id]
	}),
	userInHrm: one(userInHrm, {
		fields: [_ClientProjectsInHrm.B],
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