context('Signed user can view other users profiles', function() {
    beforeEach(() => {
        cy.SignIn()
    })
    
    it('can view other user\'s profile', function() {
        cy.get('input#search').type('create your own')
        cy.contains('Create your own', {timeout: 10000}).should('be.visible').click()
        cy.contains('Attendees', {timeout: 10000}).should('be.visible')
        cy.get('.flex-wrap a.flex.flex-col').first().click()
        cy.url().should('include', '/users/')
        cy.get('a.bg-purple-600').contains('Send email', {timeout: 10000}).should('be.visible')
      })

  })
  