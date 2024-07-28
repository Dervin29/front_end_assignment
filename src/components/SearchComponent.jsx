import React, { useState, useContext, useEffect } from "react";
import { PetContext } from "../context/PetContext";
import axios from "axios";

const SearchComponent = ({ setPets }) => {
  const { pets } = useContext(PetContext);
  const [animal, setAnimal] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  useEffect(() => {
    if (animal) {
      const locations = Array.from(
        new Set(
          pets.filter((pet) => pet.animal === animal).map((pet) => pet.city)
        )
      );
      const breeds = Array.from(
        new Set(
          pets.filter((pet) => pet.animal === animal).map((pet) => pet.breed)
        )
      );
      setFilteredLocations(locations);
      setFilteredBreeds(breeds);
    } else {
      setFilteredLocations([]);
      setFilteredBreeds([]);
    }
  }, [animal, pets]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&city=${location}&breed=${breed}`
      );
      setPets(response.data.pets);
    } catch (error) {
      console.error("Error searching pets:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 bg-[#202847] p-4 rounded-md">
      <div className="w-full flex gap-4 ">
        <select className=" w-full px-4 py-2 rounded-md " value={animal} onChange={(e) => setAnimal(e.target.value)}>
          <option  value="">Select Animal</option>
          {Array.from(new Set(pets.map((pet) => pet.animal))).map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>

        <select
         className="w-full px-4 py-2 rounded-md "
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={!animal}
        >
          <option value="">Select Location</option>
          {filteredLocations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
         className=" w-full px-4 py-2 rounded-md "
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          disabled={!animal}
        >
          <option value="">Select Breed</option>
          {filteredBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSearch} className="w-full rounded-md bg-blue-400 hover:bg-blue-500  text-white p-2">
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
