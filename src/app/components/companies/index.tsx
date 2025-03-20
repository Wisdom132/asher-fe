"use client";

import { useCompanies } from "@/app/hooks/useCompanies";
import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { useConnectCompany } from "@/app/hooks/useConnectCompany";


interface Company {
  id: string;
  fundOrCompany: string;
  name: string;
  isConnected: boolean;
  isPending: boolean
}

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const { data: companies, isLoading, error } = useCompanies();
  const { mutate: connectCompany, isPending: connecting } = useConnectCompany();


const filteredCompanies = useMemo(() => {
  return companies?.filter((company: Company) =>
    company.fundOrCompany.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
}, [companies, debouncedSearch]);


  if (isLoading) return <p>Loading companies...</p>;
  if (error) return <p className="text-red-500">Failed to load companies.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find Companies</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company: Company) => (
          <div key={company.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{company.fundOrCompany}</h2>
              <p className="text-gray-500">{company.name}</p>
              <div className="flex gap-2">
                {company.isConnected ? (
                  <>
                    <button className="btn btn-success">
                      Connected
                    </button>
                    <button className="btn btn-outline btn-primary">
                      View Details
                    </button>
                  </>
                ) : company.isPending ? (
                  <button className="btn btn-warning w-full">
                    Pending Approval
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => connectCompany(company.id)}
                    disabled={connecting}
                  >
                    Connect
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
