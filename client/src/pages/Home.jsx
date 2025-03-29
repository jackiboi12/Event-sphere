import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import {
  FaCalendarAlt,
  FaMusic,
  FaUserTie,
  FaFootballBall,
  FaSlackHash,
} from "react-icons/fa";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [conferenceEvents, setConferenceEvents] = useState([]);
  const [concertEvents, setConcertEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async (type, setter) => {
      try {
        const res = await fetch(`/api/event/get?${type}&limit=4`);
        const data = await res.json();
        setter(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEvents("type=concert", setConcertEvents);
    fetchEvents("type=conference", setConferenceEvents);
    fetchEvents("offer=true", setFeaturedEvents);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient py-16 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <span
                className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                Discover Amazing Events
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
                Find Your Perfect{" "}
                <span style={{ color: "var(--secondary-300)" }}>
                  Event Experience
                </span>
              </h1>
              <p className="text-white mb-6 text-lg" style={{ opacity: "0.8" }}>
                From conferences to concerts, discover events that match your
                interests and create memories that last a lifetime.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/search?type=all"
                  className="smooth-button"
                  style={{
                    backgroundColor: "white",
                    color: "var(--primary-700)",
                    fontWeight: "600",
                    padding: "0.9rem 1.8rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    fontSize: "1.1rem",
                  }}
                >
                  Explore Events
                </Link>
                {!loading && featuredEvents.length > 0 && (
                  <a
                    href="#featured"
                    className="subtle-button"
                    style={{
                      backgroundColor: "rgba(124, 58, 237, 0.4)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Featured Events
                  </a>
                )}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div
                style={{
                  position: "absolute",
                  top: "-1rem",
                  left: "-1rem",
                  width: "6rem",
                  height: "6rem",
                  backgroundColor: "var(--primary-400)",
                  borderRadius: "9999px",
                  opacity: "0.2",
                  zIndex: "5",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-1rem",
                  right: "-1rem",
                  width: "8rem",
                  height: "8rem",
                  backgroundColor: "var(--secondary-400)",
                  borderRadius: "9999px",
                  opacity: "0.2",
                  zIndex: "5",
                }}
              ></div>
              <div
                className="aspect-ratio-container aspect-ratio-4-3 rounded-lg overflow-hidden relative"
                style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                  alt="Event venue with people"
                  style={{
                    zIndex: "10",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events Slider */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="py-16 bg-white" id="featured">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 flex items-center">
                <span className="inline-block w-10 h-1 bg-primary-600 mr-3"></span>
                Featured Events
              </h2>
              <Link
                to="/search?offer=true"
                className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
              >
                View All
              </Link>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {featuredEvents.map((event) => (
                <SwiperSlide key={event._id} className="h-auto">
                  <div className="h-full">
                    <ListingItem listing={event} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Event Categories */}
      <div className="py-16 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-10">
            <span
              style={{
                display: "inline-block",
                width: "2.5rem",
                height: "0.25rem",
                backgroundColor: "var(--primary-600)",
                marginRight: "0.75rem",
              }}
            ></span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
              Explore Events by Category
            </h2>
            <span
              style={{
                display: "inline-block",
                width: "2.5rem",
                height: "0.25rem",
                backgroundColor: "var(--primary-600)",
                marginLeft: "0.75rem",
              }}
            ></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/search?type=conference" className="block group">
              <div className="smooth-card p-8 text-center">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "var(--primary-50)",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem auto",
                  }}
                >
                  <FaUserTie
                    style={{ fontSize: "1.75rem", color: "var(--primary-600)" }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-800">
                  Conferences
                </h3>
                <p className="text-neutral-600 mb-4">
                  Expand your knowledge and network with industry professionals
                </p>
                <span
                  className="hover-text-primary"
                  style={{
                    color: "var(--primary-600)",
                    fontWeight: "500",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  View Conferences
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginLeft: "0.25rem",
                      transition: "margin 0.2s ease",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            <Link to="/search?type=concert" className="block group">
              <div className="smooth-card p-8 text-center">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "var(--primary-50)",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem auto",
                  }}
                >
                  <FaMusic
                    style={{ fontSize: "1.75rem", color: "var(--primary-600)" }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-800">
                  Concerts
                </h3>
                <p className="text-neutral-600 mb-4">
                  Enjoy live music performances from your favorite artists
                </p>
                <span
                  className="hover-text-primary"
                  style={{
                    color: "var(--primary-600)",
                    fontWeight: "500",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  View Concerts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginLeft: "0.25rem",
                      transition: "margin 0.2s ease",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            <Link to="/search?type=sports" className="block group">
              <div className="smooth-card p-8 text-center">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "var(--primary-50)",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem auto",
                  }}
                >
                  <FaFootballBall
                    style={{ fontSize: "1.75rem", color: "var(--primary-600)" }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-800">
                  Sports Events
                </h3>
                <p className="text-neutral-600 mb-4">
                  Cheer for your favorite teams and experience the thrill
                </p>
                <span
                  className="hover-text-primary"
                  style={{
                    color: "var(--primary-600)",
                    fontWeight: "500",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  View Sports Events
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginLeft: "0.25rem",
                      transition: "margin 0.2s ease",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Conference Events */}
          {conferenceEvents && conferenceEvents.length > 0 && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 flex items-center">
                  <span
                    style={{
                      display: "inline-block",
                      width: "2rem",
                      height: "0.25rem",
                      backgroundColor: "var(--accent-conference)",
                      marginRight: "0.75rem",
                    }}
                  ></span>
                  Upcoming Conferences
                </h2>
                <Link
                  to="/search?type=conference"
                  className="hover-text-primary"
                  style={{
                    color: "var(--accent-conference)",
                    fontWeight: "500",
                  }}
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {conferenceEvents.map((event) => (
                  <div key={event._id} className="h-full">
                    <ListingItem listing={event} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concert Events */}
          {concertEvents && concertEvents.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 flex items-center">
                  <span
                    style={{
                      display: "inline-block",
                      width: "2rem",
                      height: "0.25rem",
                      backgroundColor: "var(--accent-concert)",
                      marginRight: "0.75rem",
                    }}
                  ></span>
                  Upcoming Concerts
                </h2>
                <Link
                  to="/search?type=concert"
                  className="hover-text-primary"
                  style={{ color: "var(--accent-concert)", fontWeight: "500" }}
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {concertEvents.map((event) => (
                  <div key={event._id} className="h-full">
                    <ListingItem listing={event} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        style={{ backgroundColor: "var(--primary-900)" }}
        className="py-16 text-white"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Stay Updated with the Latest Events
          </h2>
          <p
            style={{ color: "var(--primary-100)" }}
            className="mb-8 max-w-xl mx-auto"
          >
            Subscribe to our newsletter and never miss an event that matches
            your interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className=" bg-white flex-grow p-3 rounded-full focus:outline-none text-neutral-800"
              style={{ flexGrow: 1, outline: "none" }}
            />
            <button
              className="smooth-button"
              style={{ backgroundColor: "var(--secondary-500)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--secondary-600)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--secondary-500)")
              }
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
