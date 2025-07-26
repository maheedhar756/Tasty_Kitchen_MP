import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate(); 

  const jwtToken = Cookies.get("jwt_token");
  // If the user is already logged in, redirect to home page
  // This check is done to prevent the user from accessing the login page if they are already logged in
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = error => {
    setShowSubmitError(true);
    if (error === "username and password didn't match") {
      setErrorMsg("Incorrect username or password");
    } else {
      setErrorMsg(error);
    }
  };

  const submitForm = async event => {
    event.preventDefault();
    const userDetails = { username, password };

    const response = await fetch("https://apis.ccbp.in/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return(
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <h1 className="login-heading">Login</h1>
        <label htmlFor="username" className="login-label">Username</label>
        <input
          type="text"
          id="username"
          className="login-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" className="login-label">Password</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <EyeOff onClick={() => setShowPassword(false)} className="toggle-password-icon" />
          ) : (
            <Eye onClick={() => setShowPassword(true)} className="toggle-password-icon" />
          )}
        </div>
        {showSubmitError && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
