describe('QueuePage', () => {
  beforeEach(() => {
    cy.visit('/queue');
  });

  const inputTexts = ['q', 'u', 'e', 'u', 'e'];

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('[data-cy=input]').should('have.value', '');
    cy.get('[data-cy=submit]').should('be.disabled');
  });

  // it('цвета элементов меняются и каждый шаг анимации отрабатывает корректно', () => {
  //   inputTexts.forEach((char, index) => {
  //     cy.get('[data-cy=input]').type(char);
  //     cy.get('[data-cy=submit]').click();
  //     cy.get('[class*=circle_content]').each(($el, elIndex) => {
  //       cy.wrap($el)
  //         .find('[class*=circle_letter]')
  //         .invoke('text')
  //         .then((text) => {
  //           // Проверяем, что текст не пустой
  //           if (text.trim() !== '') {
  //             if (index === elIndex) {
  //               cy.wrap($el).children('[class*=circle_changing]');
  //               cy.wrap($el)
  //                 .children('[class*=circle_tail]')
  //                 .should('text', 'tail');
  //             } else {
  //               cy.wrap($el).children('[class*=circle_default]');
  //             }
  //             if (elIndex === 0) {
  //               cy.wrap($el)
  //                 .children('[class*=circle_head]')
  //                 .should('text', 'head');
  //             }
  //             cy.wrap($el)
  //               .children('[class*=circle_circle]')
  //               .should('text', inputTexts[elIndex]);
  //           }
  //         });
  //     });
  //   });
  // });

  it('правильность удаления элемента из очереди', () => {
    cy.get('[data-cy=input]').type('s');
    cy.get('[data-cy=submit]').click();
    cy.get('[class*=circle_content]')
      .as('circle')
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).find('[class*=circle_letter]').should('text', 's');
        }
      });
    cy.get('[data-cy=remove]').click();
    cy.wait(1000 * 1);
    cy.get('@circle').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .find('[class*=circle_letter]')
          .should('not.have.text', 's');
      }
    });
  });

  it('поведение кнопки «Очистить»', () => {
    inputTexts.forEach((char) => {
      cy.get('[data-cy=input]').type(char);
      cy.get('[data-cy=submit]').click();
    });
    cy.wait(1000 * 1);
    cy.get('[data-cy=reset]').click();
    cy.get('[class*=circle_letter]').each(($el) => {
      cy.wrap($el).should('be.empty');
    });
  });
});
