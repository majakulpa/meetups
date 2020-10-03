context('Signup', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })
  it('front page can be opened', function() {
    cy.contains('Signup')
  })

  it('user can come back to login form', function() {
    cy.get('#goToLogin').click()

    cy.contains('Login')
  })

  it('password myst be at least 6 characters', function() {
    cy.get('#password').type('test')

    cy.contains('Password must have at least 6 characters')
  })

  it('user cannot signup with incomplete data', function() {
    cy.get('#username').type('test')
    cy.get('#name').type('test@test.com')
    cy.get('#password').type('test123454')
    cy.get('#signupButton').click()

    cy.contains('Oops...')
  })
})
