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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("type", "all");
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
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "all 300ms",
        backgroundColor: scrolled ? "white" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        padding: scrolled ? "0.5rem 0" : "0.75rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <Link to="/">
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            <span style={{ color: "var(--primary-600)" }}>Event</span>
            <span style={{ color: "var(--primary-900)" }}>Sphere</span>
            
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "var(--neutral-100)",
            padding: "0.5rem",
            borderRadius: "9999px",
            alignItems: "center",
            border: "1px solid var(--neutral-200)",
          }}
          className="hidden md:flex"
        >
          <input
            type="text"
            placeholder="Search events..."
            style={{
              backgroundColor: "transparent",
              outline: "none",
              width: "16rem",
              color: "var(--neutral-800)",
              padding: "0 0.5rem",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            style={{
              backgroundColor: "var(--primary-600)",
              padding: "0.5rem",
              borderRadius: "9999px",
              color: "white",
            }}
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <Link to="/">
            <span
              className="hover-text-primary"
              style={{
                color: "var(--neutral-700)",
                fontWeight: "500",
              }}
            >
              Home
            </span>
          </Link>
          <Link to="/search?type=all">
            <span
              className="hover-text-primary"
              style={{
                color: "var(--neutral-700)",
                fontWeight: "500",
              }}
            >
              Explore Events
            </span>
          </Link>
          <Link to="/about">
            <span
              className="hover-text-primary"
              style={{
                color: "var(--neutral-700)",
                fontWeight: "500",
              }}
            >
              About
            </span>
          </Link>
          {currentUser && (
            <Link to="/create-event">
              <span
                style={{
                  backgroundColor: "var(--primary-50)",
                  color: "var(--primary-700)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--primary-200)",
                  fontWeight: "500",
                }}
              >
                Create Event
              </span>
            </Link>
          )}
          {currentUser ? (
            <Link to="/profile">
              <div style={{ position: "relative" }}>
                <img
                  style={{
                    borderRadius: "9999px",
                    height: "2.25rem",
                    width: "2.25rem",
                    objectFit: "cover",
                    border: "2px solid var(--primary-300)",
                  }}
                  src={currentUser.avatar}
                  alt="profile"
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-0.25rem",
                    right: "-0.25rem",
                    height: "0.875rem",
                    width: "0.875rem",
                    backgroundColor: "#22c55e",
                    borderRadius: "9999px",
                    border: "2px solid white",
                  }}
                ></span>
              </div>
            </Link>
          ) : (
            <Link to="/sign-in">
              <button
                style={{
                  backgroundColor: "var(--primary-600)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                }}
                className="hover-button"
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--primary-700)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--primary-600)")
                }
              >
                Sign in
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          style={{
            color: "var(--neutral-800)",
            fontSize: "1.5rem",
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden animate-fadeIn"
          style={{
            backgroundColor: "white",
            borderTop: "1px solid var(--neutral-200)",
            padding: "1rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              backgroundColor: "var(--neutral-100)",
              padding: "0.5rem",
              borderRadius: "9999px",
              alignItems: "center",
              marginBottom: "1rem",
              border: "1px solid var(--neutral-200)",
            }}
          >
            <input
              type="text"
              placeholder="Search events..."
              style={{
                backgroundColor: "transparent",
                outline: "none",
                width: "100%",
                color: "var(--neutral-800)",
                padding: "0 0.5rem",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "var(--primary-600)",
                padding: "0.5rem",
                borderRadius: "9999px",
                color: "white",
              }}
            >
              <FaSearch />
            </button>
          </form>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <span
                className="hover-text-primary"
                style={{
                  color: "var(--neutral-700)",
                  display: "block",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--neutral-100)",
                }}
              >
                Home
              </span>
            </Link>
            <Link
              to="/search?type=all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span
                className="hover-text-primary"
                style={{
                  color: "var(--neutral-700)",
                  display: "block",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--neutral-100)",
                }}
              >
                Explore Events
              </span>
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              <span
                className="hover-text-primary"
                style={{
                  color: "var(--neutral-700)",
                  display: "block",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--neutral-100)",
                }}
              >
                About
              </span>
            </Link>
            {currentUser ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <span
                    className="hover-text-primary"
                    style={{
                      color: "var(--neutral-700)",
                      display: "block",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid var(--neutral-100)",
                    }}
                  >
                    Profile
                  </span>
                </Link>
                <Link
                  to="/create-event"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span
                    className="hover-text-primary"
                    style={{
                      color: "var(--neutral-700)",
                      display: "block",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid var(--neutral-100)",
                    }}
                  >
                    Create Event
                  </span>
                </Link>
              </>
            ) : (
              <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--primary-600)",
                    color: "white",
                    padding: "0.5rem 0",
                    borderRadius: "9999px",
                  }}
                >
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
