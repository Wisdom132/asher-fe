"use client";

import { useConnections } from "@/app/hooks/useConnections";
import { useChatRequests } from "@/app/hooks/useChatRequests";
import { useSendChatRequest } from "@/app/hooks/useSendChatRequest";

export default function ChatRequestsPage() {
  const { data: connections, isLoading: loadingConnections } = useConnections();
  const { data: requests, isLoading: loadingRequests } = useChatRequests();

  const { mutate: sendChatRequest, isPending: sending } = useSendChatRequest();

  if (loadingConnections || loadingRequests) return <p>Loading...</p>;

   const acceptedRequests = new Set(
     requests
       ?.filter((request: any) => request.status === "ACCEPTED")
       .map((request: any) => `${request.investorId}-${request.companyId}`)
   );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Connections/Requests</h1>
      <div>
        <h2 className="text-xl font-semibold">Connections</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {connections?.map((connection: any) => {
              const isRequestAccepted = acceptedRequests.has(
                `${connection.investorId}-${connection.companyId}`
              );
              return (
                <tr key={connection.id}>
                  <td>{connection.company.name}</td>
                  <td>{connection.company.fundOrCompany}</td>
                  <td>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => sendChatRequest(connection.company.id)}
                      disabled={isRequestAccepted || sending}
                    >
                      {isRequestAccepted ? "Request Accepted" : "Send Request"}
                    </button>
                  </td>
                </tr>
              );
            }
          )}
          </tbody>
        </table>
      </div>

      {/* Section for Companies to Approve/Reject Requests */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Chat Requests status</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Name</th>
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
