import { useState } from "react";
import { login } from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ onUserChanged, showMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      if (response.status < 300 && response.status >= 200)
        onUserChanged(response.data);
    } catch (error) {
      showMessage(error.response.data.error);
    }
  };

  return (
    <>
      <h1>log in to application</h1>

      <form data-testid="loginForm" onSubmit={handleFormSubmit}>
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

LoginForm.propTypes = {
  onUserChanged: PropTypes.func.isRequired,
};

export default LoginForm;
