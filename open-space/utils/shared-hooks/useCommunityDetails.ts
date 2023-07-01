import {
  CommunityDetails,
  useGlobalAppApiContext,
  useGlobalAppContex,
} from "@/contexts/GlobalAppContext";
import { auth, firestore } from "@/firebase/clientApp";
import { doc, increment, runTransaction } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useCommunityDetails = () => {
  const [user] = useAuthState(auth);
  const { communityDetails } = useGlobalAppContex();
  const { setCommunityDetails, filterCommunityDetails, openModal } =
    useGlobalAppApiContext();
  const [error, setError] = useState(false);

  const onJoinOrLeaveCommunity = (communitData: any, isJoined: boolean) => {
    if (isJoined) {
      leaveCommunity(communitData.id);
      return;
    }
    joinCommunity(communitData);
  };

  const joinCommunity = async (communitData: CommunityDetails) => {
    if (!user) {
      openModal("signup");
    }

    try {
      const communitySnippet: CommunityDetails = {
        id: communitData.id,
        iconURL: communitData.iconURL || "",
        isModerator: false,
      };
      await runTransaction(firestore, async (transaction) => {
        transaction.set(
          doc(
            firestore,
            `users/${user?.uid}/community-details`,
            communitData.id
          ),
          communitySnippet
        );

        transaction.update(doc(firestore, "communities", communitData?.id), {
          numberOfMembers: increment(1),
        });
      });
      if (user) {
        setCommunityDetails(user);
      }
    } catch (error) {
      console.log("~ error in batch: ", error);
      setError(true);
    }
  };
  const leaveCommunity = async (communityId: string) => {
    try {
      await runTransaction(firestore, async (transaction) => {
        transaction.delete(
          doc(firestore, `users/${user?.uid}/community-details`, communityId)
        );
        transaction.update(doc(firestore, "communities", communityId), {
          numberOfMembers: increment(-1),
        });
        filterCommunityDetails(communityId);
      });
    } catch (error) {
      console.error("~ error in transaction: ", error);
      setError(true);
    }
  };

  return {
    communityDetails,
    onJoinOrLeaveCommunity,
  };
};

export default useCommunityDetails;
