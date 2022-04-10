/* eslint-disable no-undef */
describe("Visitor  can ", () => {
   beforeEach(() => {
     cy.intercept("GET", "api/articles", {
       fixture: "articles.json",
     }).as("getArticles");

     cy.intercept("GET", "**/article/**", {
       fixture: "articleShow.json",
     }).as("getSingleArticle");

     cy.visit("/");

     cy.window().its("store").invoke("dispatch", {
       type: "SET_USER_AUTHENTICATED",
       payload: true,
     });

     cy.get("[data-cy=head-lines]").first().click();
   });
  describe("see a single article when authenticated", () => {
    // beforeEach(() => {
    //   cy.intercept("GET", "api/articles", {
    //     fixture: "articles.json",
    //   }).as("getArticles");

    //   cy.intercept("GET", "**/article/**", {
    //     fixture: "articleShow.json",
    //   }).as("getSingleArticle");

    //   cy.intercept("POST", "/api/auth/sign_in", {
    //     fixture: "authenticationSuccess.json",
    //     headers: { uid: "user@email.com" },
    //   });

    //   cy.intercept("GET", "api/auth/validate_token**", {
    //     fixture: "authenticationSuccess.json",
    //   });

    //   cy.visit("/");

    //   cy.get("[data-cy=show-button]").first().click();

    //   cy.get("[data-cy=login-email]").type("username");
    //   cy.get("[data-cy=login-password]").type("password");
    //   cy.get("[data-cy=login-submit-button]").click();
    // });

    it("is expected to display a sign in button", () => {
      cy.get("[data-cy=login-button]").should("be.visible");
    });

    it("is expected to inform user that login was successful", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain.text",
        "Login successful"
      );
    });

    it("is expected to display correct url", () => {
      cy.url().should("contain", "http://localhost:3000/article");
    });
    it("is expected to redirect user to selected article after loggin in", () => {
      cy.url().should("eq", "http://localhost:3000/article/1");
    });

    it("is expected to display the body of the article", () => {
      cy.get("[data-cy=article-body]").should(
        "contain.text",
        "Lorem ipsum dolor"
      );
    });
  });

  // describe("cannot see a single article in full when unauthenticated", () => {
  //   //  before(() => {
  //   //    cy.intercept("GET", "api/articles", {
  //   //      fixture: "articles.json",
  //   //    }).as("getArticles");

  //   //    cy.get("[data-cy=show-button]").first().click();
  //   //  });

  //   it("is expected to request the user to sign in", () => {
  //     cy.get("[data-cy=login-request]").should(
  //       "container.text",
  //       "Please login to view full article"
  //     );
  //   });

  //   it.only("is expected to redirect user to login screen", () => {
  //     cy.url().should("contain", "http://localhost:3000/login");
  //   });
  // });
  
});