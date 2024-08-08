import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, blogsUpdated, showMessage, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisible = () => {
    setDetailsVisible(!detailsVisible);
  };

  const likeBlog = async () => {
    const response = await blogsService.patch(blog.id, {
      likes: blog.likes + 1,
    });
    if (response.status === 200) {
      showMessage(`${blog.title} liked`);
      blogsUpdated();
    } else {
      showMessage("request failed");
    }
  };

  const deleteBlog = async () => {
    if (
      window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      const response = await blogsService.remove(blog.id);
      if (response.status === 204) {
        showMessage("deleted " + blog.title);
        blogsUpdated();
      } else {
        showMessage(response.data);
      }
    }
  };

  return (
    <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleDetailsVisible}>
        {detailsVisible ? "hide" : "more"}
      </button>
      <div style={{ display: detailsVisible ? "" : "none" }}>
        {blog.url}
        <br />
        <span>
          {blog.likes} <button onClick={likeBlog}>like</button>
        </span>
        <br />
        {blog.creator.name}

        <br />

        {blog.creator.id === user?.id && (
          <button onClick={deleteBlog}>delete</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
