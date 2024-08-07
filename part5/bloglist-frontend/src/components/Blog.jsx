import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, blogsUpdated, showMessage }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisible = () => {
    setDetailsVisible(!detailsVisible);
  };

  const likeBlog = async () =>{
    const response = await blogsService.patch(blog.id, {likes: blog.likes + 1})
    if (response.status === 200) {
      showMessage(`${blog.title} liked`)
      blogsUpdated()
    } else {
      showMessage("request failed")
    }
  }

  return (
    <div style={{border: "2px solid black", margin: "5px", padding: "3px"}}>
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
      </div>
    </div>
  );
};

export default Blog;
