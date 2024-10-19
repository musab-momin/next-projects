import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialAuth = () => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button size={"lg"} variant={"outline"} className="w-full">
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button size={"lg"} variant={"outline"} className="w-full">
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialAuth;
