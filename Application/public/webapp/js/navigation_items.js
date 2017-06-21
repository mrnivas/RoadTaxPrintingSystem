var Navigation = [
	
	{

		NavName:'company',
		state:'index.companies',
		url: "/companies",
        templateUrl: "views/companies.html",
        data: { pageTitle: 'Manage Companies' },
        controller:"ManageCompanies"

	},
	{

		NavName:'hubs',
		state:'index.hubs',
		url: "/hubs/:companyId",
        templateUrl: "views/hubs.html",
        data: { pageTitle: 'Manage Hubs' },
        controller:"ManageHubs"

	},
	{

		NavName:'users',
		state:'index.users',
		url: "/users",
        templateUrl: "views/users.html",
        data: { pageTitle: 'Manage Users' },
        controller:"ManageUsers"

	},
	{

		NavName:'services',
		state:'index.services',
		url: "/services",
        templateUrl: "views/services.html",
        data: { pageTitle: 'Manage Services' },
        controller:'ManageServices'

	},
	{

		NavName:'services_prices',
		state:'index.services_prices',
		url: "/service_prices",
        templateUrl: "views/service_prices.html",
        data: { pageTitle: 'Manage Services Prices' },
        controller:'ManageServicesPrices'

	},
	{

		NavName:'units',
		state:'index.units',
		 url: "/units",
        templateUrl: "views/units.html",
        data: { pageTitle: 'Manage Units' },
        controller:'ManageUnits'

	},
	{

		NavName:'employee',
		state:'index.employee',  
		url: "/employee",
        templateUrl: "views/employee.html",
        data: { pageTitle: 'Manage Employees' },
        controller:"ManageEmployees"

	}
];