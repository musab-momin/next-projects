import React, { useState, useCallback } from "react";

import ChatInput from "@/components/common/chat-input";
import ChatPane from "@/components/common/chat-pane";
import { getCompletion } from "@/server-actions/get-completion";

type Message = {
  role: "user" | "system";
  content: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitMessage = async () => {
    setLoading(true);
    const responseText = await getCompletion(message);
    console.log("@@ REPONSE: >>> ", responseText);
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
      },
      {
        ...responseText,
      },
    ]);
    setMessage("");
    setLoading(false);
  };

  const onMessageChange = useCallback(
    (message: string) => setMessage(message),
    []
  );

  return (
    <div className="w-full h-full overflow-auto flex justify-center py-1 ">
      <div className="w-full  flex flex-col justify-center items-center">
        {messages?.length ? <ChatPane messages={messages} /> : null}
        <ChatInput
          message={message}
          loading={loading}
          onMessageChange={onMessageChange}
          onSubmitMessage={onSubmitMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
