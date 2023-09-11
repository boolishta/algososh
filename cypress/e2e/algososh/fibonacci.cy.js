import { fibonacci } from '../../../src/components/fibonacci-page/utils';

describe('Проверка недоступности кнопки при пустом инпуте', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.get('[data-cy=input]').should('have.value', '').as('input');
    cy.get('[data-cy=submit]').should('be.disabled');
  });
});

describe('Числа генерируются корректно', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('проверка на корректность выполненной операции', () => {
    const num = 7;
    const fibonacciNum = fibonacci(num);
    cy.get('[data-cy=input]').type(num);
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=item]').then(() => {
      for (let step = 0; step < fibonacciNum.length; step++) {
        cy.get('[class^="circle_circle"]')
          .last()
          .should('text', fibonacciNum[step]);
        cy.wait(1000 * 1);
      }
    });
  });
});
