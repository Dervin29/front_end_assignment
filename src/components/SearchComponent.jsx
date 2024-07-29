import React, { useState, useContext, useEffect } from "react";
import { PetContext } from "../context/PetContext";
import axios from "axios";

const SearchComponent = ({ setPets }) => {
  const { pets } = useContext(PetContext);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");

  const [allAnimalOptions, setAllAnimalOptions] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  useEffect(() => {
    const animals = Array.from(new Set(pets.map((pet) => pet.animal)));
    setAllAnimalOptions(animals);

    if (selectedAnimal) {
      const locations = Array.from(
        new Set(
          pets.filter((pet) => pet.animal === selectedAnimal).map((pet) => pet.city)
        )
      );
      const breeds = Array.from(
        new Set(
          pets.filter((pet) => pet.animal === selectedAnimal).map((pet) => pet.breed)
        )
      );
      setFilteredLocations(locations);
      setFilteredBreeds(breeds);
    } else {
      const locations = Array.from(new Set(pets.map((pet) => pet.city)));
      const breeds = Array.from(new Set(pets.map((pet) => pet.breed)));
      setFilteredLocations(locations);
      setFilteredBreeds(breeds);
    }
  }, [pets, selectedAnimal]); 

  const handleSearch = async () => {
    try {
      console.log("Searching with:", {
        animal: selectedAnimal,
        city: location,
        breed: breed
      });
  
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}?animal=${selectedAnimal}&city=${location}&breed=${breed}`
      );
  
      console.log("API Response Data:", response.data);
  
      // Make sure to set the state with the correct property
      setPets(response.data.pets); 
  
      // Reset search fields
      setSelectedAnimal("");
      setLocation("");
      setBreed("");
  
      // Update filtered options based on the search results
      const updatedLocations = Array.from(new Set(response.data.pets.map((pet) => pet.city)));
      const updatedBreeds = Array.from(new Set(response.data.pets.map((pet) => pet.breed)));
      setFilteredLocations(updatedLocations);
      setFilteredBreeds(updatedBreeds);

      // If no results are found, refresh the page after 5 seconds
      if (response.data.pets.length === 0) {
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error) {
      console.error("Error searching pets:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 bg-gradient-to-r from-[#202847] to-blue-900 p-4 rounded-md">
      <h1 className="text-2xl font-bold text-blue-400">Looking for a specific pet?</h1>
      <p className="text-white">Use the search bar to find them by breed, animal, location.</p>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <select
          className="w-full px-4 py-2 rounded-md"
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
        >
          <option value="">Select Animal</option>
          {allAnimalOptions.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>

        <select
          className="w-full px-4 py-2 rounded-md"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={!selectedAnimal}
        >
          <option value="">Select Location</option>
          {filteredLocations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          className="w-full px-4 py-2 rounded-md"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          disabled={!selectedAnimal}
        >
          <option value="">Select Breed</option>
          {filteredBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full rounded-md bg-[#0069d9] hover:bg-blue-500 text-white p-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
