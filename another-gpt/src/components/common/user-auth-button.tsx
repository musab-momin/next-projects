"use client";
import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession } from "next-auth/react";

const UserAuthButton = ({
  onSignIn,
  onSignOut,
}: {
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}) => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session?.user?.image!} />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onSignOut}>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={onSignIn}>Sign in</Button>
      )}
    </div>
  );
};

export default UserAuthButton;
