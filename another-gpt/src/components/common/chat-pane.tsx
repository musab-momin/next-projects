// ChatPane.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import cn from "classnames";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "system";
  content: string;
};

// Minimal avatar fallback
const InitialsAvatar = ({ name }: { name: string }) => (
  <Avatar className="h-8 w-8 flex items-center justify-center bg-muted text-muted-foreground">
    <span className="text-xs font-medium">{name?.[0]?.toUpperCase()}</span>
  </Avatar>
);

export default function ChatPane({ messages = [] }: { messages: Message[] }) {
  return (
    <div
      className="w-full h-full overflow-auto max-w-3xl mx-auto p-4"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="space-y-4">
        {messages.map((m, i) => {
          const isUser = m.role === "user";

          return (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3",
                isUser ? "justify-end" : "justify-start"
              )}
            >
              {/* System avatar on left */}
              {!isUser && (
                <div className="shrink-0">
                  <InitialsAvatar name="System" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={cn(
                  "max-w-[80%] md:max-w-[70%] wrap-break-word",
                  isUser ? "text-right" : "text-left"
                )}
              >
                <Card
                  className={cn(
                    "shadow-sm rounded-xl p-0",
                    isUser
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-card text-foreground"
                  )}
                >
                  <CardContent className="py-3 px-4">
                    <div
                      className={cn(
                        "prose prose-sm max-w-none wrap-break-word",
                        isUser ? "prose-invert" : ""
                      )}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>

                {/* Role Label */}
                <div
                  className={cn(
                    "mt-1 text-xs text-muted-foreground",
                    isUser ? "text-right" : "text-left"
                  )}
                >
                  <span className="px-2 py-0.5 rounded text-[11px]">
                    {isUser ? "You" : "System"}
                  </span>
                </div>
              </div>

              {/* User avatar on right */}
              {isUser && (
                <div className="shrink-0">
                  <InitialsAvatar name="You" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
