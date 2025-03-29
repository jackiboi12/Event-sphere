import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaUtensils,
  FaVideo,
  FaMoneyBillWave,
  FaTag,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { formatDistance } from "date-fns";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const isEvent = location.pathname.includes("/event/");

  // Format the date
  const formatEventDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate time until event
  const getTimeUntilEvent = (dateString) => {
    if (!dateString) return "";
    const eventDate = new Date(dateString);
    const now = new Date();

    if (eventDate < now) {
      return "Event has passed";
    }

    return formatDistance(eventDate, now, { addSuffix: true });
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const endpoint = isEvent
          ? `/api/event/get/${params.listingId}`
          : `/api/listing/get/${params.listingId}`;

        const res = await fetch(endpoint);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId, isEvent]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - {isEvent ? " per ticket" : " for sale"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {isEvent ? listing.location : listing.address}
            </p>
            <div className="flex gap-4">
              {isEvent ? (
                <p
                  className={`w-full max-w-[200px] text-white text-center p-1 rounded-md ${
                    listing.type === "conference"
                      ? "bg-blue-600"
                      : listing.type === "concert"
                      ? "bg-purple-600"
                      : listing.type === "sports"
                      ? "bg-green-600"
                      : listing.type === "exhibition"
                      ? "bg-orange-600"
                      : listing.type === "workshop"
                      ? "bg-red-600"
                      : "bg-gray-600"
                  }`}
                >
                  {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
                </p>
              ) : (
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>

            {isEvent ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-700 text-lg" />
                  <p className="text-neutral-700">
                    <span className="font-semibold">Date: </span>
                    {formatEventDate(listing.eventDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-green-700 text-lg" />
                  <p className="text-neutral-700">
                    <span className="font-semibold">Time: </span>
                    {listing.eventTime} ({getTimeUntilEvent(listing.eventDate)})
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-green-700 text-lg" />
                    <p className="text-neutral-700">
                      <span className="font-semibold">Capacity: </span>
                      {listing.capacity} people
                    </p>
                  </div>
                  {listing.category && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-700">
                        Category:{" "}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {listing.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  {listing.virtualEvent && (
                    <div className="flex items-center gap-2">
                      <FaVideo className="text-green-700 text-lg" />
                      <p className="text-neutral-700">Virtual Event</p>
                    </div>
                  )}
                  {listing.catering && (
                    <div className="flex items-center gap-2">
                      <FaUtensils className="text-green-700 text-lg" />
                      <p className="text-neutral-700">Catering Available</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
            )}

            {/* Price / Date display section */}
            <div className="flex flex-col gap-4 p-3">
              <p className="text-2xl font-semibold text-neutral-900 flex items-center">
                <FaMoneyBillWave className="text-green-600 mr-2" />
                {isEvent ? (
                  <>
                    <span className="text-green-600 mr-1">₹</span>
                    {listing.ticketPrice.toLocaleString("en-IN")}
                    <span className="text-lg font-normal text-neutral-700 ml-1">
                      per ticket
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-green-600 mr-1">₹</span>
                    {listing.regularPrice.toLocaleString("en-IN")}
                    {listing.type === "rent" && (
                      <span className="text-lg font-normal text-neutral-700 ml-1">
                        / month
                      </span>
                    )}
                  </>
                )}
              </p>

              {listing.offer && (
                <div className="bg-green-50 p-2 rounded flex gap-1 items-center text-sm">
                  <p className="font-semibold text-green-800">
                    <FaTag className="inline mr-1" />
                    Discounted from{" "}
                    <span className="line-through">
                      ₹
                      {isEvent
                        ? listing.ticketPrice.toLocaleString("en-IN")
                        : listing.regularPrice.toLocaleString("en-IN")}
                    </span>{" "}
                    to{" "}
                    <span className="text-green-700">
                      ₹{listing.discountPrice.toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                {isEvent ? "Contact Organizer" : "Contact landlord"}
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
