import React from "react";

function EventCard({
  title,
  date,
  location,
  description,
  image,
  isExpired,
  onRegister,
}) {
  return (
    <div className="max-w-md w-full sm:mx-auto border border-neutral-700 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-2 px-4 border-b border-neutral-700">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4 flex justify-between items-center w-full">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-400">{location}</p>
          </div>
          <p className="text-xs">{date}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-300">
          Event Description
        </h3>
        <p className="text-sm mt-2 text-gray-400">{description}</p>
      </div>

      {/* Footer: Comment Input + Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 pb-4">
        {/* Comment Input */}
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full sm:w-2/3 p-2 text-sm bg-neutral-800 text-white rounded border border-neutral-700 mb-2 sm:mb-0 sm:mr-2 h-10"
        />

        {/* Register or Expired Button */}
        {isExpired ? (
          <button className="w-full sm:w-1/3 bg-red-600 text-white py-2 px-2 rounded-lg cursor-not-allowed h-10">
            Expired
          </button>
        ) : (
          <button
            className="w-full sm:w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-lg h-10"
            onClick={onRegister}
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}

function EventPage() {
  const handleRegister = (eventTitle) => {
    alert(`You have registered for: ${eventTitle}`);
  };

  const events = [
    {
      title: "Music Fest 2024",
      date: "15 Nov 2024",
      location: "Auditorium",
      description:
        "......................................................................",
      image:
        "https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg",
      isExpired: false,
    },
    {
      title: "TechFest",
      date: "10 Nov 2024",
      location: "IT Building",
      description:
        "...................................................................................",
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/04/17/technology-1866828_960_720.jpg",
      isExpired: true,
    },
  ];

  return (
    <div className="text-white h-full w-full">
      <div className="w-full my-5 space-y-5">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
            description={event.description}
            image={event.image}
            isExpired={event.isExpired}
            onRegister={() => handleRegister(event.title)}
          />
        ))}
      </div>
    </div>
  );
}

export default EventPage;
