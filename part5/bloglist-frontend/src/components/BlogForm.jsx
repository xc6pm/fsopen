import axios from "axios";
import { useState } from "react";

const BlogForm = ({ onBlogsUpdated, user, showMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "/api/blogs",
      { title, author, url },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    console.log("blog response", response);
    if (response.status === 201) {
      showMessage(`added ${title}`);
      setTitle("");
      setAuthor("");
      setUrl("");
      onBlogsUpdated();
    } else {
      showMessage(response.data && response.data.error);
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
