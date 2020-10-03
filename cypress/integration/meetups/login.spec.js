context('Login', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })
  it('front page can be opened', function() {
    cy.contains('Login')
  })

  it('user can log in', function() {
    cy.get('#username').type('sara')
    cy.get('#password').type('sara')
    cy.get('#loginButton').click()

    cy.contains('Welcome Sara')
  })

  it('user cannot loggin with incorrect credentials', function() {
    cy.get('#username').type('sara')
    cy.get('#password').type('test123')
    cy.get('#loginButton').click()

    cy.contains('Incorrect password or username')
  })

  it('user can go to signup form', function() {
    cy.get('#goToSignup').click()

    cy.contains('Signup')
  })
})
