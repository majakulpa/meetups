import 'cypress-wait-until';

Cypress.Commands.add("SignIn", () => {
    cy.visit('https://meetups.majakulpa.com/#/login')
    cy.get('h2').contains('Login').should('be.visible')
    cy.get('#username').type('sara')
    cy.get('#password').type('sara')
    cy.get('#loginButton').contains('Login').should('be.visible').click()
    cy.contains('Welcome').should('be.visible')
    cy.contains('Upcoming events', {timeout: 10000}).should('be.visible')
})

Cypress.Commands.add("GoToLogin", () => {
    cy.visit('https://meetups.majakulpa.com/')
    cy.get('#toggleMenu').click()
    cy.get('a span').contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('h2').contains('Login').should('be.visible')
})