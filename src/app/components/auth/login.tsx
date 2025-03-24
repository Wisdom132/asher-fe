"use client";
import { useState } from "react";
import { useLogin } from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";

const Login = () => {
   const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter()

  const {mutate, isPending} = useLogin()

    const handleChange = (e: any) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
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
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mt-3">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mt-3 text-sm flex items-center">
            <input
              type="checkbox"
              className="checkbox mr-1 scale-75"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <div className="text-sm text-left mt-3 text-blue-500 cursor-pointer hover:underline">
              Forgot Password?
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isPending}
          >
            {isPending ? "Logging in" : "Login"}
          </button>
          <div className="text-sm text-center mt-3 text-blue-500 cursor-pointer hover:underline">
            Don't have an account? Register
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
