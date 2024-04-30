import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, bigint, varchar, timestamp, int, char, text, smallint, foreignKey, decimal, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const category = mysqlTable("category", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	superId: bigint("super_id", { mode: "number" }).notNull(),
	categoryName: varchar("category_name", { length: 40 }).notNull(),
	remarks: varchar("remarks", { length: 200 }),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		storeId: index("category_store_id").on(table.storeId),
		categoryId: primaryKey({ columns: [table.id], name: "category_id"}),
	}
});

export const customer = mysqlTable("customer", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	customerName: varchar("customer_name", { length: 40 }).notNull(),
	customerStoreName: varchar("customer_store_name", { length: 40 }).notNull(),
	customerPhone: char("customer_phone", { length: 11 }).notNull(),
	customerEmail: varchar("customer_email", { length: 30 }),
	customerScore: int("customer_score").default(0).notNull(),
	customerLevel: int("customer_level").default(0).notNull(),
	customerAddress: varchar("customer_address", { length: 40 }).notNull(),
	remarks: varchar("remarks", { length: 200 }),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		storeId: index("customer_store_id").on(table.storeId),
		customerId: primaryKey({ columns: [table.id], name: "customer_id"}),
	}
});

export const deliveryOrder = mysqlTable("delivery_order", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	orderNumber: varchar("order_number", { length: 40 }).notNull(),
	saleOrderId: bigint("sale_order_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1),
	description: varchar("description", { length: 200 }),
	stockouter: bigint("stockouter", { mode: "number" }).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		deliveryOrderId: primaryKey({ columns: [table.id], name: "delivery_order_id"}),
	}
});

export const deliveryOrderDetail = mysqlTable("delivery_order_detail", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	deliveryOrderId: bigint("delivery_order_id", { mode: "number" }).notNull(),
	productId: bigint("product_id", { mode: "number" }).notNull(),
	warehouseId: bigint("warehouse_id", { mode: "number" }).notNull(),
	deliveryCount: int("delivery_count").notNull(),
	productDate: timestamp("product_date", { mode: 'string' }),
},
(table) => {
	return {
		deliveryOrderDetailId: primaryKey({ columns: [table.id], name: "delivery_order_detail_id"}),
	}
});

export const loggingEvent = mysqlTable("logging_event", {
	timestmp: bigint("timestmp", { mode: "number" }).notNull(),
	occurrenceTime: timestamp("occurrence_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	formattedMessage: text("formatted_message").notNull(),
	loggerName: varchar("logger_name", { length: 254 }).notNull(),
	levelString: varchar("level_string", { length: 254 }).notNull(),
	threadName: varchar("thread_name", { length: 254 }),
	referenceFlag: smallint("reference_flag"),
	arg0: varchar("arg0", { length: 254 }),
	arg1: varchar("arg1", { length: 254 }),
	arg2: varchar("arg2", { length: 254 }),
	arg3: varchar("arg3", { length: 254 }),
	callerFilename: varchar("caller_filename", { length: 254 }).notNull(),
	callerClass: varchar("caller_class", { length: 254 }).notNull(),
	callerMethod: varchar("caller_method", { length: 254 }).notNull(),
	callerLine: char("caller_line", { length: 4 }).notNull(),
	eventId: bigint("event_id", { mode: "number" }).autoincrement().notNull(),
},
(table) => {
	return {
		loggingEventEventId: primaryKey({ columns: [table.eventId], name: "logging_event_event_id"}),
	}
});

export const loggingEventException = mysqlTable("logging_event_exception", {
	eventId: bigint("event_id", { mode: "number" }).notNull().references(() => loggingEvent.eventId),
	i: smallint("i").notNull(),
	traceLine: varchar("trace_line", { length: 254 }).notNull(),
},
(table) => {
	return {
		loggingEventExceptionEventIdI: primaryKey({ columns: [table.eventId, table.i], name: "logging_event_exception_event_id_i"}),
	}
});

export const loggingEventProperty = mysqlTable("logging_event_property", {
	eventId: bigint("event_id", { mode: "number" }).notNull().references(() => loggingEvent.eventId),
	mappedKey: varchar("mapped_key", { length: 254 }).notNull(),
	mappedValue: text("mapped_value"),
},
(table) => {
	return {
		loggingEventPropertyEventIdMappedKey: primaryKey({ columns: [table.eventId, table.mappedKey], name: "logging_event_property_event_id_mapped_key"}),
	}
});

export const permission = mysqlTable("permission", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	menuCode: varchar("menu_code", { length: 255 }).default(''),
	menuName: varchar("menu_name", { length: 255 }).default(''),
	permissionCode: varchar("permission_code", { length: 255 }).default(''),
	permissionName: varchar("permission_name", { length: 255 }).default(''),
	operator: bigint("operator", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	remarks: varchar("remarks", { length: 200 }),
},
(table) => {
	return {
		permissionId: primaryKey({ columns: [table.id], name: "permission_id"}),
	}
});

export const product = mysqlTable("product", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	productName: varchar("product_name", { length: 30 }).notNull(),
	productTitle: varchar("product_title", { length: 100 }),
	productAttribute: text("product_attribute"),
	categoryId: bigint("category_id", { mode: "number" }).notNull(),
	salesStock: int("sales_stock").default(0).notNull(),
	specification: varchar("specification", { length: 20 }),
	unit: char("unit", { length: 1 }).notNull(),
	retailPrice: decimal("retail_price", { precision: 12, scale: 2 }).default('0.00').notNull(),
	mainImg: varchar("main_img", { length: 200 }),
	subImgs: text("sub_imgs"),
	articleNumber: varchar("article_number", { length: 20 }),
	barCode: varchar("bar_code", { length: 20 }).notNull(),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		goodsStoreId: index("goods_store_id").on(table.storeId),
		goodsNameStoreId: index("goods_name_storeId").on(table.productName, table.storeId),
		goodsCategory: index("goods_category").on(table.categoryId),
		goodsBarCode: index("goods_barCode").on(table.barCode),
		productId: primaryKey({ columns: [table.id], name: "product_id"}),
	}
});

