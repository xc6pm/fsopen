import { useState } from "react";

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisible = () => {
    setDetailsVisible(!detailsVisible);
  };

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
          {blog.likes} <button>like</button>
        </span>
        <br />
        {blog.creator.name}
      </div>
    </div>
  );
};

export default Blog;
