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
      setErrorMsg("Please enter a valid Username & Password");
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

    return (
    <div className="h-screen w-full flex items-center justify-center">
      {/* Mobile view */}
      <div className="lg:hidden relative flex flex-col max-md w-full h-screen items-center justify-center bg-gray-100">
        <img
          src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1753196312/login_image_t58qdc.jpg"
          alt="Food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div 
          className="relative z-10 w-auto p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-xs border border-white/60">
          <h2 className="text-xl font-bold text-[#BB2000] mb-6 text-center">Login</h2>
          <form className="flex flex-col space-y-4 w-80 px-4" onSubmit={submitForm}>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#f8d00c] mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-[#42BDB1]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#f8d00c] mb-1">
                Password
              </label>
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-[#42BDB1]"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </span>
              </div>
              {showSubmitError && (
                <p className="text-red-500 text-xs">{errorMsg}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg py-2 font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex flex-row h-full w-full">
        <div className="lg:w-1/2 h-full">
          <img
            src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1753196312/login_image_t58qdc.jpg"
            alt="Login background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 flex items-center justify-center p-4">
          <form
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            onSubmit={submitForm}
          >
            <img
              src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1754365256/tasty_logo_elrolb.svg"
              alt="Tasty Kitchens Logo"
              className="mx-auto mb-4 object-cover"
            />
            <h1 className="text-3xl font-bold text-center mb-6 text-[#F7931E] italic">Tasty Kitchens</h1>
            <h1 className="text-3xl font-bold text-center mb-6 text-[#BB2000]">Login</h1>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-bold mb-2 text-[#4d7437]"
              >
                Username
              </label>
              <input
                type="text"
                id="Username"
                placeholder="Enter username"
                className="border rounded-lg px-3 py-2 text-sm w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-[#F7931E]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-[#4d7437] text-sm font-bold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  placeholder="Enter password"
                  className="border rounded-lg px-3 py-2 text-sm w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-[#F7931E]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
              {showSubmitError && (
                <p className="text-red-500 text-xs">{errorMsg}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};