describe('List Page', () => {
  beforeEach(() => {
    cy.visit('/list');
  });
  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('[data-cy=input]').should('have.value', '');
    cy.get('[data-cy=addHead]').should('be.disabled');
    cy.get('[data-cy=addTail]').should('be.disabled');
    cy.get('[data-cy=addIndex]').should('be.disabled');
    cy.get('[data-cy=removeIndex]').should('be.disabled');
  });

  const inputTexts = ['l', 'i', 's', 't'];

  it('корректность отрисовки дефолтного списка', () => {
    inputTexts.forEach((char, index) => {
      cy.get('[data-cy=input]').type(char);
      cy.get('[data-cy=addTail]').click();
      if (index === 0) {
        cy.get('[class*=circle_content]')
          .should('have.length', index + 1)
          .each(($el) => {
            cy.wrap($el)
              .children('[class*=circle_head]')
              .should('text', 'head');
            cy.wrap($el)
              .children('[class*=circle_tail]')
              .should('text', 'tail');
            cy.wrap($el)
              .children('[class*=circle_circle]')
              .should('text', char);
          });
      } else {
        cy.get('[class*=circle_changing]').should('text', char);
      }
    });
  });
  it('добавление и удаление элемента из head', () => {
    cy.get('[data-cy=input]').type('1');
    cy.get('[data-cy=addHead]').click();
    cy.get('[data-cy=input]').type('2');
    cy.get('[data-cy=addHead]').click();
    cy.get('[class*=circle_small]').should('text', '2');
    cy.wait(1000 * 1);
    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).children('[class*=circle_modified]');
      }
    });
    cy.get('[data-cy=removeHead]').click();
    cy.get('[class*=circle_small]').should('text', '2');
    cy.get('[class*=circle_modified]').should('text', '');
  });

  it('добавления и удаление элемента из tail', () => {
    cy.get('[data-cy=input]').type('1');
    cy.get('[data-cy=addTail]').click();
    cy.get('[data-cy=input]').type('2');
    cy.get('[data-cy=addTail]').click();
    cy.get('[class*=circle_small]').should('text', '2');
    cy.wait(1000 * 1);
    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).children('[class*=circle_modified]');
      }
    });
    cy.get('[data-cy=removeTail]').click();
    cy.get('[class*=circle_small]').should('text', '2');
    cy.get('[class*=circle_modified]').should('text', '');
  });

  it('добавления и удаление элемента по индексу', () => {
    const elementIndex = 0;
    cy.get('[data-cy=input]').type('1');
    cy.get('[data-cy=index]').type(elementIndex);
    cy.get('[data-cy=addIndex]').click();
    cy.get('[data-cy=input]').type('2');
    cy.get('[data-cy=index]').type(elementIndex);
    cy.get('[data-cy=addIndex]').click();
    cy.get('[class*=circle_small]').should('text', '2');
    cy.wait(1000 * 1);
    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === elementIndex) {
        cy.wrap($el).children('[class*=circle_modified]');
      }
    });
    cy.get('[data-cy=index]').type(elementIndex);
    cy.get('[data-cy=removeIndex]').click();
    cy.get('[class*=circle_small]').should('text', '2');
    cy.get('[class*=circle_modified]').should('text', '');
  });
});
