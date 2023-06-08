import React, { createContext, useState } from "react";
import PlaceModalScreen from "../components/PlaceModalScreen";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const openModal = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ modalVisible, selectedPlace, openModal, closeModal }}>
      {children}
      <PlaceModalScreen
        modalVisible={modalVisible}
        place={selectedPlace}
        handleCloseModal={closeModal}
      />
    </ModalContext.Provider>
  );
};