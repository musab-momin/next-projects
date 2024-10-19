"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSeparator from "@/components/ui/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[486px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="Enter email address"
            required
          />
          <Input
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="Enter password"
            min={8}
            max={256}
            required
          />
          <Button size={"lg"} className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button variant={"secondary"} size={"lg"} className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Login with google
        </Button>
        <Button variant={"secondary"} size={"lg"} className="w-full">
          <FaGithub className="mr-2 size-5" />
          Login with github
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
