context('Login', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('#username').type('sara')
    cy.get('#password').type('sara')
    cy.get('#loginButton').click()
    cy.get('#toggleMenu').click()
    cy.get('#bookings').click()
  })

  it('logged users can see their bookings', function() {
    cy.contains('Booked')
  })

  it('logged users can see their booked Events', function() {
    cy.contains('Friday Beer').click()
    cy.contains('Price')
  })
})
