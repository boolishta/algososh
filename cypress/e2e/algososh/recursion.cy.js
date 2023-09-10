import {
  getLetterState,
  getReversingStringSteps,
} from '../../../src/components/string/utils';

describe('Проверка недоступности кнопки при пустом инпуте', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.get('[data-cy=string]').should('have.value', '').as('input');
    cy.get('[data-cy=submit]').should('be.disabled');
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
    cy.get('[data-cy=string]').type(testStr);
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=item]')
      .should('have.length', length)
      .then(() => {
        for (let step = 0; step < reversedStr.length; step++) {
          cy.get('[data-cy=item]').each(($circle, index) => {
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
