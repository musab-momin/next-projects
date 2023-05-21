import React from "react";
import classes from "./community.module.css";
import Image from "next/image";

type HeaderProps = {
  communityName: string;
  communityURL: string;
  communityIconURL?: string;
  isCommunityMember: boolean;
};

const Header = ({
  communityName,
  communityURL,
  communityIconURL,
  isCommunityMember,
}: HeaderProps) => {
  return (
    <section className={classes.root}>
      <div className="container">
        <div className={classes.container}>
          <div className={classes.imageWrapper}>
            <Image
              src={
                "https://b.thumbs.redditmedia.com/r-usRhC4xEa6Xh7scPFjQ-66CwcIfX7ga9psa3Vipkk.png"
              }
              alt="#"
              fill
            />
          </div>
          <div className={classes.content}>
            <h2 className="mb-0">{communityName}</h2>
            <span>{communityURL}</span>
          </div>
          <button type="button" className="normalise-btn primary-outline-btn">
            {isCommunityMember ? "Joined" : "Join"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
