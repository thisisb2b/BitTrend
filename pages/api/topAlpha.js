export default async function handler(req, res) {
  const { timeframe = "24h", limit = 100 } = req.query;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&price_change_percentage=24h,7d,30d&sparkline=true`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    // Ensure data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format from API");
    }

    const timeframeKey =
      timeframe === "7d"
        ? "price_change_percentage_7d_in_currency"
        : timeframe === "30d"
        ? "price_change_percentage_30d_in_currency"
        : "price_change_percentage_24h";

    const topAlpha = data
      .filter(c => c && c[timeframeKey] !== null && c[timeframeKey] !== undefined)
      .sort((a, b) => b[timeframeKey] - a[timeframeKey])
      .slice(0, Math.ceil(data.length * 0.05));

    // Always return an array, even if empty
    res.status(200).json(Array.isArray(topAlpha) ? topAlpha : []);
  } catch (error) {
    console.error("API Error:", error);
    // Return empty array instead of error object to prevent .map() errors
    res.status(500).json([]);
  }
}