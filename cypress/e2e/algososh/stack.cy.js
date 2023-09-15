describe('StackPage', () => {
  beforeEach(() => {
    cy.visit('/stack');
  });

  const inputTexts = ['s', 't', 'a', 'c', 'k'];

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('[data-cy=input]').should('have.value', '');
    cy.get('[data-cy=add]').should('be.disabled');
  });

  it('Проверьте правильность добавления элемента в стек', () => {
    inputTexts.forEach((char, index) => {
      cy.get('[data-cy=input]').type(char);
      cy.get('[data-cy=add]').click();
      cy.get('[data-cy=item]')
        .children()
        .should('length', index + 1)
        .each(($el, elIndex) => {
          if (index === elIndex) {
            cy.wrap($el).children('[class*=circle_changing]');
            cy.wrap($el).children('[class*=circle_head]').should('text', 'top');
          } else {
            cy.wrap($el)
              .children('[class*=circle_head]')
              .should('not.have.text', 'top');
          }

          cy.wrap($el)
            .children('[class*=circle_default]')
            .should('text', inputTexts[elIndex]);

          cy.wrap($el).children('[class*=circle_tail]').should('text', elIndex);
        });
      cy.wait(1000 * 1);
    });
  });

  it('Проверить правильность удаления элемента из стека', () => {
    const inputText = 'T';
    cy.get('[data-cy=input]').type(inputText);
    cy.get('[data-cy=add]').click();

    cy.get('[data-cy=remove]').click();
    cy.get('[data-cy=item]').should('have.length', 0);
  });

  it('Проверьте поведение кнопки «Очистить»', () => {
    inputTexts.forEach((text) => {
      cy.get('[data-cy=input]').type(text);
      cy.get('[data-cy=add]').click();
    });

    cy.get('[data-cy=reset]').click();
    cy.get('[data-cy=item]').should('have.length', 0);
  });
});
