const handleOpenModal = ({ setGlobalState }: any) => {
  setGlobalState((prev: any) => ({
    ...prev,
    modalState: { ...prev.modalState, open: true },
  }));
};

const handleCloseModal = ({ setGlobalState }: any) => {
  setGlobalState((prev: any) => ({
    ...prev,
    modalState: { ...prev.modalState, open: false },
  }));
};

export { handleOpenModal, handleCloseModal };
