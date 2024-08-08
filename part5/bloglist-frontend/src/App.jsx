import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

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
      const u = JSON.parse(loggedInUserJson)
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

  return (
    <div>
      <h2>blogs</h2>

      {message && <p style={{ color: "red" }}>{message}</p>}

      {!user && (
        <Togglable buttonLabel={"login"}>
          <LoginForm onUserChanged={handleUserChange} />
        </Togglable>
      )}
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
            blogsUpdated={refreshBlogs}
            showMessage={showMessage}
            user={user}
          />
        ))}

      {user && (
        <Togglable buttonLabel={"add blog"} ref={blogFormTogglable}>
          <BlogForm
            user={user}
            onBlogsUpdated={handleBlogsUpdated}
            showMessage={showMessage}
          />
        </Togglable>
      )}
    </div>
  );
};

export default App;
