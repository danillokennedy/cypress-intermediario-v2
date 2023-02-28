import { faker } from '@faker-js/faker'

describe('Gitlab Project Clone', () => {

    const projeto = {
        name: `Projeto-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    beforeEach(() => {
        cy.api_deleteproject()
        cy.api_createproject(projeto)
    })

    it("Sucesso", () => {
        cy.cloneviaSSH(projeto)

        cy.readFile(`cypress/downloads/${projeto.name}/README.md`)
        .should('contain', `# ${projeto.name}`)
        .and('contain', projeto.description)
 
    })

})