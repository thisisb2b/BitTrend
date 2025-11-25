export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 text-center p-6 mt-auto border-t border-gray-700/50">
      <div className="container mx-auto">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 font-bold">BitTrend</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">Free crypto alpha insights • Real-time market data</p>
        <div className="flex justify-center gap-2 mt-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>
    </footer>
  );
}