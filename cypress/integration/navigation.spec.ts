describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=now-link]').click();

    // The new url should include "/about"
    cy.url().should('include', '/now');
  });
});
