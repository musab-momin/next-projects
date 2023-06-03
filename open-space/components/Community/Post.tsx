import Image from "next/image";
import React from "react";
import classes from "./community.module.css";
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";
import { BiComment } from "react-icons/bi";
import { HiOutlineShare } from "react-icons/hi";
import { RiBookmarkLine } from "react-icons/ri";
import { PostType } from "@/contexts/PostContext";
import { formatDistanceToNow } from "date-fns";
import { enIN } from "date-fns/locale";

type PostProps = {
  postDetails: PostType;
  communityIcon?: string;
};

const Post: React.FC<PostProps> = ({ postDetails, communityIcon }) => {
  console.log("~@@ rendering posts");
  return (
    <article className={classes.post}>
      <div className={classes.postrating}>
        <div className={classes.postratingwrapper}>
          <button type="button" className="normalise-btn">
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
