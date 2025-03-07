import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaParking } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="smooth-card h-full">
      <Link to={`/listing/${listing._id}`} className="block h-full">
        <div className="relative">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="listing cover"
            className="h-[200px] w-full object-cover"
          />

          {/* Price Tag */}
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium shadow">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </div>

          {/* Type Badge */}
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
              listing.type === "rent"
                ? "bg-accent-blue text-white"
                : "bg-accent-teal text-white"
            }`}
          >
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-neutral-800 mb-1 truncate">
            {listing.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <MdLocationOn className="text-accent-blue" />
            <p className="text-sm text-neutral-600 truncate">
              {listing.address}
            </p>
          </div>

          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
            {listing.description}
          </p>

          <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-neutral-700">
                <FaBed className="text-accent-blue" />
                <span className="text-sm">
                  {listing.bedrooms} {listing.bedrooms === 1 ? "bed" : "beds"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-neutral-700">
                <FaBath className="text-accent-blue" />
                <span className="text-sm">
                  {listing.bathrooms}{" "}
                  {listing.bathrooms === 1 ? "bath" : "baths"}
                </span>
              </div>
            </div>

            {listing.parking && (
              <div className="flex items-center gap-1 text-neutral-700">
                <FaParking className="text-accent-blue" />
                <span className="text-xs">Parking</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
