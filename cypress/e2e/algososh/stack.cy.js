import {
  ADD_SELECTOR,
  CIRCLE_CHANGING_SELECTOR,
  CIRCLE_DEFAULT_SELECTOR,
  CIRCLE_HEAD_SELECTOR,
  CIRCLE_TAIL_SELECTOR,
  INPUT_SELECTOR,
  ITEM_SELECTOR,
  REMOVE_SELECTOR,
  RESET_SELECTOR,
} from './constants';

describe('StackPage', () => {
  beforeEach(() => {
    cy.visit('/stack');
  });

  const inputTexts = ['s', 't', 'a', 'c', 'k'];

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get(INPUT_SELECTOR).should('have.value', '');
    cy.get(ADD_SELECTOR).should('be.disabled');
  });

  it('Проверьте правильность добавления элемента в стек', () => {
    inputTexts.forEach((char, index) => {
      cy.get(INPUT_SELECTOR).type(char);
      cy.get(ADD_SELECTOR).click();
      cy.get(ITEM_SELECTOR)
        .children()
        .should('length', index + 1)
        .each(($el, elIndex) => {
          if (index === elIndex) {
            cy.wrap($el).children(CIRCLE_CHANGING_SELECTOR);
            cy.wrap($el).children(CIRCLE_HEAD_SELECTOR).should('text', 'top');
          } else {
            cy.wrap($el)
              .children(CIRCLE_HEAD_SELECTOR)
              .should('not.have.text', 'top');
          }

          cy.wrap($el)
            .children(CIRCLE_DEFAULT_SELECTOR)
            .should('text', inputTexts[elIndex]);

          cy.wrap($el).children(CIRCLE_TAIL_SELECTOR).should('text', elIndex);
        });
      cy.wait(1000 * 1);
    });
  });

  it('Проверить правильность удаления элемента из стека', () => {
    const inputText = 'T';
    cy.get(INPUT_SELECTOR).type(inputText);
    cy.get(ADD_SELECTOR).click();

    cy.get(REMOVE_SELECTOR).click();
    cy.get(ITEM_SELECTOR).should('have.length', 0);
  });

  it('Проверьте поведение кнопки «Очистить»', () => {
    inputTexts.forEach((text) => {
      cy.get(INPUT_SELECTOR).type(text);
      cy.get(ADD_SELECTOR).click();
    });

    cy.get(RESET_SELECTOR).click();
    cy.get(ITEM_SELECTOR).should('have.length', 0);
  });
});
