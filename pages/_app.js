import Head from "next/head";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mentor Finetune</title>
        <link rel="icon" href="/icon.png" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default App;
