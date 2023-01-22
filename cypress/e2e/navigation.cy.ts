const validateAllLinksOnPage = () => {
  // Gather a list of all the links on the page
  cy.get(`a:not([href*='mailto:']):not([href^='tel:'])`).then((links) => {
    // Iterate over the list of links
    links.each((_index, link) => {
      // Get the href attribute of the link
      const href = link.getAttribute('href')!;

      cy.request(href);
    });
  });
};

describe('Check links', () => {
  it('Checks homepage links', () => {
    cy.visit('/');
    validateAllLinksOnPage();
  });
});

export {};
