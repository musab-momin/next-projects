import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
};

export default useUserAuth;
