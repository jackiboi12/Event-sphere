import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async (type, setter) => {
      try {
        const res = await fetch(`/api/listing/get?${type}&limit=4`);
        const data = await res.json();
        setter(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings('offer=true', setOfferListings);
    fetchListings('type=rent', setRentListings);
    fetchListings('type=sale', setSaleListings);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-16 px-4 max-w-6xl mx-auto text-center lg:text-left">
        <h1 className="text-gray-800 font-extrabold text-4xl lg:text-6xl leading-tight">
          Find Your <span className="text-blue-600">Perfect</span> Home
        </h1>
        <p className="text-gray-500 text-sm lg:text-lg">
          Discover the best properties available for rent or sale. Start your journey today!
        </p>
        <Link to={'/search'} className="text-blue-600 font-bold text-sm lg:text-base hover:underline">
          Get Started →
        </Link>
      </div>

      {/* Swiper */}
      <div className="max-w-6xl mx-auto p-4">
        <Swiper navigation className="rounded-lg overflow-hidden shadow-md">
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[400px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${listing.imageUrls[0]})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Listings Section */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-12">
        {[{ title: "Recent Offers", listings: offerListings, type: "offer=true" },
          { title: "Places for Rent", listings: rentListings, type: "type=rent" },
          { title: "Places for Sale", listings: saleListings, type: "type=sale" }].map(({ title, listings, type }) => (
          listings.length > 0 && (
            <div key={title}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
                <Link className="text-blue-600 text-sm hover:underline" to={`/search?${type}`}>
                  View More →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
