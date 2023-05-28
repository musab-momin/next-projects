import Header from "@/components/Community/Header";
import PageLayout from "@/components/Layouts/PageLayout";
import { useGlobalAppContex } from "@/contexts/GlobalAppContext";
import { firestore } from "@/firebase/clientApp";
import useCommunityDetails from "@/utils/shared-hooks/useCommunityDetails";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";
import classes from "./community.module.css";
import { useRouter } from "next/router";

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
  const { communityDetails, onJoinOrLeaveCommunity } = useCommunityDetails();
  const router = useRouter();
  const isMember = !!communityDetails?.find(
    (item) => item.id === communityData?.id
  );

  const redirectToSubmit = () => {
    router.push(`/r/${communityData.id}/Submit`);
  };

  if (!communityData) {
    return <>Page does not exists</>;
  }

  return (
    <>
      <Header
        communityName={communityData?.id}
        communityURL={`r/${communityData?.id}`}
        communityIconURL={communityData?.imageURL}
        isCommunityMember={isMember}
        communityAction={onJoinOrLeaveCommunity}
      />
      <PageLayout>
        <>
          <div className={classes.searchbar}>
            <input
              type="text"
              placeholder="Create Post"
              className={classes.searchbar__input}
              onClick={redirectToSubmit}
            />
            <div></div>
            <div></div>
          </div>
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
    const doesExists = communityDoc.exists();
    return {
      props: {
        communityData: doesExists
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : null,
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
