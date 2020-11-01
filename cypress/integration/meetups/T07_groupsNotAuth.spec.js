context('Groups actions if user not signed in', function() {
  beforeEach(() => {
    cy.visit('https://meetups.majakulpa.com/')
    cy.get('#toggleMenu').click()
    cy.get('a span').contains('Groups').click()
    cy.url().should('include', '/groups')
    cy.contains('Learn how to code', {timeout: 10000}).should('be.visible')
  })

  it('can search for a group', function() {
    cy.get('input#search').type('Learn')
    cy.contains('Learn how to code').should('be.visible')
  })

  it('can view group details', function() {
    cy.get('input#search').type('Learn')
    cy.contains('Learn how to code').should('be.visible').click()
    cy.get('h3').contains('Learn how to code', {timeout: 6000}).should('be.visible')
    cy.get('button.bg-purple-600').contains('Login to join', {timeout: 6000}).should('be.visible')
  })

  it('users can\'t create groups if not signed in', function() {
    cy.contains('Create Group').should('not.exist')
  })

  it('has to log in to join the group', function() {
    cy.get('input#search').type('Learn')
    cy.contains('Learn how to code').should('be.visible').click()
    cy.get('button.bg-purple-600').contains('Login to join', {timeout: 6000}).should('be.visible').click()
    cy.url().should('include', '/login')
    cy.get('h2').contains('Login', {timeout: 6000}).should('be.visible')
  })
})
