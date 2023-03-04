import AuthInputs from "@/components/AuthInputs/AuthInputs";
import Modal from "@/components/Common/Modal/Modal";
import {
  useGlobalAppApiContext,
  useGlobalAppContex,
} from "@/contexts/GlobalAppContext";
import React from "react";

type authmodalProps = {};

const AuthModal: React.FC<authmodalProps> = () => {
  const {
    modalState: { open, view },
  } = useGlobalAppContex();
  const { closeModal } = useGlobalAppApiContext();
  const title =
    view === "login"
      ? "Login"
      : view === "signup"
      ? "Signup"
      : "Reset Password";

  return (
    <>
      <Modal title={title} isOpen={open} onClose={closeModal}>
        {/* <OAuthButtons /> */}
        <AuthInputs />
        {/* <ResetPassword /> */}
      </Modal>
    </>
  );
};

export default AuthModal;
