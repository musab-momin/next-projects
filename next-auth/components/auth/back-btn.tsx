import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const BackBtn = ({ href, label }: { href: string; label: string }) => {
  return (
    <div className="w-full">
      <Button
        variant={"link"}
        className="font-normal w-full"
        size={"sm"}
        asChild
      >
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};

export default BackBtn;
