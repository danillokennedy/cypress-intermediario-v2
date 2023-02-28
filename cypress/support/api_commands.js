const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createproject', function(projeto) {
  cy.request({
    method: 'POST',
    url: '/api/v4/projects/',
    body: {
      name: projeto.name,
      description: projeto.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('api_getallproject', function() {
  cy.request({
    method: 'GET',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('api_deleteproject', function() {
    
  cy.api_getallproject()
    .then(response => response.body.forEach(projeto =>
      cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${projeto.id}`,
        headers: { Authorization: accessToken }
      })))
})

Cypress.Commands.add('api_createissue', function(projeto) {
  cy.api_createproject(projeto)
    .then(resposta => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${resposta.body.id}/issues`,
        body: {
          title: projeto.issue.title,
          description: projeto.issue.description
          },
        headers: { Authorization: accessToken }
      })
    })
})

Cypress.Commands.add('api_createlabel', (project_id, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${project_id}/labels`,
    body: {
      name: label.name,
      color: label.color
    },
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('api_createmilestones', (marco, project_id) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${project_id}/milestones`,
    body: {
      title: marco.title,
      description: marco.description
    },
    headers: { Authorization: accessToken }
  })
})