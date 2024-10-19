import React from "react";

const Header = ({ title, label }: { title: string; label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-2 justify-center">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
