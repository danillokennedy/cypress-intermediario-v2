import { faker } from '@faker-js/faker'

describe('Inserindo um Marco na Issue', () => {

    const projeto = {
        name: `projeto-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        issue: {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    const marco = {
        title: `milestone-${faker.random.word()}`,
        description: faker.random.words(5)
    }

    beforeEach(() => {
        cy.api_deleteproject()
        cy.login()
        cy.api_createissue(projeto)
            .then(resposta => {
                cy.api_createmilestones(marco, resposta.body.project_id)
                cy.visit(`/${Cypress.env("user_name")}/${projeto.name}/issues/${resposta.body.iid}`)
            })
        
    })

    it('Sucesso', function() {
        cy.gui_setmilestoneonissue(marco)
        cy.get('.milestone').should('contain', marco.title)
    })

})