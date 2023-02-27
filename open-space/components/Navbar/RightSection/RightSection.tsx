import React from "react";
import AuthButtons from "./AuthButtons";

type rightSectionProps = {
  // user: any;
};

const RightSection: React.FC<rightSectionProps> = () => {
  return (
    <>
      {/* <AuthModal /> */}
      <div className="flex">
        <AuthButtons />
      </div>
    </>
  );
};

export default RightSection;