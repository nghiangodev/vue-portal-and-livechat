const fs = require('fs')
const path = require('path')

const existName = process.argv[2]
const moduleName = process.argv[3]
const routeName = process.argv[4]
const routeUrl = process.argv[5]

if (!existName || !moduleName || !routeName || !routeUrl) {
	console.error('Please provide existing folder name, module name, route name, and route URL.')
	process.exit(1)
}

const businessPath = path.join(__dirname, '..', 'src', 'modules/business')

try {
	// Check if the business directory exists
	if (!fs.existsSync(businessPath)) {
		fs.mkdirSync(businessPath)
	}

	const modulePath = path.join(businessPath, existName)

	// Check if the module directory already exists
	if (!fs.existsSync(modulePath)) {
		console.log(`Module "${existName}" does not exist. Creating a new folder with the same name.`)
		fs.mkdirSync(modulePath)
	}

	const newFolderPath = path.join(modulePath, moduleName)

	// Ensure the new folder doesn't exist
	if (!fs.existsSync(newFolderPath)) {
		fs.mkdirSync(newFolderPath)

		// List of folders and files to create
		const foldersAndFiles = [
			{type: 'folder', name: 'i18n', children: ['/template/i18n/en.js', '/template/i18n/vi.js']},
			{type: 'folder', name: 'style', children: ['./template/style/index.scss']},
			{type: 'folder', name: 'view', children: ['./template/view/Index.vue', './template/view/Form.vue']},
			{type: 'file', name: 'router.js', content: generateRouterContent(routeName, routeUrl)},
			{type: 'file', name: 'service.js', path: './template/service.js'},
			{type: 'file', name: 'store.js', path: './template/store.js'},
		]

		// Create module structure inside the new folder
		foldersAndFiles.forEach((item) => {
			const itemPath = path.join(newFolderPath, item.name)

			if (item.type === 'folder') {
				if (!fs.existsSync(itemPath)) {
					fs.mkdirSync(itemPath)
				}
				// Copy files inside the folder
				if (item.children) {
					item.children.forEach((childPath) => {
						const childFileName = path.basename(childPath)
						const destinationPath = path.join(itemPath, childFileName)
						fs.copyFileSync(path.join(__dirname, childPath), destinationPath)
						console.log(`File "${childFileName}" copied successfully to folder "${item.name}".`)
					})
				}
			} else if (item.type === 'file') {
				if (item.content) {
					// If content is provided, write it to the file
					fs.writeFileSync(itemPath, item.content)
					console.log(`File "${item.name}" created successfully.`)
				} else if (item.path) {
					// If path is provided, copy the file
					fs.copyFileSync(path.join(__dirname, item.path), itemPath)
					console.log(`File "${item.name}" copied successfully.`)
				}
			}
		})

		console.log(`Module "${moduleName}" added successfully inside the folder "${existName}".`)
	} else {
		console.error(`Error: The folder "${moduleName}" already exists inside the module "${existName}".`)
	}
} catch (err) {
	console.error(`Error creating or updating module: ${err.message}`)
}

function generateRouterContent(routeName, routeUrl) {
	return `const ${routeName}Routes = [
    {
        path: "/${routeUrl}",
        name: "${routeName}",
        component: () => import("./view/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/${routeUrl}/form/:id?",
        name: "${routeName}Form",
        component: () => import("./view/Form.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

export default ${routeName}Routes;
`
}
