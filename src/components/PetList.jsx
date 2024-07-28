import React, { useContext, useEffect } from "react";
import { PetContext } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchComponent from "./SearchComponent";

const PetList = () => {
  const { pets, setPets } = useContext(PetContext);
  const navigate = useNavigate();
  
  const handlePetClick = (id) => {
    navigate(`/pet/${id}`);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://pets-v2.dev-apis.com/pets");
        setPets(response.data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [setPets]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 flex flex-col gap-4 justify-center items-center h-screen   rounded-sm">
      <SearchComponent setPets={setPets}/>
      <div className="overflow-x-auto w-full no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-[#202847]">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 md:px-6 md:py-4 text-center text-xs font-medium text-white uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-2 md:px-6 md:py-4 text-center text-xs font-medium text-white uppercase"
              >
                Breed
              </th>
              <th
                scope="col"
                className="px-4 py-2 md:px-6 md:py-4 text-center text-xs font-medium text-white uppercase"
              >
                Animal
              </th>
              <th
                scope="col"
                className="px-4 py-2 md:px-6 md:py-4 text-center text-xs font-medium text-white uppercase"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#f7fcfc] divide-y divide-gray-200">
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <div className="text-sm text-gray-900">{pet.name}</div>
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <div className="text-sm text-gray-500">{pet.breed}</div>
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold uppercase rounded-full text-[#03346E]">
                    {pet.animal}
                  </span>
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handlePetClick(pet.id)}
                    className="text-[#202847] hover:text-[#46b3f4] p-1"
                  >
                    Click to view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetList;
