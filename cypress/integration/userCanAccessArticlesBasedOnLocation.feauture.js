describe("Visitor can view articles based on their location ", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.opencagedata.com/geocode/v1/json**", {
      fixture: "location.json",
    }).as("getLocation");
    cy.intercept("GET", "api/articles", {
      fixture: "articles.json",
    }).as("getArticles");

     cy.visit("/", {
       onBeforeLoad(window) {
         const stubLocation = {
           coords: {
             latitude: 57.7308044,
             longitude: 11.9834368,
           },
         };
         cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
           (callback) => {
             return callback(stubLocation);
           }
         );
       },
     });
  });

  it("is expected to display the users location ", () => {
    cy.get("[data-cy=user-location]").should("exist");
  });

  it("is expected to show the correct user location", () => {
    cy.get("[data-cy=user-location]").should("contain", "Sweden");
  });

  it("is expected to display  Sports articles from the relevant location", () => {
    cy.get("[data-cy=sports-link]").click();
    cy.get("[data-cy=articles-list]")
      .children()
      .first()
      .within(() => {
        cy.get("[data-cy=article-location]")
          .should("contain.text", "Sweden")
          .and("be.visible");
      });
  });

  it("is expected to display Business articles from the relevant location", () => {
    cy.get("[data-cy=business-link]").click();
    cy.get("[data-cy=articles-list]")
      .children()
      .last()
      .within(() => {
        cy.get("[data-cy=article-location]")
          .should("contain.text", "Sweden")
          .and("be.visible");
      });
  });
});
