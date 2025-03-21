"use client";
import { useState, useMemo, useEffect } from "react";
import { useConnectionRequests } from "@/app/hooks/useConnectionRequests";
import { useDebounce } from "use-debounce";
import { useRespondConnectionRequest } from "@/app/hooks/useRespondConnectionRequest";

interface ConnectionRequest {
  id: string;
  investor: any;
  company: any;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
}
interface User {
  userType: string;
  telegramHandle: string;
}

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [user, setUser] = useState<User | null>(null);
    
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
  
  
  const { mutate: respondToRequest, isPending } = useRespondConnectionRequest();

  const {
    data: connectionRequests,
    isLoading,
    error,
  } = useConnectionRequests();

 const filteredRequests = useMemo(() => {
   return connectionRequests?.filter((request: ConnectionRequest) =>
     request.investor.fundOrCompany
       .toLowerCase()
       .includes(debouncedSearch.toLowerCase())
   );
 }, [connectionRequests, debouncedSearch]);

  
  if (isLoading) return <p>Loading connection requests...</p>;
  if (error) return <p className="text-red-500">Failed to load connection requests.</p>;
    if (!user) return <p>User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Connections</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 p-2">
        <input
          type="text"
          placeholder="Search companies by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md mb-4"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Handle</th>
              <th>Status</th>
              {user.userType === "Company" && <th>Action</th>}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredRequests.map((connection: ConnectionRequest) => (
              <tr key={connection.id}>
                <td className={"font-bold text-gray-300"}>
                  {user.userType === "Company"
                    ? connection.investor.fundOrCompany
                    : connection.company.fundOrCompany}
                </td>
                <td className={"text-sm text-gray-300"}>
                  {user.userType === "Company"
                    ? connection.investor.name
                    : connection.company.name}
                </td>
                <td>
                  <span
                    className={`badge ${
                      connection.status === "ACCEPTED"
                        ? "badge-success"
                        : connection.status === "DECLINED"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {connection.status}
                  </span>
                </td>
                {user.userType === "Company" && (
                  <td>
                    {connection.status === "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            respondToRequest({
                              requestId: connection.id,
                              accept: false,
                            })
                          }
                          className="btn btn-outline btn-error btn-sm mr-2"
                          disabled={isPending}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            respondToRequest({
                              requestId: connection.id,
                              accept: true,
                            })
                          }
                          className="btn btn-outline btn-success btn-sm"
                          disabled={isPending}
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
