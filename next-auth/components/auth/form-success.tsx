import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) {
    return <></>;
  }

  return (
    <div
      className="bg-emerald-500/15 p-3 rounded-md flex 
      items-center ga-x-2 text-sm text-emerald"
    >
      <CheckCircledIcon className="w-4 h-4" />
      <p className="px-1">{message}</p>
    </div>
  );
};

export default FormSuccess;
