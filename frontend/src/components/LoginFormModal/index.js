import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <div className="modal">
        <div className="welcome-title">
          <h1 className="login-title">Welcome to MyBnB</h1>
        </div>
        <form className="modal-container" onSubmit={handleSubmit}>
          <ul className="error-login-container">
            {errors.map((error, idx) => (
              <li className="error-credential" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label>
            <input
              className="modal-input"
              placeholder="Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className="modal-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="modal-form-buttons" type="submit">
            Log In
          </button>
          <button
            type="submit"
            className="modal-form-buttons"
            onClick={() => {
              setCredential("Demo-lition");
              setPassword("password");
            }}
          >
            Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
