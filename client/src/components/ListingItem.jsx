import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaCalendarAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

export default function ListingItem({ listing }) {
  // Determine if this is an event listing based on URL path
  const isEvent =
    window.location.pathname.includes("event") ||
    window.location.pathname === "/" ||
    window.location.pathname.includes("search");

  // Format date for events
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for events
  const formatEventTime = (timeString) => {
    if (!timeString) return "";
    return timeString;
  };

  return (
    <div className="smooth-card h-full flex flex-col">
      <Link
        to={isEvent ? `/event/${listing._id}` : `/listing/${listing._id}`}
        className="block relative overflow-hidden"
        style={{
          paddingTop: "66.67%",
          /* 2:3 aspect ratio */ position: "relative",
        }}
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="absolute top-0 left-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {listing.type && (
          <span
            className={`event-badge absolute top-3 left-3 ${
              listing.type === "conference"
                ? "event-badge-conference"
                : listing.type === "concert"
                ? "event-badge-concert"
                : listing.type === "workshop"
                ? "event-badge-workshop"
                : listing.type === "sports"
                ? "event-badge-sports"
                : "event-badge-exhibition"
            }`}
          >
            {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
          </span>
        )}
        {listing.offer && (
          <span className="event-badge event-badge-workshop absolute top-3 right-3">
            Featured
          </span>
        )}
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-neutral-800 line-clamp-2">
          {listing.name}
        </h3>

        {isEvent ? (
          <div className="space-y-2 flex-grow">
            {listing.eventDate && (
              <div className="flex items-center text-neutral-600 text-sm gap-1">
                <FaCalendarAlt
                  style={{ color: "var(--primary-500)", flexShrink: 0 }}
                />
                <span>{formatEventDate(listing.eventDate)}</span>
              </div>
            )}

            {listing.eventTime && (
              <div className="flex items-center text-neutral-600 text-sm gap-1">
                <FaClock
                  style={{ color: "var(--primary-500)", flexShrink: 0 }}
                />
                <span>{formatEventTime(listing.eventTime)}</span>
              </div>
            )}

            <div className="flex items-center text-neutral-600 text-sm gap-1">
              <MdLocationOn
                style={{ color: "var(--primary-500)", flexShrink: 0 }}
              />
              <span className="truncate">{listing.location}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center text-neutral-600 text-sm gap-1 flex-grow mb-2">
            <MdLocationOn
              style={{ color: "var(--primary-500)", flexShrink: 0 }}
            />
            <p className="truncate">{listing.address}</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold" style={{ color: "var(--primary-700)" }}>
            <FaMoneyBillWave
              style={{ display: "inline", marginRight: "4px", flexShrink: 0 }}
            />
            ₹
            {isEvent
              ? listing.ticketPrice.toLocaleString("en-IN")
              : listing.regularPrice.toLocaleString("en-IN") +
                (listing.type === "rent" ? " / month" : "")}
          </p>

          <Link
            to={isEvent ? `/event/${listing._id}` : `/listing/${listing._id}`}
            className="text-sm font-medium hover-text-primary"
            style={{ color: "var(--primary-600)" }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
