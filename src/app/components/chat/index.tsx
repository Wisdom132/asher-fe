"use client";

import { useState } from "react";

type ChatRequest = {
  id: string;
  investorName: string;
  companyName: string;
  status: "Pending" | "Accepted" | "Declined";
  userType: "Investor" | "Company";
};

const chatRequests: ChatRequest[] = [
  {
    id: "1",
    investorName: "John Doe",
    companyName: "Tech Corp",
    status: "Pending",
    userType: "Investor",
  },
  {
    id: "2",
    investorName: "Jane Smith",
    companyName: "Fintech Inc.",
    status: "Accepted",
    userType: "Company",
  },
];

export default function ChatRequestsPage() {
  const [requests, setRequests] = useState(chatRequests);

  const handleAction = (
    id: string,
    action: "accept" | "decline" | "cancel"
  ) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: action === "accept" ? "Accepted" : "Declined" }
          : req
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Chat Requests</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 p-2">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Investor</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.investorName}</td>
                <td>{request.companyName}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "Accepted"
                        ? "badge-success"
                        : request.status === "Declined"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.status === "Pending" &&
                    request.userType === "Company" && (
                      <>
                        <button
                          className="btn btn-success btn-sm mr-2"
                          onClick={() => handleAction(request.id, "accept")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleAction(request.id, "decline")}
                        >
                          Decline
                        </button>
                      </>
                    )}

                  {request.status === "Pending" &&
                    request.userType === "Investor" && (
                      <button
                        className="btn btn-outline btn-warning btn-sm"
                        onClick={() => handleAction(request.id, "cancel")}
                      >
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
