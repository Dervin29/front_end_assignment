import "./App.css";
import PetList from "./components/PetList";
import PetDetails from "./components/PetDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className=" max-w-screen-md mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pet/:id" element={<PetDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
