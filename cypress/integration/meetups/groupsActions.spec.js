context('Login', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('#username').type('sara')
    cy.get('#password').type('sara')
    cy.get('#loginButton').click()
    cy.get('#toggleMenu').click()
    cy.get('#groupsLink').click()
  })

  it('logged users can create group', function() {
    cy.contains('Create Group').click()
    cy.get('#groupName').type('Test Group')
    cy.get('#groupDescription').type('Test Group Description')
    cy.get('#createGroup').click()
    cy.contains('has been created')
  })

  it('logged users can delete group', function() {
    cy.contains('Test Group').click()
    cy.contains('Delete Group').click()
    cy.contains('Are you sure')
    cy.contains('Yes').click()
    cy.contains('Deleted!')
  })

  it('logged users can leave group', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code').click()
    cy.contains('Leave group').click()
    cy.contains('Are you sure')
    cy.contains('Leave Group').click()
    cy.contains('You left')
  })

  it('logged users can join group', function() {
    cy.get('#search').type('Learn')
    cy.contains('Learn how to code').click()
    cy.contains('Join Group').click()
    cy.contains('You joined')
  })
})
