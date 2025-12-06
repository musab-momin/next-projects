import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const ChatInput = ({
  message,
  loading,
  onMessageChange,
  onSubmitMessage,
}: {
  message: string;
  loading: boolean;
  onMessageChange: (message: string) => void;
  onSubmitMessage: () => Promise<void>;
}) => {
  return (
    <div
      className="w-[90%] m-auto sm:w-[50%] rounded-md  p-5"
      style={{
        boxShadow:
          "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
      }}
    >
      <div className="flex flex-col items-end gap-5">
        <Input
          className="h-12"
          placeholder="Message DeepMind"
          value={message}
          onChange={(eve) => onMessageChange(eve.target.value)}
          onKeyUp={(eve) => (eve.code === "Enter" ? onSubmitMessage() : null)}
          disabled={loading}
        />
        <Button
          className="px-4 py-2"
          variant={"outline"}
          size="icon"
          onClick={onSubmitMessage}
          disabled={!message.length}
        >
          {" "}
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
              </svg>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
