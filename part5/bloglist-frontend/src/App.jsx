import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("blogsLoggedInUser");

    if (loggedInUserJson) {
      setUser(JSON.parse(loggedInUserJson));
    }
  }, []);

  const handleUserChange = (newUser) => {
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

      <p>
        {user.name} logged in <button onClick={logout}>log out</button>
      </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
