import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import { expect } from "vitest"

test("Renders only blog name and author", () => {
    const blog = {
        title: "Arthur Mikoyan running through the hills",
        author: "John",
        likes: 1,
        url: "arthormik.com",
        creator: {
            id: "33",
            username: "aun",
            name: "un"
        }
    }

    render(<Blog blog={blog}/>)

    const titleEl = screen.getByText(blog.title, {exact: false})
    expect(titleEl).toBeVisible()

    const authorEl = screen.getByText(blog.author, {exact: false})
    expect(authorEl).toBeVisible()

    const likesEl = screen.getByTestId("likes")
    expect(likesEl).not.toBeVisible()

    const urlEl = screen.getByText(blog.url, {exact: false})
    expect(urlEl).not.toBeVisible()
})