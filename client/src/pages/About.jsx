import React from "react";

export default function About() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        About EventSphere
      </h1>
      <p className="mb-4 text-lg text-gray-700 leading-relaxed">
        Welcome to{" "}
        <span className="font-semibold text-blue-600">EventSphere</span> —
        your one-stop destination for discovering and booking the most exciting
        events happening around you. From conferences and workshops to concerts
        and sports events, we connect you with memorable experiences tailored to
        your interests.
      </p>
      <p className="mb-4 text-lg text-gray-700 leading-relaxed">
        At <span className="font-semibold text-blue-600">EventSphere</span>
        , we strive to make event discovery and booking seamless and
        stress-free. Our platform offers detailed event listings, interactive
        calendars, and a hassle-free reservation process. Whether you're an
        event organizer or an attendee, we ensure a smooth experience at every
        step.
      </p>
      <p className="mb-4 text-lg text-gray-700 leading-relaxed">
        Explore events in your area, filter by categories, and find the perfect
        experiences that match your interests and schedule. Start your journey
        with{" "}
        <span className="font-semibold text-blue-600">EventSphere</span>{" "}
        today and create memories that last a lifetime!
      </p>
    </div>
  );
}
