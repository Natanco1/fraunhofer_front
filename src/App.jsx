import { Routes, Route, Link, useLocation } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Generate from "./pages/Generate";
import CollectionDetail from "./pages/CollectionDetail";

function App() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "glow text-white"
      : "text-gray-300 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-800 text-white w-full fixed top-0 left-0 z-10">
        <div className="flex items-center space-x-3 pr-6">
          <span className="text-2xl font-bold glow">StyleTransfer</span>
          
          <Link to="/" className={`text-xl px-3 ${getLinkClass('/')}`}>
            <i className="fa fa-home"></i>
          </Link>

          <Link to="/generate" className={`text-xl px-3 ${getLinkClass('/generate')}`}>
            <i className="fa fa-paint-brush"></i>
          </Link>
        </div>

      </nav>

      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
