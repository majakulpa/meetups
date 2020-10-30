context('Events', function() {
    beforeEach(() => {
        cy.SignIn()
  
    })
    
    it('Can create event', function() {
      cy.contains('Create Event').click()
      cy.url().should('include', '/create-event')
      cy.get('h3').contains('New Event').should('be.visible')
      cy.get('#title').type('Test Event XYZ')
      cy.get('#description').type('Test Event Description')
      cy.get('#place').type('Sydney')
      cy.get('#dateTime').type('2021-06-01T08:30')
      cy.get('#price').type('20')
      cy.get('#capacity').type('200')
      cy.get('#createEvent').click()
      cy.contains('Your event has been created!').should('be.visible')
    })
  
    it('Can delete event', function() {
      cy.contains('Test Event XYZ').click()
      cy.contains('Delete Event').click()
      cy.contains('Are you sure').should('be.visible')
      cy.contains('Yes').click()
      cy.contains('Deleted!').should('be.visible')
    })
  
  })
  