import Event from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(errorHandler(404, "Event not found!"));
  }

  if (req.user.id !== event.userRef) {
    return next(errorHandler(401, "You can only delete your own events!"));
  }

  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(errorHandler(404, "Event not found!"));
  }
  if (req.user.id !== event.userRef) {
    return next(errorHandler(401, "You can only update your own events!"));
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return next(errorHandler(404, "Event not found!"));
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    console.log("Received search params:", req.query);

    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let virtualEvent = req.query.virtualEvent;

    if (virtualEvent === undefined || virtualEvent === "false") {
      virtualEvent = { $in: [false, true] };
    }

    let catering = req.query.catering;

    if (catering === undefined || catering === "false") {
      catering = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = {
        $in: [
          "conference",
          "workshop",
          "concert",
          "sports",
          "exhibition",
          "other",
        ],
      };
    }

    const category = req.query.category || "";
    const searchTerm = req.query.searchTerm || "";

    // Handle both minPrice and minTicketPrice (use minPrice if available)
    const minPrice = req.query.minPrice || req.query.minTicketPrice || 0;
    const maxPrice = req.query.maxPrice || req.query.maxTicketPrice || 1000000;

    const minCapacity = req.query.minCapacity || 1;
    const maxCapacity = req.query.maxCapacity || 1000;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // For date-based searching
    const fromDate = req.query.fromDate ? new Date(req.query.fromDate) : null;
    const toDate = req.query.toDate ? new Date(req.query.toDate) : null;

    let dateFilter = {};
    if (fromDate && toDate) {
      dateFilter = {
        eventDate: {
          $gte: fromDate,
          $lte: toDate,
        },
      };
    } else if (fromDate) {
      dateFilter = { eventDate: { $gte: fromDate } };
    } else if (toDate) {
      dateFilter = { eventDate: { $lte: toDate } };
    }

    const queryObj = {
      name: { $regex: searchTerm, $options: "i" },
      offer,
      virtualEvent,
      catering,
      type,
      category: { $regex: category, $options: "i" },
      ticketPrice: { $gte: minPrice, $lte: maxPrice },
      capacity: { $gte: minCapacity, $lte: maxCapacity },
      ...dateFilter,
    };

    console.log("MongoDB query:", JSON.stringify(queryObj, null, 2));

    const events = await Event.find(queryObj)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    console.log("Results found:", events.length);
    return res.status(200).json(events);
  } catch (error) {
    console.error("Search error:", error);
    next(error);
  }
};
