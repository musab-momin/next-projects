import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

const FormError = ({ message }: { message?: string }) => {
  if (!message) {
    return <></>;
  }

  return (
    <div
      className="bg-destructive/15 p-3 rounded-md flex 
      items-center ga-x-2 text-sm text-destructive"
    >
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p className="px-1">{message}</p>
    </div>
  );
};

export default FormError;
