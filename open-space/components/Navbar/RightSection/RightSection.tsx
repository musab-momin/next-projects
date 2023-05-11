import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "./AuthModal";

type rightSectionProps = {
  // user: any;
};

const RightSection: React.FC<rightSectionProps> = () => {
  return (
    <>
      <AuthModal />
      <div className="always-flex grow-flex">
        <AuthButtons />
      </div>
    </>
  );
};

export default RightSection;