export const role = mysqlTable("role", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	roleName: varchar("role_name", { length: 40 }).notNull(),
	description: varchar("description", { length: 200 }),
	operator: bigint("operator", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	storeId: bigint("store_id", { mode: "number" }),
},
(table) => {
	return {
		roleId: primaryKey({ columns: [table.id], name: "role_id"}),
	}
});

export const rolePermission = mysqlTable("role_permission", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	roleId: bigint("role_id", { mode: "number" }).notNull(),
	permissionId: bigint("permission_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1),
	description: varchar("description", { length: 200 }),
	operator: bigint("operator", { mode: "number" }).notNull(),
},
(table) => {
	return {
		rolePermissionId: primaryKey({ columns: [table.id], name: "role_permission_id"}),
		ukRolePermission: unique("uk_role_permission").on(table.roleId, table.permissionId),
	}
});

export const saleOrder = mysqlTable("sale_order", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	orderNumber: varchar("order_number", { length: 40 }).notNull(),
	customerId: bigint("customer_id", { mode: "number" }),
	seller: bigint("seller", { mode: "number" }).notNull(),
	stockouter: bigint("stockouter", { mode: "number" }),
	sumPrice: decimal("sum_price", { precision: 12, scale: 2 }).default('0.00').notNull(),
	realPay: decimal("real_pay", { precision: 12, scale: 2 }).default('0.00').notNull(),
	discountPrice: decimal("discount_price", { precision: 12, scale: 2 }).default('0.00').notNull(),
	toBePaid: decimal("to_be_paid", { precision: 12, scale: 2 }).default('0.00').notNull(),
	payType: varchar("pay_type", { length: 200 }).default('{"1":"0.00","2":"0.00","3":"0.00","4":"0.00","5":"0.00","6":"0.00"}').notNull(),
	orderStatus: int("order_status").default(1).notNull(),
	logisticsStatus: int("logistics_status"),
	remarks: varchar("remarks", { length: 200 }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	payTime: timestamp("pay_time", { mode: 'string' }),
	sendTime: timestamp("send_time", { mode: 'string' }),
	successTime: timestamp("success_time", { mode: 'string' }),
	closeTime: timestamp("close_time", { mode: 'string' }),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		salesStore: index("sales_store").on(table.storeId),
		saleSumPriceStore: index("sale_sum_price_store").on(table.sumPrice, table.storeId),
		saleOrderId: primaryKey({ columns: [table.id], name: "sale_order_id"}),
		salesNumUk: unique("sales_num_uk").on(table.orderNumber),
	}
});

export const saleOrderDetail = mysqlTable("sale_order_detail", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	saleOrderId: bigint("sale_order_id", { mode: "number" }).notNull(),
	productId: bigint("product_id", { mode: "number" }).notNull(),
	productName: varchar("product_name", { length: 30 }).notNull(),
	productTitle: varchar("product_title", { length: 65 }),
	mainImg: varchar("main_img", { length: 200 }),
	saleCount: int("sale_count").notNull(),
	salePrice: decimal("sale_price", { precision: 12, scale: 2 }).default('0.00').notNull(),
	remarks: varchar("remarks", { length: 200 }),
},
(table) => {
	return {
		saleOrderDetailId: primaryKey({ columns: [table.id], name: "sale_order_detail_id"}),
	}
});

export const stock = mysqlTable("stock", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	warehouseId: bigint("warehouse_id", { mode: "number" }).notNull(),
	productId: bigint("product_id", { mode: "number" }).notNull(),
	productDate: timestamp("product_date", { mode: 'string' }),
	shelfLife: int("shelf_life"),
	stockCount: bigint("stock_count", { mode: "number" }).notNull(),
	remarks: varchar("remarks", { length: 200 }),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		store: index("stock_store").on(table.storeId),
		stockId: primaryKey({ columns: [table.id], name: "stock_id"}),
	}
});

