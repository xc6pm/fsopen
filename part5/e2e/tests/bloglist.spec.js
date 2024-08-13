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

  const firstBlog = {
    title: "5 Ways to Build Resilience and Conquer Adversity",
    author: "Mark Manson",
    url: "https://markmanson.net/resilience",
  };
  const addFirstBlog = async (page) => {
    await page.getByRole("button", { name: "add blog" }).click();

    await page.fill("#title", firstBlog.title);
    await page.fill("#author", firstBlog.author);
    await page.fill("#url", firstBlog.url);

    await page.getByRole("button", { name: "create" }).click();

    // await page.pause();
    await expect(
      page.getByText(firstBlog.title + " " + firstBlog.author)
    ).toBeVisible();
  };

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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.fill("#username", rootUser.username);
      await page.fill("#password", rootUser.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText(`${rootUser.name} logged in`)).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await addFirstBlog(page);
    });
  });

  describe("After blog is created", () => {
    let addedBlog;
    beforeEach(async ({ page }) => {
      await page.fill("#username", rootUser.username);
      await page.fill("#password", rootUser.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText(`${rootUser.name} logged in`)).toBeVisible();

      await addFirstBlog(page);
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "more" }).click();

      let likesEl = page.getByTestId("likes");
      expect((await likesEl.textContent())[0]).toBe("0");

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText(firstBlog.title + " liked")).toBeVisible();

      await page.waitForTimeout(500)
      expect((await likesEl.textContent())[0]).toBe("1");
    });
  });
});
