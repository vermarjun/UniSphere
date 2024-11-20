import React, { useState } from "react";
import previousBtn from "/previous.png";
import nextBtn from "/next.png";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function prevSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }

  function nextSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div className="relative max-h-36">
      <div className="overflow-hidden relative border-b border-neutral-800 rounded-t-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="slide"
              className="min-w-full object-contain h-full max-w-36 max-h-36"
            />
          ))}
        </div>
      </div>
      <div className={`${slides.length === 1 ? "hidden" : "visible"}`}>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-1 -translate-y-1/2 text-white p-2"
        >
          <img src={previousBtn} alt="previous" className="h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-1 -translate-y-1/2 text-white p-2"
        >
          <img src={nextBtn} alt="next" className="h-6" />
        </button>
      </div>
    </div>
  );
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-900 rounded-lg p-6 w-4/5 max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-lg hover:text-gray-400"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const ItemCard = ({ data, onViewDetails }) => {
  return (
    <div className="max-w-sm border border-neutral-800 bg-neutral-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-neutral-800 transition-all duration-300">
      <Carousel slides={data.images} />
      <div className="px-4 py-3">
        <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
          <span className="text-xl font-semibold text-blue-500">
            ₹{data.cost}
          </span>
          <span className="text-neutral-400 text-sm">{data.date}</span>
        </div>
        <div className="mt-2 mb-4 h-12">
          <p className="text-neutral-300 text-sm line-clamp-2">
            {data.description}
          </p>
        </div>
        <button
          onClick={() => onViewDetails(data)}
          className="w-full bg-blue-600 text-white rounded-full py-2 text-sm hover:bg-blue-500 transition-all"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

const itemsData = [
  {
    images: [
      "https://www.clankart.com/user-uploads/advert/Civil_Engineering_and_GATE_Preparation_Books1717048147717.jpg",
    ],
    cost: "999",
    description:
      "GATE preparation study material, includes previous year question papers, handwritten notes",
    department: "BTECH",
    date: "Nov 18, 2024",
    contact: "9876543210",
  },
  {
    images: [
      "https://th.bing.com/th/id/OIP.MTC8gX0tslOT8CbpgJvb2wHaFj?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.bNO_UJWiTu6chdSUE_wWfwHaE8?rs=1&pid=ImgDetMain",
    ],
    cost: "2500",
    description: "2nd hand cycle everything working",
    department: "COMMERCE",
    date: "Yesterday",
    contact: "8765432109",
  },
  {
    images: ["https://i.ebayimg.com/images/g/UXMAAOSwrrplv7n6/s-l1600.jpg"],
    cost: "1500",
    description:
      "Arduino kit for learning purpose, includes ultrasonic sensor, battery and Arduino",
    department: "BSC",
    date: "Nov 18, 2024",
    contact: "9988776655",
  },
];

function Marketplace() {
  const [items, setItems] = useState(itemsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSell = () => {
    setIsSellModalOpen(true);
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      images: [formData.get("image")],
      cost: formData.get("cost"),
      description: formData.get("description"),
      department: formData.get("department"),
      date: "Just Now",
      contact: formData.get("contact"),
    };
    setItems((prevItems) => [newItem, ...prevItems]);
    setIsSellModalOpen(false);
  };

  return (
    <>
      <div className="text-white w-full h-full overflow-y-auto px-6 bg-neutral-950">
        <div className="h-full">
          <div className="h-20 flex justify-center items-center border-b-2 border-neutral-800 mb-6">
            <p className="text-4xl font-bold text-center text-blue-400">
              Campus Bazaar
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col items-center justify-center p-6 text-center hover:shadow-md hover:shadow-neutral-800 transition-all">
              <p className="text-xl font-semibold text-white mb-2">
                Want to see your stuff here?
              </p>
              <p className="text-sm text-neutral-400 mb-4">
                Make some extra cash by selling things in your community. Go On,
                it's easy!
              </p>
              <button
                onClick={handleSell}
                className="border border-blue-500 text-blue-500 rounded-full py-2 px-6 hover:bg-blue-500 hover:text-white transition-all"
              >
                Start Selling
              </button>
            </div>
            {items.map((data, index) => (
              <ItemCard
                data={data}
                key={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedItem && (
          <>
            <img
              src={selectedItem.images[0]}
              alt="Product"
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-2">
              {selectedItem.description}
            </h2>
            <p className="text-neutral-400 mb-1">Price: ₹{selectedItem.cost}</p>
            <p className="text-neutral-400 mb-1">
              Department: {selectedItem.department}
            </p>
            <p className="text-neutral-400 mb-1">Date: {selectedItem.date}</p>
            <p className="text-neutral-400">Contact: {selectedItem.contact}</p>
          </>
        )}
      </Modal>

      {/* Sell Item Modal */}
      <Modal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)}>
        <h2 className="text-xl font-semibold text-white mb-4">Sell Product</h2>
        <form onSubmit={handleSellSubmit}>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm text-neutral-400 mb-2"
            >
              Upload Image
            </label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder="Image URL"
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cost"
              className="block text-sm text-neutral-400 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              placeholder="Enter price"
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm text-neutral-400 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Enter product description"
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm text-neutral-400 mb-2"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter department (optional)"
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm text-neutral-400 mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="Enter contact number"
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-all"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Marketplace;
