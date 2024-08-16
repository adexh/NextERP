import { pgSchema, varchar, timestamp, text, integer, uniqueIndex, foreignKey, serial, boolean, index, uuid, unique, bigint } from "drizzle-orm/pg-core"
import { init } from '@paralleldrive/cuid2';

const createId = init({
	length: 10,
	// A custom fingerprint for the host environment. This is used to help
	// prevent collisions when generating ids in a distributed system.
	fingerprint: 'dqK1eR4uBeERmw==',
  });

export const hrm = pgSchema("hrm");

export const _prisma_migrationsInHrm = hrm.table("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finished_at: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migration_name: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolled_back_at: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	started_at: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	applied_steps_count: integer("applied_steps_count").default(0).notNull(),
});

export const userInHrm = hrm.table("user", {
	id: serial("id").primaryKey().notNull(),
	f_name: varchar("f_name", { length: 200 }).notNull(),
	l_name: varchar("l_name", { length: 200 }),
	username: varchar("username", { length: 200 }),
	contact: varchar("contact", { length: 16 }),
	email: text("email").notNull(),
	password: varchar("password", { length: 50 }),
	org_email: varchar("org_email", { length: 100 }),
	address: text("address"),
	active_status: boolean("active_status").default(true).notNull(),
	role_id: integer("role_id").references(() => rolesInHrm.id, { onDelete: "set null", onUpdate: "cascade" } ),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	profileComplete: boolean("profileComplete").default(false).notNull(),
	as_client_id: integer("as_client_id"),
	tenant_id: text('tenant_id').$defaultFn(() => createId()).notNull()
},
(table) => {
	return {
		as_client_id_key: uniqueIndex("user_as_client_id_key").using("btree", table.as_client_id),
		email_key: uniqueIndex("user_email_key").using("btree", table.email),
		tenant_id_key: uniqueIndex("user_tenant_id_key").using("btree", table.tenant_id)
	}
});

export const authcodesInHrm = hrm.table("auth_code", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	code: bigint("code",{ mode: 'number' }).notNull().unique(),
	expiresAt: integer("expiresAt").notNull(),
	userId: integer("userId").notNull().references(() => userInHrm.id, { onDelete: "cascade", onUpdate: "cascade" }).unique()
},
(table) => {
	return {
		code_key: uniqueIndex("auth_code_code_key").using("btree", table.code),
		userId_key: uniqueIndex("auth_code_userId_key").using("btree", table.userId)
	}
})

