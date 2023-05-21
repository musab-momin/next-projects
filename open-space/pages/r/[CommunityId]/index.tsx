import Header from "@/components/Community/Header";
import PageLayout from "@/components/Layouts/PageLayout";
import { useGlobalAppContex } from "@/contexts/GlobalAppContext";
import { firestore } from "@/firebase/clientApp";
import useCommunityDetails from "@/utils/shared-hooks/useCommunityDetails";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityProps = {
  communityData: {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: "public" | "restricted" | "private";
    createdAt?: Timestamp;
    imageURL?: string;
  };
};

const Community: React.FC<CommunityProps> = ({ communityData }) => {
  const { id, creatorId, numberOfMembers, privacyType, createdAt, imageURL } =
    communityData;
  const { communityDetails, onJoinOrLeaveCommunity } = useCommunityDetails();

  const isMember = !!communityDetails?.find(
    (item) => item.id === communityData.id
  );

  return (
    <>
      <Header
        communityName={id}
        communityURL={`r/${id}`}
        communityIconURL={imageURL}
        isCommunityMember={isMember}
      />
      <PageLayout>
        <>
          <div>LEfT SIDE</div>
        </>
        <>
          <div>RIGHT SIDE</div>
        </>
      </PageLayout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityRef = doc(
      firestore,
      "communities",
      context.query.CommunityId as string
    );
    const communityDoc = await getDoc(communityRef);

    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    console.error("server side props error", error);
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    };
  }
}

export default Community;
