export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white">
                BitTrend
              </span>
            </h1>
            <p className="text-sm text-purple-100 font-medium">Top 5% Alpha Cryptocurrencies</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </header>
  );
}