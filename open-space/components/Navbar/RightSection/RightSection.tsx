import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "./AuthModal";

type rightSectionProps = {
  user: any;
};

const RightSection: React.FC<rightSectionProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <div className="always-flex grow-flex">
        <AuthButtons user={user} />
      </div>
    </>
  );
};

export default RightSection;
