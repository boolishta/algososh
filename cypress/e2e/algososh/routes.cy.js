describe('app works correctly with recursion route', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open recursion page after continue link click', function () {
    cy.get('a[href="/recursion"]').click();
    cy.contains('Строка');
  });
});

describe('app works correctly with fibonacci route', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open fibonacci page after continue link click', function () {
    cy.get('a[href="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });
});

describe('app works correctly with sorting route', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open sorting page after continue link click', function () {
    cy.get('a[href="/sorting"]').click();
    cy.contains('Сортировка массива');
  });
});

describe('app works correctly with stack route', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open stack page after continue link click', function () {
    cy.get('a[href="/stack"]').click();
    cy.contains('Стек');
  });
});

describe('app works correctly with queue route', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open queue page after continue link click', function () {
    cy.get('a[href="/queue"]').click();
    cy.contains('Очередь');
  });
});

describe('app works correctly with list route', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open list page after continue link click', function () {
    cy.get('a[href="/list"]').click();
    cy.contains('Связный список');
  });
});
