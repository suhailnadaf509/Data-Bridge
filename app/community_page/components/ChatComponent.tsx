import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

interface Message {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
}

const ChatComponent = () => {
  // Initialize state with hardcoded messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user_id: "user1",
      message: "Hello, world!",
      created_at: "2023-10-01T12:00:00Z",
    },
    {
      id: "2",
      user_id: "user2",
      message: "Hi there!",
      created_at: "2023-10-01T12:05:00Z",
    },
    {
      id: "3",
      user_id: "user1",
      message: "How are you?",
      created_at: "2023-10-01T12:10:00Z",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
/**
 * This file contains code for [briefly describe the purpose of the file].
 * 
 * Note: Some variables are prefixed with an underscore (`_`) to suppress ESLint warnings
 * about unused variables. These variables are intentionally left unused for future
 * implementation or debugging purposes.
 * 
 * Linting warnings suppressed:
 * - @typescript-eslint/no-unused-vars
 */
    const { data, error } = await supabase
      .from("messages")
      .insert([{ user_id: "current_user", message: newMessage }])
      .select();

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Fetch initial messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        console.log("Fetched messages:", data);
        // Combine hardcoded messages with fetched messages
        setMessages((prev) => [...prev, ...data]);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload: { new: Message }) => {
          console.log("New message received:", payload.new);
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        border: "2px solid red",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <p>Chat Room</p>
      {messages.map((message) => (
        <div key={message.id} style={{ marginBottom: "8px" }}>
          <strong>{message.user_id}:</strong> {message.message}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ color: "black", marginRight: "8px" }}
        />
        <button onClick={sendMessage} style={{ color: "black" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
