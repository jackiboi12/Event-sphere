import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="text-accent-blue">Book</span>
            <span className="text-neutral-800">nStay</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="hidden md:flex bg-neutral-100 p-2 rounded-lg items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-64 text-neutral-800 placeholder-neutral-500 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-accent-blue p-2 rounded-lg text-white">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/">
            <span className="text-neutral-700 hover:text-accent-blue transition-colors">
              Home
            </span>
          </Link>
          <Link to="/about">
            <span className="text-neutral-700 hover:text-accent-blue transition-colors">
              About
            </span>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-accent-blue"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <button className="bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign in
              </button>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-800 text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 p-4 animate-fadeIn">
          <form
            onSubmit={handleSubmit}
            className="flex bg-neutral-100 p-2 rounded-lg items-center mb-4"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-neutral-800 placeholder-neutral-500 px-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-accent-blue p-2 rounded-lg text-white">
              <FaSearch />
            </button>
          </form>

          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-neutral-700 hover:text-accent-blue transition-colors block py-2 border-b border-neutral-100">
                Home
              </span>
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-neutral-700 hover:text-accent-blue transition-colors block py-2 border-b border-neutral-100">
                About
              </span>
            </Link>
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-neutral-700 hover:text-accent-blue transition-colors block py-2">
                Profile
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
