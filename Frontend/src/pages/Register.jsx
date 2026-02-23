import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { useToast } from "../components/Toaster"; // make sure Toaster has named export
import { UploadCloud, CheckCircle, AlertCircle, User } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Student",
  });
  const [photo, setPhoto] = useState(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) return toast("You must agree to terms & conditions", "error");

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (photo) data.append("profilePhoto", photo);

      const res = await axios.post(`${USER_API_ENDPOINT}register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast(
          <span className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>{res.data.message}</span>
          </span>,
          "success"
        );
        navigate("/login");
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
      console.error("Register error:", err);
      toast(
        <span className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span>Unexpected error occurred. Please try again.</span>
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
          <span>Register</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
          />
          {/* Phone */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
          />
          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
          />

          {/* Role */}
          <div className="flex space-x-4">
            {["Student", "Recruiter"].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={formData.role === r}
                  onChange={handleChange}
                  className="accent-blue-600 dark:accent-red-600"
                />
                <span className="text-gray-700 dark:text-gray-300">{r}</span>
              </label>
            ))}
          </div>

          {/* Profile Photo Upload */}
          <label className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <UploadCloud className="w-5 h-5" />
            <span>Upload Profile Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}

          {/* Terms */}
          <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-blue-600 dark:accent-red-600"
            />
            <span>
              Agree to{" "}
              <a href="#" className="text-blue-600 dark:text-red-400 hover:underline">
                terms & conditions
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 dark:bg-red-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-red-700 transition font-medium flex justify-center items-center space-x-2"
          >
            {loading ? (
              <>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Register</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-red-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;