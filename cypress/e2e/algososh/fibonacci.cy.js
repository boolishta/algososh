import { fibonacci } from '../../../src/components/fibonacci-page/utils';
import {
  CIRCLE_SELECTOR,
  INPUT_SELECTOR,
  ITEM_SELECTOR,
  SUBMIT_SELECTOR,
} from './constants';

describe('Проверка недоступности кнопки при пустом инпуте', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.get(INPUT_SELECTOR).should('have.value', '').as('input');
    cy.get(SUBMIT_SELECTOR).should('be.disabled');
  });
});

describe('Числа генерируются корректно', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('проверка на корректность выполненной операции', () => {
    const num = 7;
    const fibonacciNum = fibonacci(num);
    cy.get(INPUT_SELECTOR).type(num);
    cy.get(SUBMIT_SELECTOR).click();
    cy.get(ITEM_SELECTOR).then(() => {
      for (let step = 0; step < fibonacciNum.length; step++) {
        cy.get(CIRCLE_SELECTOR).last().should('text', fibonacciNum[step]);
        cy.wait(1000 * 1);
      }
    });
  });
});
