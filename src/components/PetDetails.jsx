import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PetContext } from "../context/PetContext";
import axios from "axios";

const PetDetails = () => {
  const { id } = useParams();
  const { selectedPet, setSelectedPet } = useContext(PetContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(
          `http://pets-v2.dev-apis.com/pets?id=${id}`
        );
        setSelectedPet(response.data.pets[0]);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id, setSelectedPet]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!selectedPet) {
    return <p>Pet not found.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-2 mx-auto">
      <div className="flex flex-col gap-2 text-left bg-blue-950 rounded-lg p-5">
        <div>
          <button
            className=" w-1/6 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          > Back </button>
        </div>
        <div className="flex flex-col gap-3 bg-white p-4 rounded-md ">
        <h1 className="text-2xl font-bold">{selectedPet.name}</h1>
        <p className="text"><span className=" font-bold">Animal: </span> {selectedPet.animal}</p>
        <p className=""><span className=" font-bold">Breed: </span> {selectedPet.breed}</p>
        <p className=" text-left text-wrap leading-normal "><span className=" font-bold">Description: </span> {selectedPet.description}</p>
        <p className=""><span className=" font-bold">State: </span> {selectedPet.state}</p>
        <p className=""><span className=" font-bold">City: </span> {selectedPet.city}</p>
        <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar">
          {selectedPet.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Photo of ${selectedPet.name}`}
              className="w-1/4  "
            />
          ))}
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default PetDetails;
