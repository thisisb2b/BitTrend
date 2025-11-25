import { useState } from "react";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  
  // Ensure we always return an array
  if (!res.ok) {
    return [];
  }
  
  // Validate that data is an array
  if (!Array.isArray(data)) {
    return [];
  }
  
  return data;
};

export default function Home() {
  const [timeframe, setTimeframe] = useState("24h");
  const [limit, setLimit] = useState(100);

  const { data: cryptos, error } = useSWR(
    `/api/topAlpha?timeframe=${timeframe}&limit=${limit}`,
    fetcher,
    { refreshInterval: 600000 }
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center p-8 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/30">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!cryptos) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
        <Header />
        <main className="container mx-auto p-4 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Alpha Cryptos...</h2>
            <p className="text-gray-400">Fetching top performers from the market</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Ensure cryptos is an array before mapping
  const cryptosArray = Array.isArray(cryptos) ? cryptos : [];

  if (cryptosArray.length === 0 && !error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-yellow-500/10 backdrop-blur-sm rounded-2xl border border-yellow-500/30">
            <div className="text-yellow-400 text-4xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-white mb-2">No Data Available</h2>
            <p className="text-gray-400">Unable to fetch cryptocurrency data at this time</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Stats Banner */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-indigo-500/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Showing Top {cryptosArray.length} Alpha Cryptocurrencies
            </span>
          </div>
        </div>

        <Filter timeframe={timeframe} setTimeframe={setTimeframe} limit={limit} setLimit={setLimit} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cryptosArray.map((crypto, index) => (
            <div
              key={crypto?.id || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CryptoCard crypto={crypto} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}