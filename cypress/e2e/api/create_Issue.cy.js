import {faker} from '@faker-js/faker'

describe('Criação de Issue via api', function() {

    beforeEach(function() {
        cy.api_deleteproject()
    })

    it('Sucesso', function() {

        const projeto = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            issue: {
                title: `issue-${faker.datatype.uuid()}`,
                description: faker.random.words(5)
            }
        }

        cy.api_createissue(projeto)
        .then(resposta => {
            expect(resposta.status).to.equal(201)
            expect(resposta.body.title).to.equal(projeto.issue.title)
            expect(resposta.body.description).to.equal(projeto.issue.description)
        })

    })
})