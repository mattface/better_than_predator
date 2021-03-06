describe('TypeAhead', () => {
  it('Searches on type, and clears on clear', () => {
    cy.fixture('../../fixtures/filmSearch.json').as('filmSearchResults');
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie*',
      response: '@filmSearchResults',
    });
    cy.visit('/');
    cy.get('input[type="search"]').as('search');
    cy.get('@search').should('have.attr', 'placeholder', 'Find a film...');

    cy.get('@search').type('Honey, I');
    cy.wait(401);

    cy.get('ul li').as('results');
    cy.get('@results').should('have.length', 5);
    cy.get('@results').get(':first').should('contain', 'Honey, I Shrunk the Kids (1989)');
    cy.get('@results').get(':first a').should('have.attr', 'href', '#/versus/9354/honey-i-shrunk-the-kids');

    cy.get('@search').clear();
    cy.wait(401);
    cy.get('@results').should('have.length', 0);
  });
});
