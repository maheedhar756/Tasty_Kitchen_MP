import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
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
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center">
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1753196312/login_image_t58qdc.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={submitForm}>
          <img
            src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1754365256/tasty_logo_elrolb.svg"
            alt="Login background"
            className="mx-auto mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold text-center mb-6 text-[#F7931E] italic">Tasty Kitchens</h1>
          <h1 className="text-3xl font-bold text-center mb-6 text-[#0F172A]">Login</h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="appearance-none border rounded w-full py-2 px-3 text-[#475569] leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[#171F46] text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#475569] mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 pb-3 flex items-center cursor-pointer">
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </span>
            </div>
            {showSubmitError && <p className="text-red-500 text-xs italic">{errorMsg}</p>}
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};