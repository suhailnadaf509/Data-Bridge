import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const ChatComponent = () => {
  const [messages, setMessages] = useState<
    { id: string; user_id: string; message: string }[]
  >([]);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel("messages") // Create a channel for the "messages" table
      .on(
        "postgres_changes",
        {
          event: "INSERT", // Listen for INSERT events
          schema: "public", // Specify the schema (default is "public")
          table: "messages", // Specify the table
        },
        (payload: {
          new: { id: string; user_id: string; message: string };
        }) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.user_id}:</strong> {message.message}
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
