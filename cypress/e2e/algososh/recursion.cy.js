import {
  getLetterState,
  getReversingStringSteps,
} from '../../../src/components/string/utils';
import { ITEM_SELECTOR, STRING_SELECTOR, SUBMIT_SELECTOR } from './constants';

describe('Проверка недоступности кнопки при пустом инпуте', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.get(STRING_SELECTOR).should('have.value', '').as('input');
    cy.get(SUBMIT_SELECTOR).should('be.disabled');
  });
});

describe('Строка разворачивается корректно', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('проверка на корректность выполненной операции и корректность стилей', () => {
    const testStr = 'Hello!';
    const length = testStr.length;
    const reversedStr = getReversingStringSteps(testStr);
    cy.get(STRING_SELECTOR).type(testStr);
    cy.get(SUBMIT_SELECTOR).click();
    cy.get(ITEM_SELECTOR)
      .should('have.length', length)
      .then(() => {
        for (let step = 0; step < reversedStr.length; step++) {
          cy.get(ITEM_SELECTOR).each(($circle, index) => {
            const expectedState = getLetterState(step, index, length);
            cy.wrap($circle)
              .should('have.attr', 'data-state', expectedState)
              .should('text', reversedStr[step][index]);
          });
          cy.wait(1000 * 1);
        }
      });
  });
});
