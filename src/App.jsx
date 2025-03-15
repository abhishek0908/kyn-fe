import { Routes, Route } from "react-router-dom";
import "./App.css";
import Map from "./components/Map.jsx";
import Header from "./components/Header.jsx";
import ViewReview from "./components/ViewReview.jsx";
import SearchBox from "./components/SearchBox.jsx";
import SubmitReview from "./components/SubmitReview.jsx";

function App() {
  return (
    <div className="text-4xl">
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route
          path="/review"
          element={
            <div className="flex flex-col items-center p-6">
              <ViewReview />
            </div>
          }
        />
                <Route path="/submit" element={<SubmitReview />} />

      </Routes>
    </div>
  );
}

export default App;
