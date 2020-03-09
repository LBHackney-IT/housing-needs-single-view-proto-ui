/// <reference types="cypress" />
import jwt from 'jsonwebtoken';
describe('Details Page', () => {
  const setHackneyCookie = async isValidGroup => {
    const group = isValidGroup
      ? 'housingneeds-singleview-beta'
      : 'some-other-group';
    const token = jwt.sign({ groups: [group] }, 'a-secure-signature');
    await cy.setCookie('hackneyToken', token, {
      url: 'http://localhost:3001',
      domain: 'localhost'
    });
  };
  describe('Documents', () => {
    it('Displays title as a clickable link', () => {
      setHackneyCookie(true);

      cy.visit('http://localhost:3001/customers/5/view');
      cy.get('.activity > table > tbody > tr > td > strong > p > a').each($el =>
        cy
          .wrap($el)
          .should('contain', 'Document')
          .and('not.contain', 'Note')
          .and('not.contain', 'Academy')
          .and('have.attr', 'href')
      );
    });
  });

  describe('Read more', () => {
    it('Displays read more button if note is longer than 128 characters', () => {
      setHackneyCookie(true);

      cy.visit('http://localhost:3001/customers/5/view');

      cy.get('.activity > table > tbody > tr:nth-child(3) > td:nth-child(2)')
        .should('contain', '...')
        .and('contain', 'Read more')
        .and('not.contain', 'Read less');
      cy.get(
        '.activity > table > tbody > tr:nth-child(3) > td:nth-child(2) > span'
      )
        .click({ force: true })
        .should('contain', 'Read less')
        .and('not.contain', 'Read more');

      cy.get('.activity > table > tbody > tr:nth-child(3) > td:nth-child(2)')
        .first()
        .scrollIntoView()
        .find('span')
        .click({ force: true })
        .should('contain', 'Read more')
        .and('not.contain', 'Read less');
    });
  });

  describe('Read More', () => {
    it('Does not display read more/less button if note is less than 128 characters', () => {
      cy.get('.activity > table > tbody > tr:nth-child(4)')
        .first()
        .scrollIntoView()
        .find('td:nth-child(2)')
        .click({ force: true })
        .should('not.contain', '...')
        .and('not.contain', 'Read more')
        .and('not.contain', 'Read less');
    });
  });

  describe('Where is this from?', () => {
    it('Displays Where is this from as an expandable menu', () => {
      setHackneyCookie(true);

      cy.visit('http://localhost:3001/customers/5/view');
      cy.contains('Where is this from?');
      cy.get('.govuk-details').first();
      'not.contain', 'JIGSAW';

      cy.get('.govuk-details__summary > .govuk-details__summary-text')
        .first()
        .scrollIntoView()
        .click({ force: true });

      cy.get('.govuk-details > .govuk-details__text');
      'contain', 'JIGSAW';
    });
  });
  describe('Back to search button', () => {
    it('Back to search takes you back to search after viewing record', () => {
      setHackneyCookie(true);
      cy.visit(
        'http://localhost:3001/search?firstName=wednesday&lastName=adams'
      );
      cy.get('.govuk-button')
        .first()
        .click();
      cy.get('.govuk-back-link')
        .scrollIntoView()
        .should('contain', 'Back to search')
        .click();

      cy.get('body').should('contain', 'Customers with matching details');
    });

    it('Back to search takes you back to search after connecting records', () => {
      setHackneyCookie(true);
      cy.visit(
        'http://localhost:3001/search?firstName=wednesday&lastName=adams'
      );

      cy.get('.groupedTable')
        .first()
        .scrollIntoView()
        .find('tr')
        .then(result => {
          result.each((_, otherThing) => {
            otherThing.click();
            console.log(otherThing);
          });
        });

      cy.get('.govuk-button')
        .last()
        .scrollIntoView()
        .click({ force: true });

      cy.get('.govuk-back-link')
        .scrollIntoView()
        .should('contain', 'Back to search')
        .click();

      cy.get('body').should('contain', 'Customers with matching details');
    });

    it('Back to search takes you back to search after viewing record and clicking on more details in quick access', () => {
      setHackneyCookie(true);
      cy.visit(
        'http://localhost:3001/search?firstName=wednesday&lastName=adams'
      );
      cy.get('.govuk-button')
        .first()
        .click();

      cy.get('.quick-access__item__links')
        .last()
        .click();

      cy.get('.close').click();

      cy.get('.govuk-back-link')
        .scrollIntoView()
        .should('contain', 'Back to search')
        .click();

      cy.get('body').should('contain', 'Customers with matching details');
    });
  });
});
