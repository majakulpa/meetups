describe('Signup', () => {
  it('Go to signup view', function() {
    cy.GoToLogin()
    cy.get('a#goToSignup').contains('Signup').should('be.visible').click()
    cy.url().should('include', '/signup')
    cy.get('h2').contains('Signup').should('be.visible')
  })

  it('Can toggle between login and signup', function() {
    cy.get('#goToLogin').click()
    cy.get('h2').contains('Login').should('be.visible')
    cy.get('a#goToSignup').click()
    cy.url().should('include', '/signup')
  })

  it('Can\'t signup without valida data', function() {
    cy.get('button#signupButton').contains('Signup').click()
    cy.contains('Please fill all the required fields').should('be.visible')
    cy.get('button.swal2-confirm').click()
  })

  it('password myst be at least 6 characters', function() {
    cy.get('input#passwordSignup').type('test')
    cy.get('.text-red-600').contains('Password must have at least 6 characters').should('be.visible')
  })

  it('user cannot signup with incomplete data', function() {
    cy.get('#usernameSignup').type('test')
    cy.get('#nameSignup').type('test@test.com')
    cy.get('#passwordSignup').type('test123454')
    cy.get('#signupButton').click()
    cy.contains('Please fill all the required fields').should('exist')
    cy.get('button.swal2-confirm').click()
  })

  it('user cannot signup if username already exists', function() {
    cy.reload()
    cy.get('#usernameSignup').type('sara')
    cy.get('#nameSignup').type('test@test.com')
    cy.get('#passwordSignup').type('test123454')
    cy.get('#signupButton').click()
    cy.contains('This username is already taken').should('exist')
    cy.get('button.swal2-confirm').click()
  })

  it('user cannot signup if email is already in use', function() {
    cy.reload()
    cy.get('#usernameSignup').type('test')
    cy.get('#nameSignup').type('test@test.com')
    cy.get('#passwordSignup').type('test123454')
    cy.get('#emailSignup').type('anna@example.com')
    cy.get('#signupButton').click()
    cy.contains('This email is already in use').should('exist')
    cy.get('button.swal2-confirm').click()
  })
})
