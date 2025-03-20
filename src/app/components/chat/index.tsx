"use client";

import { useConnections } from "@/app/hooks/useConnections";
import { useChatRequests } from "@/app/hooks/useChatRequests";
import { useSendChatRequest } from "@/app/hooks/useSendChatRequest";
import { useRespondChatRequest } from "@/app/hooks/useRespondChatReuest";
import { useState } from "react";

export default function ChatRequestsPage() {
  const { data: connections, isLoading: loadingConnections } = useConnections();
  const { data: requests, isLoading: loadingRequests } = useChatRequests();

  const { mutate: respondRequest } = useRespondChatRequest();
  const { mutate: sendChatRequest, isPending: sending } = useSendChatRequest();

  if (loadingConnections || loadingRequests) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Connections/Requests</h1>
      <div>
        <h2 className="text-xl font-semibold">Connections</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Investor</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {connections?.map((connection: any) => (
              <tr key={connection.id}>
                <td>{connection.investor.name}</td>
                <td>{connection.company.name}</td>
               
                <td>
                  <button
                    className="btn btn-primary mt-3 w-full"
                    onClick={() => {
                      sendChatRequest(connection.id);
                    }}
                  >
                    Send Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Section for Companies to Approve/Reject Requests */}
      <div>
        <h2 className="text-xl font-semibold">Chat Requests status</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Investor</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request: any) => (
              <tr key={request.id}>
                <td>{request.investor.name}</td>
                <td>{request.company.name}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "PENDING"
                        ? "badge-warning"
                        : request.status === "ACCEPTED"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
