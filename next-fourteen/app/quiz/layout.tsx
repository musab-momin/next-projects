import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        margin: "2rem auto",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Link href={"/"}>back</Link>
      {children}
    </div>
  );
};

export default layout;
