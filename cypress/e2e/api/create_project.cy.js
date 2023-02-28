import {faker} from '@faker-js/faker'

describe('Criação Projetos', function() {

    beforeEach(function() {cy.api_deleteproject()})

    it("Sucesso", function() {
        const projeto = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.api_createproject(projeto)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(projeto.name)
                expect(response.body.description).to.equal(projeto.description)
            })

    })

//it('deletando_projeto', function() {cy.api_deleteproject()})

})