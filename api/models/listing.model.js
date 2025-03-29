import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    virtualEvent: {
      type: Boolean,
      required: true,
    },
    catering: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "conference",
        "workshop",
        "concert",
        "sports",
        "exhibition",
        "other",
      ],
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
