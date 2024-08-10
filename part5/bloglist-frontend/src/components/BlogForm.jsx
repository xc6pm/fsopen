import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (createBlog({ title, author, url })) {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <>
      <h1>create new</h1>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
