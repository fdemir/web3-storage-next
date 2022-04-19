/// <reference types="cypress" />

describe("user upload file", () => {
  it("users can upload file", () => {
    cy.visit("/");

    cy.intercept("GET", "*/api/socketio*").as("socketio");

    cy.waitFor("@socketio");

    cy.get("input[type=file]").attachFile("upload.json");
    cy.get("#upload-form button[type=submit]").click();
    cy.get("#upload-form button[type=submit]").should("be.disabled");
  });
});
