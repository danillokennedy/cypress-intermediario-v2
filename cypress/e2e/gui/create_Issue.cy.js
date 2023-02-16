import {faker} from '@faker-js/faker'

describe('Criação de Issue', function() {

    const projeto = {
        name: `projeto-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        issues: {
            name:`issues-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }
    }

    beforeEach(function() {
        cy.login()
        cy.gui_createproject(projeto)
    })

    it('Criando uma Issue', function() {


        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${projeto.name}`)
        
        cy.gui_createissue(projeto)


        cy.contains(projeto.name).should('be.visible')
        cy.contains(projeto.issues.name).should('be.visible')
        cy.contains(projeto.issues.description).should('be.visible')
        //ou
        cy.get('.issue-details')
            .should('contain', projeto.issues.name)
            .and('contain', projeto.issues.description)
        
    })
    
})

//Para verifcar uma classe que não está conseguindo identificar. Basta inspecionar a pagina do Browser,
//na aba Console e com o comando: document.querySelector('.classe').