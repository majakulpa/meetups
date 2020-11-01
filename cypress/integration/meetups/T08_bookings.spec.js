context('Bookings', function() {
  beforeEach(() => {
    cy.SignIn()
    cy.get('#toggleMenu').click()
    cy.get('#bookings').contains('My bookings').should('be.visible').click()
  })

  it('logged users can see their bookings', function() {
    cy.url().should('include', '/bookings')
    cy.contains('Booked Events').should('be.visible')
  })

  it('logged users can see their booked Events', function() {
    cy.contains('Create your own Patronus').should('be.visible').click()
    cy.url().should('include', '/events/')
    cy.get('h2').contains('Create your own Patronus', {timeout: 10000}).should('be.visible')
    cy.contains('Price').should('be.visible')
  })
})
