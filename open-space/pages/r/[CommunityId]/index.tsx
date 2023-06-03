import Header from "@/components/Community/Header";
import PageLayout from "@/components/Layouts/PageLayout";
import { useGlobalAppContex } from "@/contexts/GlobalAppContext";
import { firestore } from "@/firebase/clientApp";
import useCommunityDetails from "@/utils/shared-hooks/useCommunityDetails";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";
import classes from "./community.module.css";
import { useRouter } from "next/router";
import Post from "@/components/Community/Post";
import { PostType } from "@/contexts/PostContext";

type CommunityProps = {
  communityData: {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: "public" | "restricted" | "private";
    createdAt?: Timestamp;
    imageURL?: string;
  };
  communityPosts: PostType[] | null;
};

const Community: React.FC<CommunityProps> = ({
  communityData,
  communityPosts,
}) => {
  const { communityDetails, onJoinOrLeaveCommunity } = useCommunityDetails();
  const router = useRouter();
  const isMember = !!communityDetails?.find(
    (item) => item.id === communityData?.id
  );

  const redirectToSubmit = () => {
    router.push(`/r/${communityData.id}/Submit`);
  };

  console.log("~@@", communityPosts);
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
          </div>
          <div className="flex-column">
            {communityPosts ? (
              <>
                {communityPosts?.map((post) => (
                  <Post
                    key={post.creatorId}
                    postDetails={post}
                    communityIcon={communityData.imageURL}
                  />
                ))}
              </>
            ) : (
              <h2>No Post yet</h2>
            )}
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
    let postsArray = null;
    if (doesExists) {
      try {
        const postsQuery = query(
          collection(firestore, "posts"),
          where("communityName", "==", communityDoc.id),
          orderBy("createdAt", "desc")
        );
        const postsDoc = await getDocs(postsQuery);
        postsArray = postsDoc.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }));
      } catch (error: any) {
        console.error("error while fetching posts: ", error.message);
      }
    }
    return {
      props: {
        communityData: doesExists
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : null,
        communityPosts: postsArray
          ? JSON.parse(safeJsonStringify(postsArray))
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
