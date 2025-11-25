export default function Filter({ timeframe, setTimeframe, limit, setLimit }) {
  const timeframes = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
  ];

  const limits = [
    { value: 50, label: "Top 50" },
    { value: 100, label: "Top 100" },
    { value: 200, label: "Top 200" },
  ];

  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {/* Timeframe Filter */}
      <div className="relative">
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 text-center">
          Timeframe
        </label>
        <div className="flex gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 dark:border-gray-700 shadow-lg">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                timeframe === tf.value
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transform scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Limit Filter */}
      <div className="relative">
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 text-center">
          Market Cap Range
        </label>
        <div className="flex gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 dark:border-gray-700 shadow-lg">
          {limits.map((lim) => (
            <button
              key={lim.value}
              onClick={() => setLimit(lim.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                limit === lim.value
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md transform scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {lim.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}