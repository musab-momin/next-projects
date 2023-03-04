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
}

type globalAppContextProps = {
  children: JSX.Element;
};

export interface initialApiProps {
  openModal: (viewShouldBe: "login" | "signup" | "resetPassword") => void;
  closeModal: () => void;
}

const initial: initialProps = {
  modalState: {
    open: false,
    view: "login",
  },
};

const initialApi: initialApiProps = {
  openModal: () => {},
  closeModal: () => {},
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

  const api = useMemo(
    () => ({
      openModal: handleOpenModal,
      closeModal: handleCloseModal,
    }),
    [handleOpenModal, handleCloseModal]
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
