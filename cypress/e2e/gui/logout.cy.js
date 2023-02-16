/// <reference types="Cypress" />

describe('Logout GitLab', function() {
    
beforeEach(function() {
    cy.login()
    //cy.visit('/')
})

it('Testando Logout', function() {
    cy.logout()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    //Eu coloquei esse comando 'cy.get('.navbar').should('be.visible')' e deu certo, porém checando pela URL é melhor (que foi a minha inteção desde o principio)
  })
})