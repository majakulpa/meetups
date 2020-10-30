describe('User account', () => {
  it('Sign in', function() {
    cy.SignIn()
  })

  it('Can view user account', function() {
    cy.get('#toggleMenu').click()
    cy.get('#profileImg').click()
    cy.url().should('include', '/my-account/')
    cy.get('label.block').contains('Username').should('be.visible')
    cy.get('label.block').contains('Email').should('be.visible')
  })

  it('Can edit account', function() {
    cy.get('span').contains('Sara').click()
    cy.get('input.shadow').should('be.visible')
    cy.get('button').contains('Save').should('be.visible').click()
    cy.contains('Your data has been edited')
  })
  
})

  
