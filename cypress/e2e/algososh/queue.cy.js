import {
  CIRCLE_CHANGING_SELECTOR,
  CIRCLE_CONTENT_SELECTOR,
  CIRCLE_DEFAULT_SELECTOR,
  CIRCLE_HEAD_SELECTOR,
  CIRCLE_LETTER_SELECTOR,
  CIRCLE_SELECTOR,
  CIRCLE_TAIL_SELECTOR,
  INPUT_SELECTOR,
  REMOVE_SELECTOR,
  RESET_SELECTOR,
  SUBMIT_SELECTOR,
} from './constants';

describe('QueuePage', () => {
  beforeEach(() => {
    cy.visit('/queue');
  });

  const inputTexts = ['q', 'u', 'e', 'u', 'e'];

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get(INPUT_SELECTOR).should('have.value', '');
    cy.get(SUBMIT_SELECTOR).should('be.disabled');
  });

  it('цвета элементов меняются и каждый шаг анимации отрабатывает корректно', () => {
    inputTexts.forEach((char, index) => {
      cy.get(INPUT_SELECTOR).type(char);
      cy.get(SUBMIT_SELECTOR).click();
      cy.get(CIRCLE_CONTENT_SELECTOR).each(($el, elIndex) => {
        cy.wrap($el)
          .find(CIRCLE_LETTER_SELECTOR)
          .invoke('text')
          .then((text) => {
            // Проверяем, что текст не пустой
            if (text.trim() !== '') {
              if (index === elIndex) {
                cy.wrap($el).children(CIRCLE_CHANGING_SELECTOR);
                cy.wrap($el)
                  .children(CIRCLE_TAIL_SELECTOR)
                  .should('text', 'tail');
              } else {
                cy.wrap($el).children(CIRCLE_DEFAULT_SELECTOR);
              }
              if (elIndex === 0) {
                cy.wrap($el)
                  .children(CIRCLE_HEAD_SELECTOR)
                  .should('text', 'head');
              }
              cy.wrap($el)
                .children(CIRCLE_SELECTOR)
                .should('text', inputTexts[elIndex]);
            }
          });
      });
    });
  });

  it('правильность удаления элемента из очереди', () => {
    cy.get(INPUT_SELECTOR).type('s');
    cy.get(SUBMIT_SELECTOR).click();
    cy.get(CIRCLE_CONTENT_SELECTOR)
      .as('circle')
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).find(CIRCLE_LETTER_SELECTOR).should('text', 's');
        }
      });
    cy.get(REMOVE_SELECTOR).click();
    cy.wait(1000 * 1);
    cy.get('@circle').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).find(CIRCLE_LETTER_SELECTOR).should('not.have.text', 's');
      }
    });
  });

  it('поведение кнопки «Очистить»', () => {
    inputTexts.forEach((char) => {
      cy.get(INPUT_SELECTOR).type(char);
      cy.get(SUBMIT_SELECTOR).click();
    });
    cy.wait(1000 * 1);
    cy.get(RESET_SELECTOR).click();
    cy.get(CIRCLE_LETTER_SELECTOR).each(($el) => {
      cy.wrap($el).should('be.empty');
    });
  });
});
