context('Meetups app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/groups')
  })
  it('group page can be opened', function() {
    cy.contains('Group')
  })
})
