import Image from "next/image";
import React from "react";
import classes from "./community.module.css";
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";
import { BiComment } from "react-icons/bi";
import { HiOutlineShare } from "react-icons/hi";
import { RiBookmarkLine } from "react-icons/ri";
import { PostType, usePostContext } from "@/contexts/PostContext";
import { formatDistanceToNow } from "date-fns";
import { enIN } from "date-fns/locale";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, doc, increment, writeBatch } from "firebase/firestore";

type PostProps = {
  postDetails: PostType;
  communityIcon?: string;
  communityId: string;
};

const Post: React.FC<PostProps> = ({
  postDetails,
  communityIcon,
  communityId,
}) => {
  const { dispatch } = usePostContext();
  const [user] = useAuthState(auth);
  const existingVote = false;
  const batch = writeBatch(firestore);

  const onVote = async (vote: number) => {
    try {
      const postRef = doc(firestore, "posts", postDetails.id);
      if (!existingVote) {
        //create a new post vote document
        const postVoteRef = doc(
          collection(firestore, `users/${user?.uid}/postVotes`)
        );

        const newVote = {
          id: postVoteRef.id,
          postId: postDetails.id,
          communityId,
          voteVlaue: vote,
        };

        batch.set(postVoteRef, newVote);
        batch.update(postRef, {
          upVotes: increment(vote),
        });
        await batch.commit();
        dispatch({
          type: "UPDATE_POST",
          payload: { ...postDetails, upVotes: postDetails.upVotes + 1 },
        });
      }
    } catch (error: any) {
      console.log("~@@##error on voting", error.message);
    }
  };

  return (
    <article className={classes.post}>
      <div className={classes.postrating}>
        <div className={classes.postratingwrapper}>
          <button
            type="button"
            className="normalise-btn"
            onClick={() => onVote(1)}
          >
            <RxThickArrowUp />
          </button>
          <small>{postDetails.upVotes}</small>
          <button type="button" className="normalise-btn">
            <RxThickArrowDown />
          </button>
        </div>
      </div>
      <div className="postcontent">
        <div className={classes.postinfo}>
          <Image
            src={
              communityIcon ||
              "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"
            }
            alt="community-icon"
            width={20}
            height={20}
          />
          <h5 className={classes.postitle}>r/{postDetails.communityName}</h5>
          <small className={classes.postcreator}>
            Posted by u/{postDetails.creatorName}
          </small>
          <small className={classes.posttimestamp}>
            {formatDistanceToNow(
              new Date(postDetails.createdAt.seconds * 1000),
              {
                addSuffix: true,
                locale: enIN,
              }
            )}{" "}
          </small>
        </div>
        <h2 className={classes.postheading}>{postDetails.title}</h2>
        {postDetails.body && (
          <p className={classes.postPara}>{postDetails.body}</p>
        )}
        {postDetails.imageURL && (
          <div className={classes.postmedia}>
            <Image src={postDetails.imageURL} alt="postmedia" fill />
          </div>
        )}
        <div className={classes.postactions}>
          <div>
            <BiComment size={22} />
            <small>16 comments</small>
          </div>
          <div>
            <HiOutlineShare size={22} />
            <small>16 comments</small>
          </div>
          <div>
            <RiBookmarkLine size={22} />
            <small>16 comments</small>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
