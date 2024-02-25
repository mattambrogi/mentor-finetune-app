import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/icon.png" type="image/png+xml" />
        <meta property="og:title" content="Mentor Finetune" key="title" />
        <meta
          property="og:description"
          content="made by mattambrogi"
          key="description"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
