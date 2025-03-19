"use client";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 text-left">
        <h2 className="text-2xl font-bold text-left mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-3">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-3 flex items-center">
            <input
              type="checkbox"
              className="checkbox mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember Me</label>
          </div>
          <button className="btn btn-primary w-full mt-4">Login</button>
            <div className="text-sm text-center mt-3 text-blue-500 cursor-pointer hover:underline">
              Forgot Password?
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
