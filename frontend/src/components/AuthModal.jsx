import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ mode, close }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
    if (!firstName || !lastName || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (firstName.length < 2 || lastName.length < 2) {
      setError("First and Last Name must be at least 4 characters.");
      return;
    }
    if (username.length < 2) {
      setError("Username must be at least 4 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
      // ✅ Dummy success
      login();
      close();
      navigate("/dashboard");
    } else {
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      login();
      close();
      navigate("/dashboard");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-10 text-gray-800 dark:text-gray-100 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-5 right-5 text-gray-400 dark:text-gray-300 text-2xl hover:text-gray-600 dark:hover:text-white transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-2 text-center">
          {mode === "login" ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          {mode === "login"
            ? "Login with your email and password."
            : "Fill in the details to get started."}
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-1/2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-1/2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
              />
            </>
          )}

          {/* Email & Password */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:from-indigo-600 hover:to-blue-500 transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  close();
                  setTimeout(() => setMode("signup"), 100);
                }}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  close();
                  setTimeout(() => setMode("login"), 100);
                }}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
