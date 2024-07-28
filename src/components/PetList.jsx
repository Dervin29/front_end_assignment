import React, { useContext, useEffect } from "react";
import { PetContext } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="flex flex-col gap-2 justify-center items-center h-screen rounded-sm">
      <h1 className="text-2xl">Pets List</h1>
      <table className="min-w-full  divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase "
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase "
            >
              Breed
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase "
            >
              animal
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase "
            >
              Actions
            </th>
 
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{pet.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{pet.breed}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {pet.animal}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handlePetClick(pet.id)}
                  className="text-indigo-600 hover:text-indigo-900 text-right underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
