import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("blogsLoggedInUser");

    if (loggedInUserJson) {
      setUser(JSON.parse(loggedInUserJson));
    }
  }, []);

  const showMessage = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleUserChange = (newUser) => {
    showMessage(`logged in ${newUser.name}`)
    window.localStorage.setItem("blogsLoggedInUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    window.localStorage.removeItem("blogsLoggedInUser");
    setUser(null);
  };

  if (!user) {
    return <LoginForm onUserChanged={handleUserChange} />;
  }

  return (
    <div>
      <h2>blogs</h2>

      {message && <p style={{color: "red"}}>{message}</p>}

      <p>
        {user.name} logged in <button onClick={logout}>log out</button>
      </p>

      <BlogForm
        user={user}
        onBlogsUpdated={() =>
          blogService.getAll().then((blogs) => setBlogs(blogs))
        }
        showMessage={showMessage}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
