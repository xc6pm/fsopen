import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

test("BlogForm submits correct data", async () => {
  const submitHandler = vi.fn();
  const newBlog = {
    title: "5 Ways to Build Resilience and Conquer Adversity",
    author: "Mark Manson",
    url: "https://markmanson.net/resilience",
  };

  const container = render(<BlogForm createBlog={submitHandler} />).container;

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");

  await userEvent.type(titleInput, newBlog.title);
  await userEvent.type(authorInput, newBlog.author);
  await userEvent.type(urlInput, newBlog.url);

  const submitButton = screen.getByRole("button");
  await userEvent.click(submitButton);

  expect(submitHandler.mock.calls).toHaveLength(1);
  expect(submitHandler.mock.calls[0][0]).toStrictEqual(newBlog)
});
