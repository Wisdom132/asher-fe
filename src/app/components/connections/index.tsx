"use client";

import { useState } from "react";

interface Company {
  id: string;
  name: string;
  industry: string;
}

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([
    { id: "1", name: "TechCorp", industry: "Software" },
    { id: "2", name: "Green Energy Ltd", industry: "Renewable Energy" },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const sendConnectionRequest = (companyId: string) => {
    console.log(`Sending connection request to company ID: ${companyId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find Companies</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={handleSearch}
        className="input input-bordered w-full max-w-md mb-4"
      />

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies
          .filter((company) =>
            company.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((company) => (
            <div key={company.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">{company.name}</h2>
                <p className="text-gray-500">{company.industry}</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => sendConnectionRequest(company.id)}
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
