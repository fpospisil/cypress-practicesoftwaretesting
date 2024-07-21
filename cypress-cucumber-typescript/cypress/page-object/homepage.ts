export default class homepage {
    //Locators
    get handToolsFilter() {
        return cy.get('[test-id="category-01J2BJD6JBMGGSXADNYZYC47DP"]')
    }

    get powerToolsFilter() {
        return cy.get('[test-id="category-01J2BJD6J7WV9CP3PNPHQWFE06"]')
    }

    //Methods
}

//export const homepage = new Homepage();