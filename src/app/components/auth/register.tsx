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
    <div className="max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Telegram Handle</span>
          </label>
          <input
            type="text"
            name="telegramHandle"
            value={formData.telegramHandle}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Type</span>
          </label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="Investor">Investor</option>
            <option value="Company">Company</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Fund or Company Name</span>
          </label>
          <input
            type="text"
            name="fundOrCompany"
            value={formData.fundOrCompany}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
