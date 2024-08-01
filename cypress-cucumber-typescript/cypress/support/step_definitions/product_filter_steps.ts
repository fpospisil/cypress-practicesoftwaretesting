import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { homepage } from '../../page-object/homepage'

Given('the user is on the main page', () => {
	homepage.visit();
})

When('the user click on filter', () => {
	homepage.slider(50);
	homepage.filter();
})

Then('the user should see the filtered products', () => {
	//homepage.noResult();
})
