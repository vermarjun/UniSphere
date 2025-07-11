// Optimized and responsive Home page (preserves structure and theme)
import { useEffect, useState, useRef } from "react";
import previousBtn from "/previous.png";
import nextBtn from "/next.png";
import like from "/like.png";
import comment from "/comment.png";
import axios from "axios";
import { API_URL, timeAgo } from "../App";

function Carousel({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  const nextSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );

  if (!slides.length) return null;

  return (
    <div className="relative max-h-80">
      <div className="overflow-hidden relative border-b border-neutral-800">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="slide"
              className="min-w-full object-contain h-full max-w-96 max-h-80"
            />
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-1 -translate-y-1/2 p-2"
          >
            <img src={previousBtn} alt="prev" className="h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-1 -translate-y-1/2 p-2"
          >
            <img src={nextBtn} alt="next" className="h-6" />
          </button>
          <div className="absolute bottom-3 w-full flex justify-center space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-gray-300" : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Post({ slides, authorName, authorUsername, createdAt, caption }) {
  return (
    <div className="max-w-lg w-full mx-auto border border-neutral-700 rounded-lg shadow-md mb-5">
      <div className="flex items-center p-4 border-b border-neutral-700">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4 flex justify-between items-center w-full">
          <div>
            <h3 className="font-semibold text-sm sm:text-base">{authorName}</h3>
            <p className="text-xs text-gray-400">{authorUsername}</p>
          </div>
          <p className="text-xs text-gray-400">{timeAgo(createdAt)}</p>
        </div>
      </div>
      <Carousel slides={slides} />
      <div className="p-4">
        <p className="text-sm text-wrap break-words">{caption}</p>
        <div className="flex gap-4 mt-4 items-center">
          <button className="hover:text-red-500">
            <img src={like} alt="like" className="h-6" />
          </button>
          <button className="hover:text-blue-500">
            <img src={comment} alt="comment" className="h-6" />
          </button>
          <input
            type="text"
            placeholder="Comment"
            className="flex-1 p-2 bg-neutral-900 rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
}

function PostLoadingScreen() {
  return (
    <div className="max-w-lg w-full mx-auto border border-neutral-700 rounded-lg shadow-md animate-pulse mb-5">
      <div className="flex items-center p-4 border-b border-neutral-700">
        <div className="w-12 h-12 rounded-full bg-neutral-800" />
        <div className="ml-4 w-full">
          <div className="h-4 bg-neutral-800 w-3/4 rounded-lg mb-1" />
          <div className="h-3 bg-neutral-800 w-1/2 rounded-full" />
        </div>
      </div>
      <div className="w-full h-48 bg-neutral-800" />
      <div className="m-4 h-4 bg-neutral-800 rounded-lg" />
    </div>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const divRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/v1/post`, {
        params: { page, limit: 10 },
      });
      const newPosts = res.data.message;
      if (!newPosts.length) return setHasMore(false);
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((p) => p + 1);
    } catch (err) {
      console.error("Home fetch error:", err);
    }
  };

  useEffect(() => {
    setPosts([]);
    fetchData();
  }, []);

  const handleScroll = () => {
    if (!hasMore || loading || fetchingMore) return;
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setFetchingMore(true);
      fetchData().finally(() => setFetchingMore(false));
    }
  };

  return (
    <div
      ref={divRef}
      onScroll={handleScroll}
      className="text-white h-full w-full overflow-auto px-2 sm:px-0 sm:flex sm:justify-center"
    >
      <div className="w-full sm:max-w-xl mt-5 space-y-5">
        {posts.map((data, idx) => (
          <Post
            key={idx}
            slides={data.media}
            authorName={data.userId}
            authorUsername={data.userId}
            createdAt={data.createdAt}
            caption={data.caption}
          />
        ))}

        {(loading || posts.length === 0) &&
          [1, 2].map((_, i) => <PostLoadingScreen key={i} />)}
        {fetchingMore && <PostLoadingScreen />}

        {!hasMore && (
          <div className="w-full p-4 text-center bg-gradient-to-r from-teal-400 to-blue-500 text-black rounded-lg">
            You’re all caught up! Come back later!
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
