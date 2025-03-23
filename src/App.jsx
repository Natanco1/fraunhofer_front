import { Routes, Route, Link } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Generate from "./pages/Generate";

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-center space-x-6 p-4 bg-blue-500 text-white">
        <Link to="/generate" className="text-lg font-semibold">Generate</Link>
        <Link to="/" className="text-lg font-semibold">Home</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </div>
  );
}

export default App;
