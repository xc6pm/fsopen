const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  const rootUser = { username: "root", name: "James", password: "12345678" };

  beforeEach(async ({ page, request }) => {
    await request.delete("/api/blogs");
    await request.delete("/api/users");

    const response = await request.post("/api/users", { data: rootUser });
    expect(response.ok()).toBeTruthy();

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const form = page.getByTestId("loginForm");

    await expect(form).toBeVisible();

    const inputs = form.getByRole("textbox").all();
    expect((await inputs).length).toBe(2);
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.fill("#username", rootUser.username);
      await page.fill("#password", rootUser.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText(`${rootUser.name} logged in`)).toBeVisible();
    });

    test("fails with wrong username", async ({ page }) => {
      await page.fill("#username", rootUser.username + "j");
      await page.fill("#password", rootUser.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByTestId("message")).toBeVisible();
    });

    test("fails with wrong password", async ({ page }) => {
      await page.fill("#username", rootUser.username);
      await page.fill("#password", rootUser.password + "2");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByTestId("message")).toBeVisible();
    });
  });
});
