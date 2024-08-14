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
  const addBlog = async (page, blog) => {
    await page.getByRole("button", { name: "add blog" }).click();

    await page.fill("#title", blog.title);
    await page.fill("#author", blog.author);
    await page.fill("#url", blog.url);

    await page.getByRole("button", { name: "create" }).click();

    await expect(page.getByText(blog.title + " " + blog.author)).toBeVisible();
  };

  const login = async (page, user) => {
    await page.fill("#username", user.username);
    await page.fill("#password", user.password);
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText(`${user.name} logged in`)).toBeVisible();
  };

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, rootUser);
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
      await addBlog(page, firstBlog);
    });
  });

  describe("After blog is created", () => {
    let addedBlog;
    beforeEach(async ({ page }) => {
      await page.fill("#username", rootUser.username);
      await page.fill("#password", rootUser.password);
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText(`${rootUser.name} logged in`)).toBeVisible();

      await addBlog(page, firstBlog);
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "more" }).click();

      let likesEl = page.getByTestId("likes");
      expect((await likesEl.textContent())[0]).toBe("0");

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText(firstBlog.title + " liked")).toBeVisible();

      await page.waitForTimeout(500);
      expect((await likesEl.textContent())[0]).toBe("1");
    });

    test("blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "more" }).click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "delete" }).click();

      await expect(
        page.getByText(firstBlog.title + " " + firstBlog.author)
      ).not.toBeVisible();
    });

    test("user who did not created a blog cant see its delete button", async ({
      page,
      request,
    }) => {
      const newUser = {
        username: "johnson",
        name: "John Son",
        password: "23456789",
      };

      await request.post("/api/users", { data: newUser });
      await page.pause();
      await page.getByRole("button", { name: "log out" }).click();
      await login(page, newUser);

      await page.getByRole("button", { name: "more" }).click();

      await expect(
        page.getByRole("button", { name: "delete" })
      ).not.toBeVisible();
    });

    test("blogs are sorted by number of likes", async ({ page }) => {
      const blogs = [
        {
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
        },
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        },
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        },
        {
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        },
        {
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        },
        {
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        },
      ];

      for (let i = 0; i < blogs.length; i++) {
        await addBlog(page, blogs[i]);
      }

      const numberOfLikes = [0, 3, 5, 3, 6, 14, 4];
      const blogContainers = await page.getByTestId("blogContainer").all();
      for (let blogContainer of blogContainers) {
        await blogContainer.getByRole("button", { name: "more" }).click();
      }
      await page.waitForTimeout(300);
      let likeButtons = await Promise.all(
        blogContainers.map(
          async (c) =>
            await c
              .locator("div")
              .getByRole("button", { name: "like" })
              .elementHandle()
        )
      );
      let i = 0;
      for (let likeButton of likeButtons) {
        for (let j = 0; j < numberOfLikes[i]; j++) {
          // await page.waitForTimeout(200);
          await likeButton.click();
        }
        i++;
      }

      await page.pause();
      const likesOnItems = [];
      for (let i = 0; i < numberOfLikes.length; i++) {
        const itemContainer = blogContainers[i];
        const likes = parseInt(
          (await itemContainer.getByTestId("likes").textContent()).split(" ")[0]
        );

        likesOnItems.push(likes);
        if (i - 1 >= 0) {
          expect(likesOnItems[i] <= likesOnItems[i - 1]).toBeTruthy();
        }
      }
    });
  });
});
