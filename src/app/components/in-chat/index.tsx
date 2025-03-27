"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useConnections } from "@/app/hooks/useConnections";

export default function ChatComponent() {
  const { data: connections, isLoading } = useConnections();
  const [selectedConnection, setSelectedConnection] = useState<{
    id: number;
    name: string;
    connectionId: string;
  } | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userType = parsedUser?.userType;

  useEffect(() => {
    if (!parsedUser?.id || !parsedUser?.userType) return;

    const newSocket = io("https://asher-backend-cc008cd2ac25.herokuapp.com", {
      query: { userId: parsedUser.id, userType },
    });
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      console.log("mess", message);
      setMessages((prev) => [...prev, message]);

      if (message.senderId !== parsedUser.id) {
        beepSound.play();
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [parsedUser?.id, parsedUser?.userType]);

  useEffect(() => {
    if (!socket || !selectedConnection) return;

    console.log("Fetching messages for:", selectedConnection.connectionId);

    socket.emit("fetchMessages", {
      connectionId: selectedConnection.connectionId,
    });

    socket.on("messagesHistory", (chatHistory) => {
      console.log("Chat history received:", chatHistory);

      setMessages(chatHistory);
    });

    return () => {
      socket.off("messagesHistory");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, selectedConnection]);

  const beepSound = new Audio("/beep.mp3");

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedConnection || !socket) return;

    console.log("selectedConnection", selectedConnection);
    const message = {
      connectionId: selectedConnection.connectionId, // Ensure correct connectionId
      senderId: parsedUser.id,
      recipientId: selectedConnection.id,
      message: input,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", message);
    // setMessages((prev) => [
    //   ...prev,
    //   { ...message, time: new Date().toLocaleTimeString() },
    // ]);
    setInput("");
  };

  if (isLoading) return <p>Loading connections...</p>;

  return (
    <div className="flex h-[90vh]">
      <div className="w-1/4 shadow-lg p-4 border rounded border-gray-800">
        <h2 className="text-lg font-bold mb-4">Connected Investors</h2>
        <ul>
          {connections.map((connection: any) => {
            const participant =
              userType === "Company" ? connection.investor : connection.company;
            return (
              <li
                key={connection.connectionId} // Ensure unique key for each connection
                className={`p-3 rounded-lg cursor-pointer ${selectedConnection?.connectionId === connection.connectionId
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-900"
                  }`}
                onClick={() =>
                  setSelectedConnection({
                    id: participant.id,
                    name: participant.name,
                    connectionId: connection.id, // Set connectionId
                  })
                }
              >
                {participant.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col w-3/4 border border-gray-800 rounded shadow-lg">
        {selectedConnection ? (
          <>
            <div className="p-4 border-b border-b-gray-800 bg-gray-500 text-white font-bold text-lg flex justify-between">
              <span>Chat with {selectedConnection.name}</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 h-0">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.senderId === parsedUser.id
                      ? "justify-end"
                      : "justify-start"
                    }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${msg.senderId === parsedUser.id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-black"
                      }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <span className="block text-xs mt-1 text-gray-500">
                      <span className="block text-xs mt-1 text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}{" "}
                        {/* Format timestamp */}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-t-gray-800 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
