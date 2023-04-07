describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('When the user types in a search term', () => {
    it('should return a list of news articles', () => {
      cy.intercept('GET', 'https://newsapi.org/v2/everything*', {
        fixture: 'news-api-response.json',
      }).as('searchResults');
      cy.visit('/');
      cy.get('input[type="search"]').type('test search');
      cy.wait('@searchResults');
      cy.get('ul li').should('have.length', 10);
      cy.get('ul li:first').should('have.text', ' Test Article 1 ');
    });

    it('should show an error if there was an error when making request', () => {
      cy.intercept(
        {
          method: 'GET',
          url: 'https://newsapi.org/v2/everything*',
        },
        {
          statusCode: 500,
        }
      ).as('searchResults');
      cy.visit('/');
      cy.get('input[type="search"]').type('test search');
      cy.wait('@searchResults');
      cy.get('ul li').should('have.length', 0);
      cy.get('[data-testid="articleError"]').should(
        'have.text',
        ' Error: Something bad happened; please try again later. '
      );
    });
  });
});
