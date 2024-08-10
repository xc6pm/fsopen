import { fireEvent, render, screen } from "@testing-library/react"
import Blog from "./Blog"
import { expect } from "vitest"

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

test("Renders only blog name and author", () => {
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

test("pressing more button displays likes and url", () => {

    render(<Blog blog={blog}/>)

    const moreButton = screen.getByText("more")

    fireEvent.click(moreButton)

    const likesEl = screen.getByTestId("likes")
    expect(likesEl).toBeVisible()

    const urlEl = screen.getByText(blog.url, {exact: false})
    expect(urlEl).toBeVisible()
})


test("")