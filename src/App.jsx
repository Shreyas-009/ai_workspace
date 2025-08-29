import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MessageCard from "./components/MessageCard";
import MessageInput from "./components/MessageInput";
import MemoryPanel from "./components/MemoryPanel";
import workspaceData from "./data/alpie_frontend_dataset.json";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [memoryItems, setMemoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setMessages(workspaceData);

    const savedMemory = localStorage.getItem("workspace-memory");
    if (savedMemory) {
      setMemoryItems(JSON.parse(savedMemory));
    } else {
      const pinnedItems = workspaceData.filter((msg) => msg.pinned);
      setMemoryItems(pinnedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("workspace-memory", JSON.stringify(memoryItems));
  }, [memoryItems]);

  const filteredMessages = messages.filter((message) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      message.description.toLowerCase().includes(searchLower) ||
      (message.title && message.title.toLowerCase().includes(searchLower)) ||
      (message.tags &&
        message.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
      message.author.toLowerCase().includes(searchLower)
    );
  });

  const togglePin = (message) => {
    const isInMemory = memoryItems.some((item) => item.id === message.id);

    if (isInMemory) {
      setMemoryItems((prev) => prev.filter((item) => item.id !== message.id));
    } else {
      setMemoryItems((prev) => [
        ...prev,
        { ...message, pinnedAt: new Date().toISOString() },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `chat-${Date.now()}`,
      description: newMessage,
      author: "you@169pi.com",
      created_at: new Date().toISOString(),
      type: "chat",
      pinned: false,
    };

    setMessages((prev) => [message, ...prev]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col min-h-0">
        <Header memoryCount={memoryItems.length} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((message) => {
            const isInMemory = memoryItems.some(
              (item) => item.id === message.id
            );

            return (
              <MessageCard
                key={message.id}
                message={message}
                isInMemory={isInMemory}
                onTogglePin={togglePin}
              />
            );
          })}
        </div>

        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      </div>

      <MemoryPanel memoryItems={memoryItems} onTogglePin={togglePin} />
    </div>
  );
};

export default App;
