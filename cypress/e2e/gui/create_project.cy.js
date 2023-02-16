import {faker} from '@faker-js/faker'

describe('Criação de Projeto', function() {
    beforeEach(function() {
        cy.login()
    })

    it('Criaando um Projeto', function() {
        //const Texto = "Apenas fazendo um teste e complementando essa caixa de texto."
        const projeto = {
            name: `projeto-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        } //Template Lireral em JavaScript (sobre o comando acima)

        cy.gui_createproject(projeto)
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/root/${projeto.name}`)
        cy.contains(projeto.name).should('be.visible')
        cy.contains(projeto.description).should('be.visible')
    })  
})

//Foi percebido que, de todos os jeitos funcionou, porém, o professor segue o padrão abaixo como boas praticas:
//1ºCriação do Script teste. 2ºDeclaração das variaveis. 3ºComenando customizado para acessar a pagina (onde o foco não será verificado, mas pode se quiser). 4ºVerificações finais.

//Primeiro Jeito

//<it('Criaando um Projeto', function() {
//const Texto = "Apenas fazendo um teste e complementando essa caixa de texto."
//cy.get('.blank-state-row > [href="/projects/new"]').click()
//cy.get('.prepend-top-0').should('be.visible').and('contain','New project')
//cy.get('#project_name').type('Projeto Teste')
//cy.get('#project_path').should('have.value', 'projeto-teste')
//cy.get('#project_description').type(Texto, {delay: 0})
//cy.get('#project_visibility_level_0').check()
//cy.get('#project_initialize_with_readme').check()
//cy.get('#blank-project-pane > #new_project > .btn-success').click()

//Segundo Jeito

//it('Criaando um Projeto', function() {
//const projeto = {
//name: `projeto-${faker.datatype.uuid()}`,
//description: faker.random.words(5)
//}
//cy.get('.blank-state-row > [href="/projects/new"]').click()
//cy.get('.prepend-top-0').should('be.visible').and('contain','New project')
//cy.get('#project_name').type(projeto.name)
//cy.get('#project_path').should('have.value', projeto.name)
//cy.get('#project_description').type(projeto.description, {delay: 0}).should('have.value', projeto.description)
//cy.get('#project_visibility_level_0').check()
//cy.get('#project_initialize_with_readme').check()
//cy.get('#blank-project-pane > #new_project > .btn-success').click()

//OBS. Eu fiz de ambas as formas e deu certo também. Não foi usado o Comando Customizado.
