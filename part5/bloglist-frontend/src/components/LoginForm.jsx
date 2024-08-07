import { useState } from "react";
import { login } from "../services/login";

const LoginForm = ({ onUserChanged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Login")
    const user = await login(username, password);
    console.log("result ", user)
    onUserChanged(user);
  };

  return (
    <>
      <h1>log in to application</h1>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
