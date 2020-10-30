describe('Login', () => {
  it('Go to login view', function() {
    cy.GoToLogin()
  })

  it('Can\'t login with incorrect credentials', function() {
    cy.get('#username').type('sara')
    cy.get('#password').type('test123')
    cy.get('#loginButton').click()
    cy.contains('Incorrect password or username').should('exist')
    cy.get('button.swal2-confirm').click()
  })

})
