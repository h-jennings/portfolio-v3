import { PATHS } from '@utils/common/constants/paths.constants';

describe('Core Navigation Works', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
  });
  it('should navigate to the now page', () => {
    cy.get('[data-cy=now-link]').click();

    cy.url().should('include', PATHS.now);
  });
});
