context('Login', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('#username').type('sara')
    cy.get('#password').type('sara')
    cy.get('#loginButton').click()
  })

  it('front page can be opened', function() {
    cy.contains('Events')
  })

  it('logged users can see their profile', function() {
    cy.get('#toggleMenu').click()
    cy.get('#profileImg').click()

    cy.contains('Username')
  })
})
