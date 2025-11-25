import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

export default function CryptoCard({ crypto }) {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  const priceChangeClass = isPositive ? "text-emerald-400" : "text-red-400";
  const bgGradient = isPositive 
    ? "from-emerald-500/10 to-teal-500/10" 
    : "from-red-500/10 to-orange-500/10";
  const borderColor = isPositive ? "border-emerald-500/30" : "border-red-500/30";

  return (
    <div className={`group relative p-6 rounded-2xl bg-gradient-to-br ${bgGradient} backdrop-blur-sm border ${borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Header with logo and name */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={crypto.image} 
                alt={crypto.name} 
                className="w-12 h-12 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {crypto.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                {crypto.symbol}
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
            ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </p>
        </div>

        {/* Price change with icon */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
            <svg 
              className={`w-4 h-4 ${priceChangeClass}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isPositive ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              )}
            </svg>
            <span className={`${priceChangeClass} font-bold text-sm`}>
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">24h</span>
        </div>

        {/* Sparkline Chart - Enhanced */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              7-Day Trend
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {crypto.price_change_percentage_7d_in_currency !== null && crypto.price_change_percentage_7d_in_currency !== undefined ? 
                `${crypto.price_change_percentage_7d_in_currency >= 0 ? '+' : ''}${crypto.price_change_percentage_7d_in_currency.toFixed(2)}%` 
                : 'N/A'}
            </span>
          </div>
          <div className="relative bg-black/5 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all">
            {crypto.sparkline_in_7d?.price && Array.isArray(crypto.sparkline_in_7d.price) && crypto.sparkline_in_7d.price.length > 0 ? (
              <div className="h-20 w-full" style={{ minHeight: '80px', position: 'relative' }}>
                <Sparklines 
                  data={crypto.sparkline_in_7d.price.filter(price => price !== null && price !== undefined && !isNaN(price))} 
                  svgWidth={300} 
                  svgHeight={80}
                  margin={2}
                >
                  <defs>
                    <linearGradient id={`gradient-${crypto.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.4" />
                      <stop offset="50%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
                    </linearGradient>
                    <filter id={`glow-${crypto.id}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <SparklinesLine
                    color={isPositive ? "#10b981" : "#ef4444"}
                    style={{ 
                      strokeWidth: 3, 
                      fill: `url(#gradient-${crypto.id})`,
                      filter: `url(#glow-${crypto.id})`
                    }}
                  />
                  <SparklinesSpots
                    size={4}
                    style={{ 
                      fill: isPositive ? "#10b981" : "#ef4444", 
                      strokeWidth: 2, 
                      stroke: "#fff",
                      filter: `url(#glow-${crypto.id})`
                    }}
                  />
                </Sparklines>
              </div>
            ) : (
              <div className="h-20 w-full flex items-center justify-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">Chart data unavailable</p>
              </div>
            )}
            {/* Chart overlay info */}
            {crypto.sparkline_in_7d?.price && Array.isArray(crypto.sparkline_in_7d.price) && crypto.sparkline_in_7d.price.length > 0 && (
              <div className="absolute bottom-2 right-2 flex gap-2">
                <div className={`px-2 py-1 rounded-md text-xs font-bold ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isPositive ? '↗' : '↘'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );
}