import { auth, firestore } from "@/firebase/clientApp";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

export interface CommunityDetails {
  id: string;
  isModerator: boolean;
  iconURL?: string;
}
export interface initialProps {
  modalState: {
    open: boolean;
    view: "login" | "signup" | "resetPassword" | "general";
  };
  toasterState: {
    isActive: boolean;
    mssg: string;
    type: string;
  };
  communityDetails: CommunityDetails[] | null;
}

type globalAppContextProps = {
  children: JSX.Element;
};

export interface initialApiProps {
  openModal: (
    viewShouldBe: "login" | "signup" | "resetPassword" | "general"
  ) => void;
  closeModal: () => void;

  successToaster: (message: string) => void;
  errorToaster: (message: string) => void;
  closeToaster: () => void;
}

const initial: initialProps = {
  modalState: {
    open: false,
    view: "login",
  },
  toasterState: {
    isActive: false,
    mssg: "",
    type: "",
  },
  communityDetails: null,
};

const initialApi: initialApiProps = {
  openModal: () => {},
  closeModal: () => {},
  successToaster: () => {},
  errorToaster: () => {},
  closeToaster: () => {},
};

const GlobalAppContext = createContext(initial);
const GlobalAppApiContext = createContext(initialApi);
export const GlobalContextProvider: React.FC<globalAppContextProps> = ({
  children,
}) => {
  const [user] = useAuthState(auth);
  const [globalState, setGlobalState] = useState(initial);

  const handleOpenModal = useCallback(
    (viewShouldBe: "login" | "signup" | "resetPassword" | "general") => {
      setGlobalState((perv) => ({
        ...perv,
        modalState: { open: true, view: viewShouldBe },
      }));
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setGlobalState((perv) => ({
      ...perv,
      modalState: { ...perv.modalState, open: false },
    }));
  }, []);

  const handleSuccessToaster = useCallback((message: string) => {
    setGlobalState((prev) => ({
      ...prev,
      toasterState: { isActive: true, mssg: message, type: "success" },
    }));
  }, []);

  const handleErrorToaster = useCallback((message: string) => {
    setGlobalState((prev) => ({
      ...prev,
      toasterState: { isActive: true, mssg: message, type: "error" },
    }));
  }, []);

  const handleCloseToaster = useCallback(() => {
    setGlobalState((prev) => ({
      ...prev,
      toasterState: { isActive: false, mssg: "", type: "" },
    }));
  }, []);

  const setCommunityDetails = useCallback(async (user: User) => {
    try {
      const communityDetailsDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/community-details`)
      );
      const details: CommunityDetails[] = communityDetailsDocs.docs.map(
        (doc) => ({
          ...doc.data(),
        })
      ) as CommunityDetails[];
      setGlobalState((val) => ({ ...val, communityDetails: details }));
    } catch (error) {
      console.log("community details fetching error", error);
    }
  }, []);

  useEffect(() => {
    console.log("~ why its not");
    if (!user) {
      setGlobalState((val) => ({ ...val, communityDetails: null }));
      return;
    }
    setCommunityDetails(user);
  }, [user, setCommunityDetails]);

  const api = useMemo(
    () => ({
      openModal: handleOpenModal,
      closeModal: handleCloseModal,
      successToaster: handleSuccessToaster,
      errorToaster: handleErrorToaster,
      closeToaster: handleCloseToaster,
    }),
    [
      handleOpenModal,
      handleCloseModal,
      handleSuccessToaster,
      handleErrorToaster,
      handleCloseToaster,
    ]
  );

  return (
    <GlobalAppContext.Provider value={globalState}>
      <GlobalAppApiContext.Provider value={api}>
        {children}
      </GlobalAppApiContext.Provider>
    </GlobalAppContext.Provider>
  );
};

export const useGlobalAppContex = () => {
  const ctx = useContext(GlobalAppContext);
  return ctx;
};

export const useGlobalAppApiContext = () => {
  const ctx = useContext(GlobalAppApiContext);
  return ctx;
};