export const role_modules_mapInHrm = hrm.table("role_modules_map", {
	id: serial("id").primaryKey().notNull(),
	module_id: integer("module_id").notNull().references(() => modulesInHrm.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	role_id: integer("role_id").notNull().references(() => rolesInHrm.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	tenant_id: text("tenant_id").notNull().references(() => userInHrm.tenant_id, { onDelete: "set null", onUpdate: "restrict" } ),
	active_status: boolean("active_status").default(true).notNull(),
},
(table) => {
	return {
		role_modules_unique_index: uniqueIndex("role_modules_unique_key").on(table.module_id, table.role_id, table.tenant_id)
	}
});

export const rolesInHrm = hrm.table("roles", {
	id: serial("id").primaryKey().notNull(),
	role_name: text("role_name").notNull(),
	active_status: boolean("active_status").default(true).notNull(),
},
(table) => {
	return {
		role_name_key: uniqueIndex("roles_role_name_key").using("btree", table.role_name),
	}
});

export const modulesInHrm = hrm.table("modules", {
	id: serial("id").primaryKey().notNull(),
	module_name: text("module_name").notNull(),
	parent_id: integer("parent_id"),
	active_status: boolean("active_status").notNull(),
	icon: text("icon"),
	path: text("path"),
	display_order: integer("display_order").default(0).notNull(),
},
(table) => {
	return {
		icon_key: uniqueIndex("modules_icon_key").using("btree", table.icon),
		path_key: uniqueIndex("modules_path_key").using("btree", table.path),
		modules_parent_id_fkey: foreignKey({
			columns: [table.parent_id],
			foreignColumns: [table.id],
			name: "modules_parent_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	}
});

export const projectsInHrm = hrm.table("projects", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	start_date: timestamp("start_date", { precision: 3, mode: 'date' }),
	expected_start_date: timestamp("expected_start_date", { precision: 3, mode: 'date' }).notNull(),
	expected_end_date: timestamp("expected_end_date", { precision: 3, mode: 'date' }).notNull(),
	completion_status: integer("completion_status"),
	end_date: timestamp("end_date", { precision: 3, mode: 'date' }),
	status: text("status").default('Pending').notNull(),
	team_lead: integer("team_lead"),
	budget: integer("budget").notNull(),
	actual_cost: integer("actual_cost").notNull(),
	issues: text("issues"),
	notes: text("notes"),
	documents: text("documents").array(),
	created_date: timestamp("created_date", { precision: 3, mode: 'date' }).notNull(),
	last_updated_date: timestamp("last_updated_date", { precision: 3, mode: 'date' }).notNull(),
	user_id: integer("user_id").references(() => userInHrm.id, { onDelete: "set null", onUpdate: "cascade" } ),
	tenant_id: text("tenant_id").notNull().references(() => userInHrm.tenant_id, { onDelete: "set null", onUpdate: "restrict" } )
},
(table) => {
	return {
		name_key: uniqueIndex("projects_name_key").using("btree", table.name, table.tenant_id),
	}
});

export const clientsInHrm = hrm.table("clients", {
	id: serial("id").primaryKey().notNull(),
	login_id: integer("login_id"),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	org_name: text("org_name"),
	contact: text("contact").notNull(),
	email: text("email"),
	address: text("address"),
	city: text("city"),
	state: text("state"),
	country: text("country"),
	pincode: text("pincode"),
	dob: text("dob"),
	gender: text("gender"),
	user_id: integer("user_id").references(() => userInHrm.id, { onDelete: "set null", onUpdate: "cascade" } ),
	service_provider_ids: integer("service_provider_ids").array(),
},
(table) => {
	return {
		login_id_key: uniqueIndex("clients_login_id_key").using("btree", table.login_id),
		user_id_key: uniqueIndex("clients_user_id_key").using("btree", table.user_id),
	}
});

export const employeesInHrm = hrm.table("employees", {
	id: serial("id").primaryKey().notNull(),
	login_id: integer("login_id"),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	email: text("email").notNull(),
	org_email: text("org_email").notNull(),
	contact: integer("contact").notNull(),
	address: text("address").notNull(),
	city: text("city").notNull(),
	state: text("state").notNull(),
	country: text("country").notNull(),
	pincode: text("pincode").notNull(),
	dob: timestamp("dob", { precision: 3, mode: 'date' }).notNull(),
	gender: text("gender").notNull(),
	doj: timestamp("doj", { precision: 3, mode: 'date' }).notNull(),
	dor: timestamp("dor", { precision: 3, mode: 'date' }),
	designation: text("designation").notNull(),
	salary_id: integer("salary_id").notNull(),
	employer_id: integer("employer_id").references(() => userInHrm.id, { onDelete: "set null", onUpdate: "cascade" } ),
	tenant_id: text("tenant_id").notNull().references(() => userInHrm.tenant_id, { onDelete: "set null", onUpdate: "restrict" } )
});

export const VerificationTokenInHrm = hrm.table("VerificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		identifier_token_key: uniqueIndex("VerificationToken_identifier_token_key").using("btree", table.identifier, table.token),
		token_key: uniqueIndex("VerificationToken_token_key").using("btree", table.token),
	}
});

export const AccountInHrm = hrm.table("Account", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("userId").notNull().references(() => userInHrm.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
},
(table) => {
	return {
		provider_providerAccountId_key: uniqueIndex("Account_provider_providerAccountId_key").using("btree", table.provider, table.providerAccountId),
	}
});

export const SessionInHrm = hrm.table("Session", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	sessionToken: text("sessionToken").notNull(),
	userId: integer("userId").notNull().references(() => userInHrm.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionToken_key: uniqueIndex("Session_sessionToken_key").using("btree", table.sessionToken),
	}
});

export const _employeesToprojectsInHrm = hrm.table("_employeesToprojects", {
	A: integer("A").notNull().references(() => employeesInHrm.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	B: integer("B").notNull().references(() => projectsInHrm.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		AB_unique: uniqueIndex("_employeesToprojects_AB_unique").using("btree", table.A, table.B),
		B_idx: index().using("btree", table.B),
	}
});