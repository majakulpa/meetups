context('Meetups app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/groups')
  })
  it('group page can be opened', function() {
    cy.contains('Group')
  })

  it('particular group exists', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code')
  })

  it('can open grup', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code').click()
    cy.contains('Created by')
  })

  it('has to login to join group', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code').click()
    cy.get('#plusButton').click()
    cy.contains('Login')
  })
})
