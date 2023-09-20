import {
  ADD_HEAD_SELECTOR,
  ADD_INDEX_SELECTOR,
  ADD_TAIL_SELECTOR,
  CIRCLE_CHANGING_SELECTOR,
  CIRCLE_CONTENT_SELECTOR,
  CIRCLE_HEAD_SELECTOR,
  CIRCLE_MODIFIED_SELECTOR,
  CIRCLE_SELECTOR,
  CIRCLE_SMALL_SELECTOR,
  CIRCLE_TAIL_SELECTOR,
  INDEX_SELECTOR,
  INPUT_SELECTOR,
  REMOVE_INDEX_SELECTOR,
  REMOVE_TAIL_SELECTOR,
} from './constants';

describe('List Page', () => {
  beforeEach(() => {
    cy.visit('/list');
  });
  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get(INPUT_SELECTOR).should('have.value', '');
    cy.get(ADD_HEAD_SELECTOR).should('be.disabled');
    cy.get(ADD_TAIL_SELECTOR).should('be.disabled');
    cy.get(ADD_INDEX_SELECTOR).should('be.disabled');
    cy.get(REMOVE_INDEX_SELECTOR).should('be.disabled');
  });

  const inputTexts = ['l', 'i', 's', 't'];

  it('корректность отрисовки дефолтного списка', () => {
    inputTexts.forEach((char, index) => {
      cy.get(INPUT_SELECTOR).type(char);
      cy.get(ADD_TAIL_SELECTOR).click();
      if (index === 0) {
        cy.get(CIRCLE_CONTENT_SELECTOR)
          .should('have.length', index + 1)
          .each(($el) => {
            cy.wrap($el).children(CIRCLE_HEAD_SELECTOR).should('text', 'head');
            cy.wrap($el).children(CIRCLE_TAIL_SELECTOR).should('text', 'tail');
            cy.wrap($el).children(CIRCLE_SELECTOR).should('text', char);
          });
      } else {
        cy.get(CIRCLE_CHANGING_SELECTOR).should('text', char);
      }
    });
  });
  it('добавление и удаление элемента из head', () => {
    cy.get(INPUT_SELECTOR).type('1');
    cy.get(ADD_HEAD_SELECTOR).click();
    cy.get(INPUT_SELECTOR).type('2');
    cy.get(ADD_HEAD_SELECTOR).click();
    cy.get(CIRCLE_SMALL_SELECTOR).should('text', '2');
    cy.wait(1000 * 1);
    cy.get(CIRCLE_CONTENT_SELECTOR).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).children(CIRCLE_MODIFIED_SELECTOR);
      }
    });
    cy.get('[data-cy=removeHead]').click();
    cy.get(CIRCLE_SMALL_SELECTOR).should('text', '2');
    cy.get(CIRCLE_MODIFIED_SELECTOR).should('text', '');
  });

  it('добавления и удаление элемента из tail', () => {
    cy.get(INPUT_SELECTOR).type('1');
    cy.get(ADD_TAIL_SELECTOR).click();
    cy.get(INPUT_SELECTOR).type('2');
    cy.get(ADD_TAIL_SELECTOR).click();
    cy.get(CIRCLE_SMALL_SELECTOR).should('text', '2');
    cy.wait(1000 * 1);
    cy.get(CIRCLE_CONTENT_SELECTOR).each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).children(CIRCLE_MODIFIED_SELECTOR);
      }
    });
    cy.get(REMOVE_TAIL_SELECTOR).click();
    cy.get(CIRCLE_SMALL_SELECTOR).should('text', '2');
    cy.get(CIRCLE_MODIFIED_SELECTOR).should('text', '');
  });

  it('добавления и удаление элемента по индексу', () => {
    const elementIndex = 0;
    cy.get(INPUT_SELECTOR).type('1');
    cy.get(INDEX_SELECTOR).type(elementIndex);
    cy.get(ADD_INDEX_SELECTOR).click();
    cy.get(INPUT_SELECTOR).type('2');
    cy.get(INDEX_SELECTOR).type(elementIndex);
    cy.get(ADD_INDEX_SELECTOR).click();
    cy.get(CIRCLE_SMALL_SELECTOR).should('text', '2');
    cy.wait(1000 * 1);
    cy.get(CIRCLE_CONTENT_SELECTOR).each(($el, index) => {
      if (index === elementIndex) {
        cy.wrap($el).children(CIRCLE_MODIFIED_SELECTOR);
      }
    });
    cy.get(INDEX_SELECTOR).type(elementIndex);
    cy.get(REMOVE_INDEX_SELECTOR).click();
    cy.get(CIRCLE_SMALL_SELECTOR).should('text', '2');
    cy.get(CIRCLE_MODIFIED_SELECTOR).should('text', '');
  });
});
