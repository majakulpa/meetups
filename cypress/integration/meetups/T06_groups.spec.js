context('Groups actions if user signed in', function() {
  beforeEach(() => {
    cy.SignIn()
    cy.get('#toggleMenu').click()
    cy.get('a span').contains('Groups').click()
    cy.url().should('include', '/groups')
    cy.contains('Learn how to code', {timeout: 10000}).should('be.visible')
  })

  it('logged users can create group', function() {
    cy.contains('Create Group').should('be.visible').click()
    cy.get('#groupName').type('Test Group')
    cy.get('#groupDescription').type('Test Group Description')
    cy.get('#createGroup').click()
    cy.contains('has been created').should('be.visible')
  })

  it('can search for a group', function() {
    cy.get('input#search').type('Test')
    cy.contains('Test Group').should('be.visible')
  })

  it('logged users can delete group', function() {
    cy.contains('Test Group').click()
    cy.contains('Delete Group').click()
    cy.contains('Are you sure').should('be.visible')
    cy.contains('Yes').click()
    cy.contains('Deleted!').should('be.visible')
  })

  it('logged users can leave group', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code').should('be.visible').click()
    cy.contains('Leave group').click()
    cy.contains('Are you sure')
    cy.contains('Leave Group').click()
    cy.contains('You left').should('be.visible')
  })

  it('logged users can join group', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code').should('be.visible').click()
    cy.contains('Join Group').click()
    cy.contains('You joined').should('be.visible')
  })
})


