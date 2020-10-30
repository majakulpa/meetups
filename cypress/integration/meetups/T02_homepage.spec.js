describe('Homepage', () => {
  it('Vew events without signin in', function() {
    cy.visit('https://meetups.majakulpa.com/')
  })

  it('Renders correctly', function() {
    cy.get('h1').contains('Find your next event').should('be.visible')
    cy.get('img.pt-2').should('be.visible')
    cy.get('button#freeEvents').contains('free events').should('be.visible')
  })

  it('Toggle between all events and free events', function() {
    cy.get('button#freeEvents').click()
    cy.get('button#freeEvents').contains('all events').should('be.visible')
  })
  it('Can\'t create events if not sign in', function() {
    cy.get('button.bg-purple-600').should('not.exist')
  })   

  it('Sign in', function() {
    cy.SignIn()
  })

  it('Can create events signed in', function() {
    cy.get('button.bg-purple-600').contains('Create Event').should('be.visible')
  })  

})
