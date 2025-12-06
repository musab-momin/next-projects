import Link from "next/link";
import { signIn, signOut } from "@/auth";
import UserAuthButton from "@/components/common/user-auth-button";

const Header = () => {
  return (
    <header className="h-14 px-9 flex items-center justify-between">
      <div className="flex item-center gap-8">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
      </div>
      <div>
        <UserAuthButton
          onSignIn={async () => {
            "use server";
            await signIn();
          }}
          onSignOut={async () => {
            "use server";
            console.log("@@ SIGNOUT CALLED: >>>>");
            await signOut();
          }}
        />
      </div>
    </header>
  );
};

export default Header;
