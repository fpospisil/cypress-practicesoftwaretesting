import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
	e2e: {
		specPattern: 'cypress/e2e/**/*.feature',
		viewportWidth: 1920,
		viewportHeight: 1080,
		supportFile: 'cypress/support/e2e.ts',
		env: {
			username: process.env.CYPRESS_username,
			password: process.env.CYPRESS_password,
		},
		async setupNodeEvents(on, config) {
			await addCucumberPreprocessorPlugin(on, config)
			on(
				'file:preprocessor',
				createBundler({
					plugins: [createEsbuildPlugin(config)],
				}),
			)
			return config
		},
	},
})
