import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BitTrend - Top 5% Alpha Cryptocurrencies</title>
        <meta name="description" content="Track the top performing cryptocurrencies with BitTrend. Discover the top 5% alpha cryptocurrencies by price change." />
        <link rel="icon" href="/assets/logo.jpg" />
        <meta property="og:image" content="/assets/logo.jpg" />
        <meta property="og:title" content="BitTrend - Top 5% Alpha Cryptocurrencies" />
        <meta property="og:description" content="Track the top performing cryptocurrencies with BitTrend." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

