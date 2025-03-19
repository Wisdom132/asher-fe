"use client";

import { useState } from "react";

const connections = [
  { id: 1, name: "Company A", type: "Company", status: "Connected" },
  { id: 2, name: "Investor X", type: "Investor", status: "Pending" },
  { id: 3, name: "Company B", type: "Company", status: "Connected" },
];

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(connections);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Connections</h1>

      <div className="overflow-x-auto">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-md mb-4"
        />
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((connection) => (
              <tr key={connection.id}>
                <td>{connection.name}</td>
                <td>{connection.type}</td>
                <td>
                  <span
                    className={`badge ${
                      connection.status === "Connected"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {connection.status}
                  </span>
                </td>
                <td>
                  {connection.status === "Pending" && (
                    <button className="btn btn-outline btn-error btn-sm">
                      Cancel Request
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
