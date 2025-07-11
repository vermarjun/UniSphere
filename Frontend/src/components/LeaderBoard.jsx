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
    <div className="w-full bg-gray-900 text-white rounded-xl shadow-md p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center sm:text-left">
        Leaderboard
      </h2>

      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-800 text-sm text-blue-400">
            <th className="px-4 py-2 text-left">Participant</th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              Institute
            </th>
            <th className="px-4 py-2 text-left">#Rank</th>
            <th className="px-4 py-2 text-left">Points</th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              Certificates
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((participant, index) => (
            <tr
              key={index}
              className="bg-gray-800 hover:bg-gray-700 transition-all rounded-lg text-sm text-gray-300"
            >
              <td className="px-4 py-2">{participant.name}</td>
              <td className="px-4 py-2 hidden sm:table-cell">
                {participant.institute}
              </td>
              <td className="px-4 py-2">#{participant.rank}</td>
              <td className="px-4 py-2">{participant.points}</td>
              <td className="px-4 py-2 hidden sm:table-cell">
                {participant.certificates}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Summary Section (Optional) */}
      <div className="sm:hidden mt-6 space-y-4">
        {leaderboardData.map((user, idx) => (
          <div key={idx} className="bg-gray-800 p-3 rounded-lg">
            <h3 className="font-semibold text-blue-300">{user.name}</h3>
            <p className="text-sm">Rank: #{user.rank}</p>
            <p className="text-sm">Points: {user.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
