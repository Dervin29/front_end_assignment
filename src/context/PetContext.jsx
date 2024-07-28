import React, { createContext, useState } from 'react';

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <PetContext.Provider value={{ pets, setPets, selectedPet, setSelectedPet }}>
      {children}
    </PetContext.Provider>
  );
};
