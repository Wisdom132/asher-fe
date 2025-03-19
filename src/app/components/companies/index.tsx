"use client";

import { useState } from "react";

interface Company {
  id: string;
  companyName: string;
  name: string;
  connected: boolean
}

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      companyName: "Tech Corp",
      name: "Wisdom Ekpot",
      connected: true,
    },
    {
      id: "2",
      companyName: "Green Energy Ltd",
      name: "John Doe",
      connected: false,
    },
    { id: "3", companyName: "Nvidia", name: "Stephen Ekpot", connected: false },
    { id: "4", companyName: "Tesla Ltd", name: "Elon Doe", connected: false },
    { id: "4", companyName: "Heykara", name: "Tan Job", connected: true },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies
          .filter((company) =>
            company.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((company) => (
            <div key={company.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">{company.companyName}</h2>
                <p className="text-gray-500">{company.name}</p>
                <div className={`flex ${company.connected ? "gap-2" : ""}`}>
                  <button
                    className={`btn btn-primary mt-2 ${
                      company.connected ? "w-auto" : "w-full"
                    }`}
                    onClick={() => sendConnectionRequest(company.id)}
                    disabled={company.connected}
                  >
                    {company.connected ? "Connected" : "Connect"}
                  </button>

                  {company.connected && (
                    <button className="btn btn-primary mt-2 w-auto">
                      View details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
