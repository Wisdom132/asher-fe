'use client'
import { useState } from "react";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegramHandle: "",
    userType: "Investor",
    fundOrCompany: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 text-start">
        <h2 className="text-2xl font-bold mb-4 text-start">Create account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Telegram Handle</span>
            </label>
            <input
              type="text"
              name="telegramHandle"
              value={formData.telegramHandle}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <p className="mt-1 text-xs text-green-500">
              Handle is validated ✅
            </p>
          </div>

          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">User Type</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Investor"
                  checked={formData.userType === "Investor"}
                  onChange={handleChange}
                  className="radio scale-75"
                />
                <span>Investor</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Company"
                  checked={formData.userType === "Company"}
                  onChange={handleChange}
                  className="radio scale-75"
                />
                <span>Company</span>
              </label>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text mb-1">
                {formData.userType === "Company"
                  ? "Company name"
                  : "Investor name"}
              </span>
            </label>
            <input
              type="text"
              name="fundOrCompany"
              value={formData.fundOrCompany}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
