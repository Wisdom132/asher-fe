"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useConnections } from "@/app/hooks/useConnections";

export default function ChatComponent() {
  const { data: connections, isLoading } = useConnections();

  const [selectedInvestor, setSelectedInvestor] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<
    { sender: string; text: string; time: string }[]
  >([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userType = parsedUser?.userType;

  useEffect(() => {
    if (!parsedUser?.id || !parsedUser?.userType) return;

    const newSocket = io("http://localhost:3000", {
      query: { userId: parsedUser.id, userType },
    });

    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [parsedUser?.id, parsedUser?.userType]);

  useEffect(() => {
    if (!socket) return;

    const handleNewRequest = (request: any) => {
      console.log("New introduction request received:", request);
      alert(`New introduction request from ${request.companyId}`);
    };

    const handleRequestUpdate = (updatedRequest: any) => {
      console.log("Introduction request updated:", updatedRequest);
      alert(
        `Introduction request ${
          updatedRequest.status === "accepted" ? "accepted" : "declined"
        }`
      );
    };

    socket.on("newIntroductionRequest", handleNewRequest);
    socket.on("introductionRequestUpdated", handleRequestUpdate);

    return () => {
      socket.off("newIntroductionRequest", handleNewRequest);
      socket.off("introductionRequestUpdated", handleRequestUpdate);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!input.trim() || !selectedInvestor || !socket) return;

    const message = {
      sender: parsedUser.id,
      recipientId: selectedInvestor.id,
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  const handleSendIntroductionRequest = () => {
    if (!selectedInvestor || !socket) return;

      console.log("Sending introduction request:", {
        companyId: parsedUser.id,
        investorId: selectedInvestor.id,
      });



    socket.emit("sendIntroductionRequest", {
      companyId: parsedUser.id, // Use actual company ID
      investorId: selectedInvestor.id,
    });

    alert(`Introduction request sent to ${selectedInvestor.name}`);
  };

  if (isLoading) return <p>Loading connections...</p>;

  return (
    <div className="flex h-[90vh]">
      {/* Sidebar */}
      <div className="w-1/4 shadow-lg p-4 border rounded border-gray-800">
        <h2 className="text-lg font-bold mb-4">Connected Investors</h2>
        <ul>
          {connections.map((connection: any) => {
            const investor =
              userType === "Company" ? connection.investor : connection.company;

            return (
              <li
                key={investor.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedInvestor?.id === investor.id
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-900"
                }`}
                onClick={() => setSelectedInvestor(investor)}
              >
                {investor.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-3/4 border border-gray-800 rounded shadow-lg">
        {selectedInvestor ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-b-gray-800 bg-gray-500 text-white font-bold text-lg flex justify-between">
              <span>Chat with {selectedInvestor.name}</span>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={handleSendIntroductionRequest}
              >
                Request Introduction
              </button>
            </div>

            {/* Scrollable Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 h-0">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === parsedUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.sender === parsedUser.id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="block text-xs mt-1 text-gray-500">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed Input Field */}
            <div className="p-4 border-t border-t-gray-800 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none"
              />
              <button
                className="btn btn-primary ml-2"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500 text-lg">
            Select an investor to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

