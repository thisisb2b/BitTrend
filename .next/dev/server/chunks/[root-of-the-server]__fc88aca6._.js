module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/topAlpha.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
async function handler(req, res) {
    const { timeframe = "24h", limit = 100 } = req.query;
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&price_change_percentage=24h,7d,30d&sparkline=true`);
        const data = await response.json();
        const timeframeKey = timeframe === "7d" ? "price_change_percentage_7d_in_currency" : timeframe === "30d" ? "price_change_percentage_30d_in_currency" : "price_change_percentage_24h";
        const topAlpha = data.filter((c)=>c[timeframeKey] !== null).sort((a, b)=>b[timeframeKey] - a[timeframeKey]).slice(0, Math.ceil(data.length * 0.05));
        res.status(200).json(topAlpha);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch crypto data"
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fc88aca6._.js.map