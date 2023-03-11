import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface initialProps {
  modalState: {
    open: boolean;
    view: "login" | "signup" | "resetPassword";
  };
  toasterState: {
    isActive: boolean;
    mssg: string;
    type: string;
  };
}

type globalAppContextProps = {
  children: JSX.Element;
};

export interface initialApiProps {
  openModal: (viewShouldBe: "login" | "signup" | "resetPassword") => void;
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
  const [globalState, setGlobalState] = useState(initial);

  const handleOpenModal = useCallback(
    (viewShouldBe: "login" | "signup" | "resetPassword") => {
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
