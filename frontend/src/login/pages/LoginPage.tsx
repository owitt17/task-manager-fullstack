import React, { useState } from "react";
import { loginInfo } from "./component/LoginComponent";
import { Link } from "react-router-dom";
import axios from "axios";

const loginPage: React.FC = () => {
    const [ loginDetail, setLoginDetail ] = useState<loginInfo>({
        username: '',
        password: '',
    });

    const [ error, setError ] = useState("");
    const [message, setMessage] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);
    
        try {
          const res = await axios.post("/api/auth/login", loginDetail);
          setMessage(res.data.message);
          setLoginDetail({ username: "", password: "" });
        } catch (err: any) {
          setError(err.response?.data?.message || "Something went wrong");
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
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    
            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}
    
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Username
              </label>
              <input
                type="username"
                name="username"
                value={loginDetail.username}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
    
            <div className="mb-6">
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginDetail.password}
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
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div>
              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
    );
};

export default loginPage;