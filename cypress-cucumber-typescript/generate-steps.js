const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { IdGenerator, messages } = require('@cucumber/messages')
const { GherkinStreams } = require('@cucumber/gherkin-streams')
const { pipeline, Writable } = require('stream')
const { promisify } = require('util')

const globPromise = promisify(glob)

const featurePattern = path.join(__dirname, 'cypress/e2e/*.feature')
const outputDir = path.join(__dirname, 'cypress/support/step_definitions')

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true })
}

;(async () => {
	try {
		const featureFilePaths = await globPromise(featurePattern)

		if (featureFilePaths.length === 0) {
			console.log('No feature files found')
			return
		}

		featureFilePaths.forEach((featureFilePath) => {
			const featureFileName = path.basename(featureFilePath, '.feature')
			const outputFilePath = path.join(
				outputDir,
				`${featureFileName}_steps.ts`,
			)

			const featureFile = fs.readFileSync(featureFilePath, 'utf-8')
			let existingSteps = new Set()
			let existingContent = ''

			if (fs.existsSync(outputFilePath)) {
				existingContent = fs.readFileSync(outputFilePath, 'utf-8')
				const stepRegex = /(Given|When|Then)\('([^']+)'/g
				let match
				while ((match = stepRegex.exec(existingContent)) !== null) {
					existingSteps.add(match[2])
				}
			}

			const writable = new Writable({
				objectMode: true,
				write(envelope, encoding, callback) {
					try {
						if (envelope.gherkinDocument) {
							const gherkinDocument = envelope.gherkinDocument
							if (
								!gherkinDocument.feature ||
								!gherkinDocument.feature.children
							) {
								throw new Error(
									`Invalid Gherkin document structure in file ${featureFilePath}`,
								)
							}
							let previousKeyword = 'Given'
							const steps =
								gherkinDocument.feature.children.flatMap(
									(child) => {
										if (child.scenario) {
											return child.scenario.steps
										} else if (child.background) {
											return child.background.steps
										} else {
											return []
										}
									},
								)

							const imports = new Set(['Given', 'When', 'Then'])
							const newStepDefinitions = steps
								.filter((step) => !existingSteps.has(step.text))
								.map((step) => {
									let keyword = step.keyword
										.trim()
										.toLowerCase()
									if (keyword === 'and') {
										keyword = previousKeyword.toLowerCase()
									} else {
										previousKeyword = step.keyword.trim()
									}
									const capitalizedKeyword =
										keyword.charAt(0).toUpperCase() +
										keyword.slice(1)
									return `${capitalizedKeyword}('${step.text}', () => {
  // Code for ${step.text}
});
`
								})
								.join('\n')

							if (newStepDefinitions.length > 0) {
								const importStatements = `import { ${Array.from(imports).join(', ')} } from '@badeball/cypress-cucumber-preprocessor';`
								const finalContent = `${importStatements}\n\n${existingContent}\n\n${newStepDefinitions}`
								fs.writeFileSync(
									outputFilePath,
									finalContent,
									'utf-8',
								)
								console.log(
									`Step definitions updated in ${outputFilePath}`,
								)
							} else {
								console.log(
									`No new step definitions to add to ${outputFilePath}`,
								)
							}
						}
					} catch (error) {
						console.error(
							`Failed to parse feature file ${featureFilePath}`,
							error,
						)
					}
					callback()
				},
			})

			pipeline(
				GherkinStreams.fromPaths([featureFilePath], {
					defaultDialect: 'en',
				}),
				writable,
				(err) => {
					if (err) {
						console.error(
							`Failed to parse feature file ${featureFilePath}`,
							err,
						)
					} else {
						console.log(
							`Successfully parsed feature file ${featureFilePath}`,
						)
					}
				},
			)
		})
	} catch (err) {
		console.error('Failed to find feature files', err)
	}
})()

//npm install @cucumber/cucumber @cucumber/gherkin-streams @cucumber/messages fs path
//npm install glob@^8.0.3 glob-promise - installation of script for making scripts automatically
//node generate-steps.js
