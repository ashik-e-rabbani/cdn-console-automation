describe("Asians Group Domain Configuration", () => {
  const editDomain = (domainName) => {
    cy.contains("h3", domainName)
      .parentsUntil(".ant-list-item")
      .parent()
      .first()
      .within(() => {
        cy.contains("button", "Edit").click();
      });
  };

  const clickTab = (tabLabel) => {
    cy.get('div[role="tab"]').contains(tabLabel).should("be.visible").click();
  };

  const clickSave = () => {
    cy.contains("Save").click();
    cy.contains("Domain saved successfully").should("be.visible");
  };

  beforeEach(() => {
    cy.login();
  });

  it("Configures domain test03.p9m.net", () => {
    editDomain("test03.p9m.net");

    cy.get(".ant-tabs-tab-next").should("be.visible").click();
    clickTab("Advanced configuration");
    cy.contains(" Cache strategy ").should("be.visible").click();

    // Toggle ON
    // cy.get('button[role="switch"]').first().click();
    cy.get(".d-flex.flex-fill > .flex-fill > .d-flex > .mr-2").click();

    clickSave();
  });

  it("Validates domain test01.p9m.net config", () => {
    editDomain("test01.p9m.net");
    clickTab("Basic configuration");

    // Assert radio button is checked
    cy.get("#redirect-traffic-action").should("be.checked");

    // save button
    cy.contains("Save").click();
  });
});
