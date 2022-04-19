/* eslint-disable no-undef */
describe("authenticated user", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/articles", {
      fixture: "articles.json",
    });
    cy.intercept("POST", "https://r.stripe.com/0", { statusCode: 201 });
    cy.visit("/");
    cy.window().its("store").invoke("dispatch", {
      type: "SET_USER_AUTHENTICATED",
      payload: true,
    });
    cy.get("[data-cy=purchase-subscription-button]").as("subscriptionButton");
  });

  it("is expected to see a purchase subscription button", () => {
    cy.get("@subscriptionButton").should("be.visible");
  });

  describe.only("filling in a form with valid cc-details", () => {
    beforeEach(() => {
      cy.get("@subscriptionButton").click()
      cy.url().should('contain', '/payment')
      // get the cc data
      // cc-number
      cy.wait(2000)
      cy.get("div[data-cy=cardnumber]").within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then((iframe) => {
          const body = iframe.contents().find("body");
          cy.wrap(body).find('[name="cardnumber"]').type("4242424242424242", { delay: 2 });
          debugger
        });
      });
      // cc-expiry date

      // cc-cvc number
    });
    it("is expected to set his status to subscriber", () => {});
  });
});
