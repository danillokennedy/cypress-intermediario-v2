Cypress.Commands.add('login', function(
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {}
    ) {

    const login = function() {
      cy.visit('/users/sign_in')
      cy.get('[data-qa-selector="login_field"]').type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = function() {
      cy.visit('/')
      cy.location('pathname', {timeout: 1000})
        .should('not.eq', '/users/sign_in')
    }

    const options = {
      cacheAcrossSpecs: true,
      validate
    }

    if(cacheSession) {
      cy.session(user, login, options)
    }
    else{
      login()
    }
  })
  
  Cypress.Commands.add('logout', function() {
    cy.get('.header-user-avatar').click()
    cy.get('.sign-out-link').click() //Na Correção foi inserido "cy.contains('Sign out').click()", mas o meu deu certo também.
  })

  Cypress.Commands.add('gui_createproject', function(projeto) { 

    cy.visit('/projects/new')
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/projects/new`)
    cy.get('.prepend-top-0').should('be.visible').and('contain','New project')
    cy.get('#project_name').type(projeto.name)
    cy.get('#project_path').should('have.value', projeto.name)
    cy.get('#project_description').type(projeto.description, {delay: 0}).should('have.value', projeto.description)
    cy.get('#project_visibility_level_0').check()
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()

  })

 Cypress.Commands.add('gui_createissue', function(projeto) {   
  cy.visit(`/${Cypress.env('user_name')}/${projeto.name}/issues/new`)
  cy.contains(projeto.name).should('be.visible')
   
  cy.get('#issue_title').type(projeto.issues.name, {delay: 0})
  cy.get('#issue_description').type(projeto.issues.description, {delay: 0})
  cy.get('#issue_confidential').check()
  cy.get('input[type="submit"], Submit issue').click()
 })