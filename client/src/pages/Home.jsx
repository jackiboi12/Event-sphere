import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { FaHome, FaBuilding, FaTag } from "react-icons/fa";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async (type, setter) => {
      try {
        const res = await fetch(`/api/listing/get?${type}&limit=4`);
        const data = await res.json();
        setter(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchListings("type=rent", setRentListings);
    fetchListings("type=sale", setSaleListings);
    fetchListings("offer=true", setOfferListings);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-white py-12 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
                Find Your Perfect Home
              </h1>
              <p className="text-neutral-600 mb-6">
                Discover the best properties available for rent or sale. Start
                your journey today with BooknStay.
              </p>
              <Link to="/search" className="smooth-button inline-block">
                Browse Properties
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                alt="Modern home"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Slider */}
      {offerListings && offerListings.length > 0 && (
        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">
              Featured Properties
            </h2>
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
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingItem listing={listing} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Property Categories */}
      <div className="py-12 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-neutral-800 text-center">
            Explore Properties by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/search?type=rent" className="block">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <FaHome className="text-4xl mx-auto mb-4 text-accent-blue" />
                <h3 className="text-xl font-medium mb-2 text-neutral-800">
                  For Rent
                </h3>
                <p className="text-neutral-600 mb-4">
                  Find your perfect rental property
                </p>
                <span className="text-accent-blue font-medium">
                  View Rentals
                </span>
              </div>
            </Link>

            <Link to="/search?type=sale" className="block">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <FaBuilding className="text-4xl mx-auto mb-4 text-accent-teal" />
                <h3 className="text-xl font-medium mb-2 text-neutral-800">
                  For Sale
                </h3>
                <p className="text-neutral-600 mb-4">
                  Invest in your future home
                </p>
                <span className="text-accent-teal font-medium">View Sales</span>
              </div>
            </Link>

            <Link to="/search?offer=true" className="block">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <FaTag className="text-4xl mx-auto mb-4 text-accent-blue" />
                <h3 className="text-xl font-medium mb-2 text-neutral-800">
                  Special Offers
                </h3>
                <p className="text-neutral-600 mb-4">
                  Exclusive deals just for you
                </p>
                <span className="text-accent-blue font-medium">
                  View Offers
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Rent Listings */}
          {rentListings && rentListings.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">
                  Places for Rent
                </h2>
                <Link
                  to="/search?type=rent"
                  className="text-accent-blue hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rentListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}

          {/* Sale Listings */}
          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">
                  Places for Sale
                </h2>
                <Link
                  to="/search?type=sale"
                  className="text-accent-blue hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {saleListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
