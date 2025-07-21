import leaderBoard from "/leaderboard.png";
import fire from "/fire.png";
import logo from "/logo.png";

function Navbar() {
  return (
    <div className="w-full bg-gray-900 text-white px-4 py-3 flex items-center justify-between gap-4 sm:gap-8 shadow-md">
      {/* Logo (optional) */}
      <div className="hidden sm:block">
        <img src={logo} alt="Logo" className="h-9" />
      </div>

      {/* Search Input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-96 px-4 py-2 rounded-full bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <img src={fire} alt="Fire" className="h-7 sm:h-9 cursor-pointer" />
        <img
          src={leaderBoard}
          alt="Leaderboard"
          className="h-7 sm:h-9 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Navbar;
