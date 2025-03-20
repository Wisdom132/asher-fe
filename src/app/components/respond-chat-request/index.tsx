"use client";

import { useChatRequests } from "@/app/hooks/useChatRequests";
import { useRespondChatRequest } from "@/app/hooks/useRespondChatReuest";

export default function ChatRequestsPage() {
  const { data: requests, isLoading: loadingRequests } = useChatRequests();

  const { mutate: respondRequest } = useRespondChatRequest();


  return (
    <div className="p-6">
      <div>
        <h2 className="text-xl font-semibold">Chat Requests</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Investor</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>
                  {request.status === "PENDING" && (
                    <>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() =>
                          respondRequest({
                            requestId: request.id,
                            accept: true,
                          })
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() =>
                          respondRequest({
                            requestId: request.id,
                            accept: false,
                          })
                        }
                      >
                        Decline
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
