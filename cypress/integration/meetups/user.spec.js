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

  it('logged users can see their bookings', function() {
    cy.get('#toggleMenu').click()
    cy.get('#bookings').click()

    cy.contains('Booked')
  })

  it('logged users can see their booked Events', function() {
    cy.get('#toggleMenu').click()
    cy.get('#bookings').click()

    cy.contains('Create').click()
    cy.contains('Price')
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

  it('logged users can create group', function() {
    cy.get('#toggleMenu').click()
    cy.get('#groupsLink').click()
    cy.contains('Create Group').click()
    cy.get('#groupName').type('Test Group')
    cy.get('#groupDescription').type('Test Group Description')
    cy.get('#createGroup').click()
    cy.contains('has been created')
  })

  it('logged users can delete group', function() {
    cy.get('#toggleMenu').click()
    cy.get('#groupsLink').click()
    cy.contains('Test Group').click()
    cy.contains('Delete Group').click()
    cy.contains('Are you sure')
    cy.contains('Yes').click()
    cy.contains('Deleted!')
  })
})
