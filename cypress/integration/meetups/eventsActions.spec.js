context('Login', function() {
  beforeEach(() => {
      cy.SignIn()

  })

  it('logged users can create event', function() {
    cy.contains('Create Event').click()
    cy.get('#title').type('Test Event')
    cy.get('#description').type('Test Event Description')
    cy.get('#place').type('Sydney')
    cy.get('#dateTime').type('2021-06-01T08:30')
    cy.get('#price').type('20')
    cy.get('#capacity').type('200')
    cy.get('#createEvent').click()
    cy.contains('Your event has been created!')
  })

  it('logged users can delete event', function() {
    cy.contains('Test').click()
    cy.contains('Delete Event').click()
    cy.contains('Are you sure')
    cy.contains('Yes').click()
    cy.contains('Deleted!')
  })

  it('can cancel booking for event', function() {
    cy.get('#search').type('beer')
    cy.contains('Friday Beer').click()
    cy.contains('Cancel Booking')
    cy.contains('Cancel Booking').click()
    cy.contains('Are you sure')
    cy.contains('Cancel Booking')
    cy.contains('Cancel Booking').click()
    cy.contains('has been cancelled')
  })
})
