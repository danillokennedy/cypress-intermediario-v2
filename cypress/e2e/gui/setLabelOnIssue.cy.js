import { faker } from '@faker-js/faker'

describe('Inserindo uma Label na Issue', () => {

    const projeto = {
        name: `projeto-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        issue: {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    const label = {
        name: `label-${faker.random.word()}`,
        color: '#ffaabb'
    }

    beforeEach(() => {
        cy.api_deleteproject()
        cy.login()
        cy.api_createissue(projeto)
            .then(resposta => {
                cy.api_createlabel(resposta.body.project_id, label)
                cy.visit(`${Cypress.env('user_name')}/${projeto.name}/issues/${resposta.body.iid}`)
            })

    })
    

    it('Sucesso', () => {
        
        cy.gui_setlabelonissue(label)

        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span').should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })

})