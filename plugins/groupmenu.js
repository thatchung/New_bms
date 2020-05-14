export default [
	{
		name: 'user-manager',
		title: 'Quản lý người dùng',
		priority: 1,
		hidden: false,
		permission: 'user_manager',
		children: [
			{
				title: 'Danh sách tài khoảng nội bộ',
				icon: 'mdi mdi-account-box-outline',
				path: '/account_internal',
				name: 'admin-account_internal',
				permission: 'account_internal',
				priority: 1,
				isDefault: true,
			},
			{
				title: 'Danh sách tài khoảng khách hàng',
				icon: 'mdi mdi-human-greeting',
				path: '/account_customer',
				name: 'admin-account_customer',
				permission: 'account_customer',
				priority: 1,
				isDefault: true,
			},
			{
				title: 'Danh sách người dùng',
				icon: 'mdi mdi-account',
				path: '/account',
				name: 'admin-account',
				priority: 1,
				isDefault: true,
			},
		]
	},
	{
		name: 'page-manager',
		title: 'Quản lý trang',
		priority: 1,
		hidden: false,
		permission: 'page_manager',
		children: [
			{
				title: 'Danh sách trang',
				icon: 'mdi mdi-facebook-box',
				path: '/page',
				name: 'admin-page',
				permission: 'page_manager',
				priority: 1,
				isDefault: true,
			},
		]
	},
	{
		name: 'invest-manager',
		title: 'Quản lý công nợ',
		priority: 1,
		hidden: false,
		permission: 'invest_manager',
		children: [
			{
				title: 'Danh sách công nợ',
				icon: 'mdi mdi-cash-usd',
				path: '/investment',
				name: 'admin-investment',
				permission: 'invest_manager',
				priority: 1,
			},
		]
	},
	{
		name: 'mission-manager',
		title: 'Quản lý chiến dịch',
		priority: 1,
		hidden: false,
		permission: 'mission_manager',
		children: [
			{
				title: 'Danh sách chiến dịch',
				icon: 'mdi mdi-buffer',
				path: '/mission',
				name: 'admin-mission',
				permission: 'mission_manager',
				priority: 1,
			},
		]
	},
	{
		name: 'permission-manager',
		title: 'Quản lý quyền',
		priority: 1,
		hidden: false,
		permission: 'permission_manager',
		children: [
			{
				title: 'Danh sách quyền',
				icon: 'mdi mdi-account-key',
				path: '/permission',
				name: 'admin-permission',
				priority: 1,
				isDefault: true,
			},
		]
	},
];

// export default group;
