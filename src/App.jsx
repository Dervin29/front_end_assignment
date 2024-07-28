import "./App.css";
import PetList from "./components/PetList";
import PetDetails from "./components/PetDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="max-w-screen-md mx-auto h-[90vh]">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<PetList />} />
            <Route path="/pet/:id" element={<PetDetails />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