export const storageOrder = mysqlTable("storage_order", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	orderNumber: varchar("order_number", { length: 40 }).notNull(),
	supplierId: bigint("supplier_id", { mode: "number" }).notNull(),
	stockiner: bigint("stockiner", { mode: "number" }).notNull(),
	remarks: varchar("remarks", { length: 200 }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
	totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
},
(table) => {
	return {
		storageStore: index("storage_store").on(table.storeId),
		storageOrderId: primaryKey({ columns: [table.id], name: "storage_order_id"}),
		storageNumUk: unique("storage_num_uk").on(table.orderNumber),
	}
});

export const storageOrderDetail = mysqlTable("storage_order_detail", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	supplierId: bigint("supplier_id", { mode: "number" }),
	storageInId: bigint("storage_in_id", { mode: "number" }).notNull(),
	warehouseId: bigint("warehouse_id", { mode: "number" }).notNull(),
	productId: bigint("product_id", { mode: "number" }).notNull(),
	storageCount: int("storage_count").notNull(),
	storagePrice: decimal("storage_price", { precision: 12, scale: 2 }).default('0.00').notNull(),
	productDate: timestamp("product_date", { mode: 'string' }),
	shelfLife: int("shelf_life"),
	remarks: varchar("remarks", { length: 200 }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
(table) => {
	return {
		storageOrderDetailId: primaryKey({ columns: [table.id], name: "storage_order_detail_id"}),
	}
});

export const store = mysqlTable("store", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	storeName: varchar("store_name", { length: 40 }).notNull(),
	storePhone: varchar("store_phone", { length: 13 }).notNull(),
	storeAddress: varchar("store_address", { length: 200 }),
	storeLogo: varchar("store_logo", { length: 200 }),
	moneyCode: varchar("money_code", { length: 500 }),
	description: varchar("description", { length: 200 }),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	leaderId: bigint("leader_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		ukStoreName: index("uk_store_name").on(table.storeName),
		storeId: primaryKey({ columns: [table.id], name: "store_id"}),
		ukStoreLeader: unique("uk_store_leader").on(table.leaderId),
	}
});

export const storeUser = mysqlTable("store_user", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
	operator: bigint("operator", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
},
(table) => {
	return {
		storeUserId: primaryKey({ columns: [table.id], name: "store_user_id"}),
	}
});

export const supplier = mysqlTable("supplier", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	supplierName: varchar("supplier_name", { length: 40 }).notNull(),
	supplierPhone: char("supplier_phone", { length: 11 }).notNull(),
	supplierAddress: varchar("supplier_address", { length: 40 }).notNull(),
	supplierContacts: varchar("supplier_contacts", { length: 10 }).notNull(),
	remarks: varchar("remarks", { length: 200 }),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		supplierId: primaryKey({ columns: [table.id], name: "supplier_id"}),
	}
});

export const user = mysqlTable("user", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	userName: varchar("user_name", { length: 30 }).notNull(),
	userPassword: varchar("user_password", { length: 65 }).notNull(),
	passProblem: varchar("pass_problem", { length: 65 }),
	passAnswer: varchar("pass_answer", { length: 65 }),
	userNick: varchar("user_nick", { length: 20 }),
	userAvatar: varchar("user_avatar", { length: 200 }),
	userEmail: varchar("user_email", { length: 64 }),
	userGender: int("user_gender").default(1),
	userPhone: char("user_phone", { length: 11 }),
	userBirthday: timestamp("user_birthday", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	lastLoginIp: varchar("last_login_ip", { length: 20 }),
	operator: bigint("operator", { mode: "number" }).default(1),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1),
	storeId: bigint("store_id", { mode: "number" }),
},
(table) => {
	return {
		name: index("user_name").on(table.userName),
		userId: primaryKey({ columns: [table.id], name: "user_id"}),
		ukSysUserName: unique("uk_sys_user_name").on(table.userName),
	}
});

export const userRole = mysqlTable("user_role", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }).notNull(),
	roleId: int("role_id").notNull(),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
},
(table) => {
	return {
		userRoleId: primaryKey({ columns: [table.id], name: "user_role_id"}),
	}
});

export const warehouse = mysqlTable("warehouse", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	warehouseName: varchar("warehouse_name", { length: 40 }).notNull(),
	description: varchar("description", { length: 200 }),
	storeKeeper: bigint("store_keeper", { mode: "number" }),
	operator: bigint("operator", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
	deleteStatus: int("delete_status").default(1).notNull(),
	storeId: bigint("store_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		store: index("warehouse_store").on(table.storeId),
		warehouseId: primaryKey({ columns: [table.id], name: "warehouse_id"}),
	}
});