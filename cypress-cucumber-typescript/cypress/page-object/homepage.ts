export default class Homepage {
    // Locators
    get rangeMax() {
        return cy.get('[aria-label="ngx-slider-max"]');
    }

    get handToolsFilter() {
        return cy.get('label').contains('Hand Tools');
    }

    get powerToolsFilter() {
        return cy.get('label').contains('Power Tools');
    }

    // Methods
    visit() {
        cy.visit('https://practicesoftwaretesting.com/');
    }

    setSliderValue(value) {
        this.rangeMax.then($el => {
            const width = $el.width();
            const newValue = value / 200 * width;
            cy.wrap($el)
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { clientX: newValue })
                .trigger('mouseup');
        });
    }

    filter() {
        this.handToolsFilter.click();
        this.powerToolsFilter.click();
    }

    noResult() {
        return cy.contains('There are no products found.').should('be.visible');
    }
}

export const homepage = new Homepage();