import React, { useState } from "react";
import axios from "axios";
import { registerDetails } from "./component/RegisterComponent";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [ registerDetails, setRegisterDetails ] = useState<registerDetails>({
    fullName: "",
    username: "",
    password: "",
    retypePassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/auth/register`,
        registerDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Response:', res);
      setMessage(res.data.message);
      setRegisterDetails({ fullName: "", username: "", password: "", retypePassword: "" });
    } catch (err: any) {
      console.error('Full error:', err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {message && (
          <div className="text-green-600 mb-4 text-center">{message}</div>
        )}

        <div className="mb-4">
          <label htmlFor="fullname" className="block font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={registerDetails.fullName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={registerDetails.username}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={registerDetails.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="retypePassword" className="block font-semibold mb-1">
            Retype Password
          </label>
          <input
            type="password"
            name="retypePassword"
            value={registerDetails.retypePassword}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <div>
          <p className="text-sm text-center mt-4">
            Have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
