describe('service is available', () => {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });

  it('should by available recursion page', function () {
    cy.visit('recursion');
  });

  it('should by available fibonacci page', function () {
    cy.visit('fibonacci');
  });

  it('should by available sorting page', function () {
    cy.visit('sorting');
  });

  it('should by available stack page', function () {
    cy.visit('stack');
  });

  it('should by available queue page', function () {
    cy.visit('queue');
  });

  it('should by available list page', function () {
    cy.visit('list');
  });
});
