import Image from "next/image";
import { Long_Cang, Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <h2 className={cn("text-5xl font-semibold", poppins.className)}>
        <span className="text-white drop-shadow-md">Secure</span>Auth
      </h2>
      <p>A simple authentication system</p>

      <LoginButton>
        <Button className="my-8" variant={"secondary"} size={"lg"}>
          Signin
        </Button>
      </LoginButton>
    </section>
  );
}
