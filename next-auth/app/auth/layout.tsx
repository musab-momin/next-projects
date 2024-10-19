import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-full grid place-items-center">
      {children}
    </section>
  );
};

export default AuthLayout;
