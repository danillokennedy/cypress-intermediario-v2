const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true, //para não mostrar o token na visualização do cypress
      requestMode: true, //um mod onde alterar o cy.api para cy.request, umas vez usando o plugin para visualizar comando api no vizualizador
      snapshotOnly : true //para misturar no visualizador os processos tanto no api quanto gui, informações a mais abaixo
    },
    experimentalRunAllSpecs: true //habilitar a execução de todos os testes em modo E2E
  },
  fixturesFolder: false,
  video: false,
  viewportHeight: 880,
  viewportWidth: 1280
})


// snapshotOnly : true - 3 formas de executar este plugin. A 1º é inserindo no arquivo Cypress.config.js
//2º inserindo diretamente no teste: "it('Teste', {env: { snapshotOnly: true }}, function() {"
//3º inserindo como objeto no teste declarando a variavel antes: "const objeto = { env: { snapshotOnly: true } } it('Teste', objeto, function() {"