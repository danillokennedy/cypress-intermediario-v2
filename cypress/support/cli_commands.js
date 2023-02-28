Cypress.Commands.add('cloneviaSSH', (projeto) => {
    const dominio = Cypress.config('baseUrl').replace('http://', '')

    cy.exec(`cd cypress/downloads/ && git clone git@${dominio}:${Cypress.env('user_name')}/${projeto.name}.git`)
})