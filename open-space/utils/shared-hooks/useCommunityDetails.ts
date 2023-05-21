import {
  CommunityDetails,
  useGlobalAppContex,
} from "@/contexts/GlobalAppContext";

const useCommunityDetails = () => {
  const { communityDetails } = useGlobalAppContex();

  const onJoinOrLeaveCommunity = (
    communityDetails: CommunityDetails,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveCommunity(communityDetails.id);
      return;
    }
    joinCommunity(communityDetails);
  };

  const joinCommunity = (communityDetails: CommunityDetails) => {};
  const leaveCommunity = (communityId: string) => {};

  return {
    communityDetails,
    onJoinOrLeaveCommunity,
  };
};

export default useCommunityDetails;
