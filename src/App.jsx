import "./App.css";
import PetList from "./components/PetList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className=" max-w-screen-md mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PetList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
