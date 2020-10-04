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
    cy.get('#passwordSignup').type('test')

    cy.contains('Password must have at least 6 characters')
  })

  it('user cannot signup with incomplete data', function() {
    cy.get('#usernameSignup').type('test')
    cy.get('#nameSignup').type('test@test.com')
    cy.get('#passwordSignup').type('test123454')
    cy.get('#signupButton').click()

    cy.contains('Please fill all the required fields')
  })

  it('user cannot signup if username already exists', function() {
    cy.get('#usernameSignup').type('tom')
    cy.get('#nameSignup').type('test@test.com')
    cy.get('#passwordSignup').type('test123454')
    cy.get('#signupButton').click()

    cy.contains('This username is already taken')
  })

  it('user cannot signup if email is already in use', function() {
    cy.get('#usernameSignup').type('test')
    cy.get('#nameSignup').type('test@test.com')
    cy.get('#passwordSignup').type('test123454')
    cy.get('#emailSignup').type('anna@example.com')
    cy.get('#signupButton').click()

    cy.contains('This email is already in use')
  })
})
