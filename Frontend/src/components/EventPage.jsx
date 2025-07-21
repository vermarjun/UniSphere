import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { timeAgo } from "../App";

function EventCard({
  title,
  date,
  location,
  description,
  image,
  user,
  isExpired,
  deadline,
  onRegister,
}) {
  return (
    <div className="max-w-xl mx-auto w-full border border-neutral-700 rounded-lg shadow bg-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-neutral-900">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">Posted by: {user}</p>
        </div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <p className="text-sm text-gray-300">{description}</p>
        <p className="text-xs text-gray-400">Location: {location}</p>
        {deadline && (
          <p className="text-xs text-gray-400">
            <span className="font-semibold">Deadline:</span> {deadline}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between px-4 pb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 p-2 text-sm bg-neutral-700 text-white rounded border border-neutral-600 h-10"
        />
        {isExpired ? (
          <button className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded h-10 cursor-not-allowed">
            Expired
          </button>
        ) : (
          <button
            onClick={onRegister}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded h-10"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}

function EventCardLoader() {
  return (
    <div className="max-w-xl mx-auto w-full border border-neutral-700 rounded-lg shadow bg-neutral-800 animate-pulse">
      <div className="flex justify-between items-center p-4 bg-neutral-900">
        <div className="space-y-2 w-full">
          <div className="h-4 w-1/4 bg-neutral-700 rounded"></div>
          <div className="h-3 w-2/4 bg-neutral-700 rounded"></div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="w-full h-40 bg-neutral-700 rounded"></div>
        <div className="h-3 w-2/3 bg-neutral-700 rounded"></div>
        <div className="h-3 w-1/3 bg-neutral-700 rounded"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between px-4 pb-4">
        <div className="flex-1 h-10 bg-neutral-700 rounded"></div>
        <div className="w-full sm:w-28 h-10 bg-neutral-700 rounded"></div>
      </div>
    </div>
  );
}

function AddEventModal({ isOpen, onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    image: "",
    user: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, date, location, user } = formData;
    if (!title || !description || !date || !location || !user) {
      alert("Please fill all fields.");
      return;
    }
    onAddEvent(formData);
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      image: "",
      user: "",
      deadline: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-neutral-800 p-6 rounded-lg w-11/12 max-w-md text-white space-y-4">
        <h2 className="text-xl font-bold text-center">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["title", "description", "user", "location"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 bg-neutral-700 rounded border border-neutral-600 text-sm"
            />
          ))}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 bg-neutral-700 rounded border border-neutral-600 text-sm"
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 bg-neutral-700 rounded border border-neutral-600 text-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 bg-neutral-700 rounded border border-neutral-600 text-sm"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const fetchEvents = async () => {
    const res = await axios.get(`${API_URL}/v1/event`, {
      params: { page, limit: 10 },
    });
    const data = res.data.message;
    if (!data.length) setHasMore(false);
    else {
      setEvents((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current || !hasMore || loading) return;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setFetchingMore(true);
      fetchEvents().finally(() => setFetchingMore(false));
    }
  };

  useEffect(() => {
    fetchEvents().finally(() => setLoading(false));
  }, []);

  const handleAddEvent = (event) => {
    setEvents((prev) => [event, ...prev]);
  };

  return (
    <div
      className="text-white h-full overflow-y-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {/* Story Section */}
      <div className="flex gap-4 overflow-x-auto p-4 bg-neutral-900">
        <button
          onClick={() => setModalOpen(true)}
          className="w-24 h-24 border border-gray-500 rounded-full bg-neutral-800 text-gray-400 flex items-center justify-center text-2xl"
        >
          +
        </button>
        {events.map((event, i) => (
          <div
            key={i}
            className="w-24 h-24 rounded-full overflow-hidden border border-gray-600"
          >
            {event.media ? (
              <img
                src={event.media}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
          </div>
        ))}
      </div>

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      <div className="p-4 space-y-6">
        {events.map((event, idx) => (
          <EventCard
            key={idx}
            title={event.title}
            date={timeAgo(event.createdAt)}
            location={event.department}
            description={event.caption}
            image={event.media}
            user={event.userId}
            isExpired={event.expired}
            deadline={event.deadLine}
            onRegister={() => alert(`Registered for ${event.title}`)}
          />
        ))}

        {loading &&
          Array(2)
            .fill(0)
            .map((_, i) => <EventCardLoader key={`loading-${i}`} />)}

        {fetchingMore && <EventCardLoader />}

        {!hasMore && (
          <div className="text-center mt-10">
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg text-black font-semibold">
              You're all caught up! Come back later 🎉
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventPage;
