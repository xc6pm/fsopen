const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "login" });
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
    const form = loginButton.locator("..")

    expect(form).toBeVisible()

    expect((await (inputs)).length).toBe(2)
  });
});
