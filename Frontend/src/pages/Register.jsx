import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import { useToast } from "../components/Toaster";
import { CheckCircle, UploadCloud, Eye, EyeOff, User } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import RadioGroup from "../components/RadioGroup";
import Avatar from "../components/Avatar";
import { setLoading, setUser, setToken } from "../redux/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Student",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [agree, setAgree] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (!photo) return setPreview(null);
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
      return toast("Only JPG, PNG or WEBP allowed", "error");
    if (file.size > 2 * 1024 * 1024)
      return toast("Image must be less than 2MB", "error");
    setPhoto(file);
  };

  const isStrongPassword =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(formData.password);

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phoneNumber &&
    formData.password &&
    isStrongPassword &&
    agree;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) return toast("You must agree to terms", "error");
    if (!isStrongPassword)
      return toast(
        "Password must contain 1 uppercase letter, 1 number and 6+ characters",
        "error"
      );

    dispatch(setLoading(true));

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      if (photo) data.append("profilePhoto", photo);

      const res = await axios.post(`${USER_API_ENDPOINT}register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user || null));
        dispatch(setToken(res.data.token || null));

        toast(
          <span className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>{res.data.message}</span>
          </span>,
          "success"
        );
        navigate("/login");
      } else {
        toast(res.data.message, "error");
      }
    } catch (err) {
      console.error("Register error:", err);
      toast(err.response?.data?.message || "Registration failed", "error");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2">
          <User className="w-6 h-6 text-blue-600 dark:text-red-400" />
          <span>Register</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            type="text"
            name="fullName"
          />
          <Input
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            type="email"
            name="email"
          />
          <Input
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone"
            type="tel"
            name="phoneNumber"
          />

          <div className="relative">
            <Input
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              name="password"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <RadioGroup
            label="Role"
            options={roleOptions}
            selected={formData.role}
            onChange={(val) => setFormData((prev) => ({ ...prev, role: val }))}
          />

          <label className="flex items-center space-x-2 cursor-pointer">
            <UploadCloud size={20} />
            <span>Upload Profile Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>

          {preview && <Avatar src={preview} name={formData.fullName} size="xl" />}

          {/* Updated Terms & Privacy Checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              I agree to the{" "}
              <Link
                to="/terms-services"
                className="text-blue-600 dark:text-red-400 hover:underline"
              >
                Terms & Services
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-600 dark:text-red-400 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          <Button type="submit" disabled={!isFormValid || loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-red-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;