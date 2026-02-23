import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { useToast } from "../components/Toaster";
import { CheckCircle, AlertCircle, User, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}login`,
        { email, password, role },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast(
          <span className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>{res.data.message}</span>
          </span>,
          "success"
        );
        navigate("/");
      } else {
        toast(
          <span className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span>{res.data.message}</span>
          </span>,
          "error"
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      toast(
        <span className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span>Unexpected server error. Please try again.</span>
        </span>,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2">
          <User className="w-6 h-6 text-blue-600 dark:text-red-400" />
          <span>Login</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
              required
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Role */}
          <div className="flex space-x-4">
            {["Student", "Recruiter"].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="accent-blue-600 dark:accent-red-600"
                />
                <span className="text-gray-700 dark:text-gray-300">{r}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 dark:bg-red-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-red-700 transition font-medium flex justify-center items-center space-x-2"
          >
            {loading ? "Logging in..." : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          No account?{" "}
          <Link to="/register" className="text-blue-600 dark:text-red-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;