"use client";

import { useSession } from "next-auth/react";

import Chat from "@/components/common/chat";

export const dynamic = "force-dynamic";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main className="h-[calc(100vh-60px)] flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <div>
          <h1 className="text-4xl font-bold">How can I help you?</h1>
          {session?.user?.name ? (
            <>
              <p className="text-1xl text-center py-1 text-gray-800">
                Welcome{" "}
                {session?.user?.name
                  ?.replace(/-/, " ")
                  .split(" ")
                  .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
                  .join(" ")}
              </p>
            </>
          ) : (
            <p className="text-1xl text-center py-1 text-gray-800">
              SignIn to start chart
            </p>
          )}
        </div>
        {session?.user?.name ? <Chat /> : null}
      </div>
    </main>
  );
}
