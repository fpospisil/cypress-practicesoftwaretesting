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

    slider(value) {
        this.rangeMax.then($el => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call($el[0], value);
            $el[0].dispatchEvent(new Event('input', { bubbles: true }));
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