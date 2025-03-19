"use client"
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function ChatComponent() {
const [selectedInvestor, setSelectedInvestor] = useState<{
  id: number;
  name: string;
} | null>(null);
    const [input, setInput] = useState("");

  const investors = [
    { id: 1, name: "Investor A" },
    { id: 2, name: "Investor B" },
    { id: 3, name: "Investor C" },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "company",
      text: "Hello, we’re interested in collaborating!",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "investor",
      text: "Great! What kind of investment are you looking for?",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "company",
      text: "We’re raising funds to expand our operations.",
      time: "10:35 AM",
    },
  ]);

      const handleSendMessage = () => {
        if (input.trim() !== "") {
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              sender: "company",
              text: input,
              time: "10:40 AM",
            },
          ]);
          setInput("");
        }
      };
    
      const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
          handleSendMessage();
        }
      };

  return (
    <div className="flex h-[90vh]">
      {/* Sidebar */}
      <div className="w-1/4 shadow-lg p-4 border rounded border-gray-800">
        <h2 className="text-lg font-bold mb-4">Connected Investors</h2>
        <ul>
          {investors.map((investor) => (
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
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-3/4 border border-gray-800 rounded shadow-lg">
        {selectedInvestor ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-b-gray-800 bg-gray-500 text-white font-bold text-lg">
              Chat with {selectedInvestor.name}
            </div>

            {/* Scrollable Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 h-0">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "Company" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.sender === "Company"
                        ? "bg-gray-200 text-black"
                        : "bg-primary text-white"
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
                onKeyPress={handleKeyPress}
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
