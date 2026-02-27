import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import { useToast } from "../components/Toaster";
import { CheckCircle, User, Eye, EyeOff } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import RadioGroup from "../components/RadioGroup";
import { setLoading, setUser, setToken } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Student",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isFormValid = formData.email && formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}login`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token || null));

        toast(
          <span className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>{res.data.message}</span>
          </span>,
          "success"
        );

        navigate("/");
      } else {
        toast(res.data.message, "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast(err.response?.data?.message || "Login failed", "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const roleOptions = [
    { label: "Student", value: "Student" },
    { label: "Recruiter", value: "Recruiter" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-500">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2">
          <User className="w-6 h-6 text-blue-600 dark:text-red-400" />
          <span>Login</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <RadioGroup
            label="Role"
            options={roleOptions}
            selected={formData.role}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, role: val }))
            }
          />

          <Button type="submit" disabled={!isFormValid || loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          No account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-red-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;