"use client";

import { useState } from "react";

const connections = [
  { id: 1, name: "Nvidia", handle: "@wisdom132", status: "Connected" },
  { id: 2, name: "Vanguard", handle: "@tester1", status: "Pending" },
  { id: 3, name: "Titi Investment", handle: "@Johss", status: "Connected" },
  { id: 4, name: "Black rock", handle: "@Udy449", status: "Declined" },
];

export default function IntroductionRequest() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(connections);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Introduction Request</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 p-2">
        <input
          type="text"
          placeholder="Search companies by name"
          value={search}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-md mb-4"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Handle</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data
              .filter((connection) =>
                connection.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((connection) => (
                <tr key={connection.id}>
                  <td className={"font-bold text-gray-300"}>{connection.name}</td>
                  <td className={"text-sm text-gray-300"}>
                    {connection.handle}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        connection.status === "Connected"
                          ? "badge-success"
                          : connection.status === "Declined"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {connection.status}
                    </span>
                  </td>
                  <td>
                    {connection.status === "Pending" && (
                      <>
                        <button className="btn btn-outline btn-error btn-sm mr-2">
                          Reject
                        </button>
                        <button className="btn btn-outline btn-success btn-sm">
                          Approve
                        </button>
                      </>
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
