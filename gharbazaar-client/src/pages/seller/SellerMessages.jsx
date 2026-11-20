import React, { useState } from "react";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip,
  Smile,
  Image as ImageIcon,
  CheckCheck,
  Clock
} from "lucide-react";

export default function SellerMessages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const conversations = [
    {
      id: 1,
      tenantName: "Rahul Sharma",
      tenantAvatar: "R",
      propertyName: "3BHK Luxury Apartment",
      lastMessage: "When can I schedule a visit?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: "tenant", text: "Hi, I'm interested in your property", time: "10:30 AM", status: "read" },
        { id: 2, sender: "seller", text: "Hello! Thank you for your interest. Would you like to schedule a visit?", time: "10:32 AM", status: "read" },
        { id: 3, sender: "tenant", text: "Yes, that would be great. What are your available time slots?", time: "10:35 AM", status: "read" },
        { id: 4, sender: "seller", text: "I'm available this weekend. Saturday or Sunday works for me.", time: "10:36 AM", status: "read" },
        { id: 5, sender: "tenant", text: "When can I schedule a visit?", time: "10:40 AM", status: "delivered" },
      ],
    },
    {
      id: 2,
      tenantName: "Priya Patel",
      tenantAvatar: "P",
      propertyName: "2BHK Sea View Flat",
      lastMessage: "What about the parking facility?",
      timestamp: "15 min ago",
      unread: 0,
      online: true,
      messages: [
        { id: 1, sender: "tenant", text: "Hello, is this property still available?", time: "9:00 AM", status: "read" },
        { id: 2, sender: "seller", text: "Yes, it's available. What would you like to know?", time: "9:05 AM", status: "read" },
        { id: 3, sender: "tenant", text: "What about the parking facility?", time: "9:10 AM", status: "read" },
      ],
    },
    {
      id: 3,
      tenantName: "Amit Kumar",
      tenantAvatar: "A",
      propertyName: "Office Space BKC",
      lastMessage: "Can we negotiate the rent?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: "tenant", text: "Interested in the office space", time: "Yesterday", status: "read" },
        { id: 2, sender: "seller", text: "Great! When would you like to visit?", time: "Yesterday", status: "read" },
        { id: 3, sender: "tenant", text: "Can we negotiate the rent?", time: "Today, 8:00 AM", status: "read" },
      ],
    },
    {
      id: 4,
      tenantName: "Sneha Desai",
      tenantAvatar: "S",
      propertyName: "Studio Apartment",
      lastMessage: "Thank you for your help!",
      timestamp: "3 hours ago",
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: "tenant", text: "Hi, looking for a studio apartment", time: "2 days ago", status: "read" },
        { id: 2, sender: "seller", text: "I have a great studio in Powai. Interested?", time: "2 days ago", status: "read" },
        { id: 3, sender: "tenant", text: "Thank you for your help!", time: "Today, 6:00 AM", status: "read" },
      ],
    },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // API call to send message
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const currentChat = conversations.find(c => c.id === selectedChat);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with potential tenants and manage inquiries</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: "calc(100vh - 280px)" }}>
        <div className="grid grid-cols-12 h-full">
          {/* Conversations List */}
          <div className="col-span-12 md:col-span-4 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full p-4 border-b border-gray-100 text-left transition-all hover:bg-gray-50 ${
                    selectedChat === conv.id ? "bg-green-50 border-l-4 border-l-green-600" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                        {conv.tenantAvatar}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{conv.tenantName}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1 truncate">{conv.propertyName}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 truncate flex-1">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="ml-2 flex-shrink-0 w-5 h-5 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        {currentChat.tenantAvatar}
                      </div>
                      {currentChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{currentChat.tenantName}</h3>
                      <p className="text-xs text-gray-500">{currentChat.propertyName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-all">
                      <Phone size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-all">
                      <Video size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-all">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: "#f8f9fa" }}>
                  {currentChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === "seller" ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            msg.sender === "seller"
                              ? "bg-green-600 text-white rounded-br-none"
                              : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.sender === "seller" ? "justify-end" : "justify-start"
                        }`}>
                          <span className="text-gray-500">{msg.time}</span>
                          {msg.sender === "seller" && (
                            <span className={msg.status === "read" ? "text-blue-500" : "text-gray-400"}>
                              <CheckCheck size={14} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <Paperclip size={20} className="text-gray-500" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <ImageIcon size={20} className="text-gray-500" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-all">
                        <Smile size={20} className="text-gray-400" />
                      </button>
                    </div>

                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a chat from the list to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Total Conversations</p>
              <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Search size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Unread Messages</p>
              <p className="text-2xl font-bold text-orange-600">
                {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Avg Response Time</p>
              <p className="text-2xl font-bold text-green-600">15 min</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCheck size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
