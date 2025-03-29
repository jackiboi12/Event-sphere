import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    catering: false,
    virtualEvent: false,
    offer: false,
    fromDate: "",
    toDate: "",
    minPrice: 0,
    maxPrice: 10000,
    minCapacity: 0,
    maxCapacity: 1000,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const cateringFromUrl = urlParams.get("catering");
    const virtualEventFromUrl = urlParams.get("virtualEvent");
    const offerFromUrl = urlParams.get("offer");
    const fromDateFromUrl = urlParams.get("fromDate");
    const toDateFromUrl = urlParams.get("toDate");
    const minPriceFromUrl = urlParams.get("minPrice");
    const maxPriceFromUrl = urlParams.get("maxPrice");
    const minCapacityFromUrl = urlParams.get("minCapacity");
    const maxCapacityFromUrl = urlParams.get("maxCapacity");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      cateringFromUrl ||
      virtualEventFromUrl ||
      offerFromUrl ||
      fromDateFromUrl ||
      toDateFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl ||
      minCapacityFromUrl ||
      maxCapacityFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        catering: cateringFromUrl === "true" ? true : false,
        virtualEvent: virtualEventFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        fromDate: fromDateFromUrl || "",
        toDate: toDateFromUrl || "",
        minPrice: minPriceFromUrl || 0,
        maxPrice: maxPriceFromUrl || 10000,
        minCapacity: minCapacityFromUrl || 0,
        maxCapacity: maxCapacityFromUrl || 1000,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchEvents = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      console.log("Fetching events with query:", searchQuery);
      try {
        const res = await fetch(`/api/event/get?${searchQuery}`);
        const data = await res.json();
        console.log("Received events:", data.length);
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "conference" ||
      e.target.id === "workshop" ||
      e.target.id === "concert" ||
      e.target.id === "exhibition" ||
      e.target.id === "sports" ||
      e.target.id === "other"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "catering" ||
      e.target.id === "virtualEvent" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "fromDate" || e.target.id === "toDate") {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
    }

    if (
      e.target.id === "minPrice" ||
      e.target.id === "maxPrice" ||
      e.target.id === "minCapacity" ||
      e.target.id === "maxCapacity"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: Number(e.target.value),
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("catering", sidebardata.catering);
    urlParams.set("virtualEvent", sidebardata.virtualEvent);
    urlParams.set("offer", sidebardata.offer);

    if (sidebardata.fromDate) {
      urlParams.set("fromDate", sidebardata.fromDate);
    }

    if (sidebardata.toDate) {
      urlParams.set("toDate", sidebardata.toDate);
    }

    urlParams.set("minPrice", sidebardata.minPrice);
    urlParams.set("maxPrice", sidebardata.maxPrice);
    urlParams.set("minCapacity", sidebardata.minCapacity);
    urlParams.set("maxCapacity", sidebardata.maxCapacity);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfEvents = events.length;
    const startIndex = numberOfEvents;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/event/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setEvents([...events, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Event Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>All Types</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="conference"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "conference"}
              />
              <span>Conference</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="workshop"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "workshop"}
              />
              <span>Workshop</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="concert"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "concert"}
              />
              <span>Concert</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="exhibition"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "exhibition"}
              />
              <span>Exhibition</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sports"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sports"}
              />
              <span>Sports</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="other"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "other"}
              />
              <span>Other</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Event Date:</label>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <span className="text-sm">From:</span>
                <input
                  type="date"
                  id="fromDate"
                  className="border rounded-lg p-3 flex-grow"
                  onChange={handleChange}
                  value={sidebardata.fromDate}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">To:</span>
                <input
                  type="date"
                  id="toDate"
                  className="border rounded-lg p-3 flex-grow"
                  onChange={handleChange}
                  value={sidebardata.toDate}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Features:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="catering"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.catering}
              />
              <span>Catering</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="virtualEvent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.virtualEvent}
              />
              <span>Virtual Event</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Special Offer</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Price Range:</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="minPrice"
                min="0"
                max="10000"
                className="border rounded-lg p-3 w-1/3"
                value={sidebardata.minPrice}
                onChange={handleChange}
              />
              <span>to</span>
              <input
                type="number"
                id="maxPrice"
                min="0"
                max="10000"
                className="border rounded-lg p-3 w-1/3"
                value={sidebardata.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Capacity Range:</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="minCapacity"
                min="0"
                max="1000"
                className="border rounded-lg p-3 w-1/3"
                value={sidebardata.minCapacity}
                onChange={handleChange}
              />
              <span>to</span>
              <input
                type="number"
                id="maxCapacity"
                min="0"
                max="1000"
                className="border rounded-lg p-3 w-1/3"
                value={sidebardata.maxCapacity}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="ticketPrice_desc">Price high to low</option>
              <option value="ticketPrice_asc">Price low to high</option>
              <option value="eventDate_asc">Soonest first</option>
              <option value="capacity_desc">Capacity high to low</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search Events
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Event Search Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && events.length === 0 && (
            <p className="text-xl text-slate-700">No events found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            events &&
            events.map((event) => (
              <div key={event._id} className="w-full sm:w-[330px] h-full">
                <ListingItem listing={event} />
              </div>
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
