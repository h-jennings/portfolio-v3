import { PATHS } from '@common/utils/constants/paths.constants';
import { PROJECT_METADATA } from '@work/utils/constants/projects.constants';

describe('Core Navigation Works', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
  });
  it('should navigate to the now page', () => {
    cy.get('[data-cy=now-link]').click();

    cy.url().should('include', PATHS.now);
  });

  Object.entries(PROJECT_METADATA).forEach(([key, project]) => {
    it(`should navigate to the ${key} page`, () => {
      cy.get(`[data-testid="${project.path}"]`).click();

      cy.url().should('include', project.path);
    });
  });
});
