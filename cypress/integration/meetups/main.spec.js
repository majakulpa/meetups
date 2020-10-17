context('Meetups app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Events')
  })

  it('free events button exists', function() {
    cy.get('#freeEvents').click()
  })
})
