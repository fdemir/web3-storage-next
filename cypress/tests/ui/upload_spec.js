/// <reference types="cypress" />

describe("user upload file", () => {
  it("users can upload file", () => {
    cy.visit("/");

    cy.get("input[type=file]").attachFile("upload.json");

    cy.get("#upload-form").submit();

    cy.get("#upload-form button").should("be.disabled");

    cy.intercept("POST", "*/api/upload").as("uploadFile");

    cy.get("@uploadFile").then((response) => {
      console.log(response);
    });
  });
});
