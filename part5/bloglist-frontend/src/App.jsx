import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const blogFormTogglable = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("blogsLoggedInUser");

    if (loggedInUserJson) {
      const u = JSON.parse(loggedInUserJson);
      setUser(u);
      blogService.setToken(u.token);
    }
  }, []);

  const showMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleUserChange = (newUser) => {
    showMessage(`logged in ${newUser.name}`);
    window.localStorage.setItem("blogsLoggedInUser", JSON.stringify(newUser));
    setUser(newUser);
    blogService.setToken(newUser.token);
  };

  const logout = () => {
    window.localStorage.removeItem("blogsLoggedInUser");
    setUser(null);
    blogService.setToken("");
  };

  const refreshBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };
  const handleBlogsUpdated = () => {
    refreshBlogs();
    blogFormTogglable.current.toggleVisibility();
  };

  const handleBlogLiked = async (blog) => {
    const response = await blogService.patch(blog.id, {
      likes: blog.likes + 1,
    });
    if (response.status === 200) {
      handleBlogsUpdated();
      showMessage(`${blog.title} liked`);
    } else {
      showMessage("request failed");
    }
  };

  const createBlog = async (newBlog) => {
    const response = await axios.post("/api/blogs", newBlog, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.status === 201) {
      showMessage(`added ${title}`);
      handleBlogsUpdated();
      return true;
    } else {
      showMessage(response.data && response.data.error);
      return false;
    }
  };

  return (
    <div>
      <h2>blogs</h2>

      {message && <p style={{ color: "red" }} data-testid="message">{message}</p>}

      {!user && <LoginForm onUserChanged={handleUserChange} showMessage={showMessage}/>}
      {user && (
        <p>
          {user.name} logged in <button onClick={logout}>log out</button>
        </p>
      )}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLiked={handleBlogLiked}
            blogsUpdated={refreshBlogs}
            showMessage={showMessage}
            user={user}
          />
        ))}

      {user && (
        <Togglable buttonLabel={"add blog"} ref={blogFormTogglable}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default App;
