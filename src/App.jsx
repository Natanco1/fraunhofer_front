import { Routes, Route, Link, useLocation } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Generate from "./pages/Generate";

function App() {
  const location = useLocation();
  
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "glow text-white"
      : "text-gray-300 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
        {/* App Name on the left with right padding and always glowing */}
        <div className="flex items-center space-x-3 pr-6">
          <span className="text-2xl font-bold glow">StyleTransfer</span>
          
          {/* Home Icon with padding */}
          <Link to="/" className={`text-xl px-3 ${getLinkClass('/')}`}>
            <i className="fa fa-home"></i>
          </Link>
          
          {/* Brush Icon with padding */}
          <Link to="/generate" className={`text-xl px-3 ${getLinkClass('/generate')}`}>
            <i className="fa fa-paint-brush"></i>
          </Link>
        </div>

        {/* Nav Icons - aligned to the right */}
        <div className="flex items-center space-x-6">
          {/* Settings Cog Icon (currently does nothing) */}
          <Link to="#" className={`text-xl ${getLinkClass('/settings')}`}>
            <i className="fa fa-cog"></i>
          </Link>
        </div>
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
