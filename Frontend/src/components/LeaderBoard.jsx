import React from "react";

const leaderboardData = [
  {
    name: "Nabil Akhtar",
    institute: "Symbiosis Institute",
    rank: 4,
    points: 231443,
    certificates: 273,
  },
  {
    name: "Akash Patel",
    institute: "Shailesh J. Mehta School",
    rank: 5,
    points: 219309,
    certificates: 232,
  },
  {
    name: "Marc Fernandes",
    institute: "IIT Bombay",
    rank: 6,
    points: 215800,
    certificates: 220,
  },
];

export default function Leaderboard() {
  return (
    <div className="w-full bg-gray-900 text-white rounded-xl shadow-lg p-6 sm:p-8 overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center sm:text-left">
        Leaderboard
      </h2>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-blue-400">
              <th className="px-4 py-3 text-left">Participant</th>
              <th className="px-4 py-3 text-left">Institute</th>
              <th className="px-4 py-3 text-left">#Rank</th>
              <th className="px-4 py-3 text-left">Points</th>
              <th className="px-4 py-3 text-left">Certificates</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((participant, index) => (
              <tr
                key={index}
                className="bg-gray-800 hover:bg-gray-700 transition-all border-b border-gray-700"
              >
                <td className="px-4 py-3 font-medium">{participant.name}</td>
                <td className="px-4 py-3">{participant.institute}</td>
                <td className="px-4 py-3">#{participant.rank}</td>
                <td className="px-4 py-3">{participant.points}</td>
                <td className="px-4 py-3">{participant.certificates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {leaderboardData.map((user, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-blue-300 mb-1">
              {user.name}
            </h3>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium">Institute:</span> {user.institute}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium">Rank:</span> #{user.rank}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium">Points:</span> {user.points}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium">Certificates:</span>{" "}
              {user.certificates}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
