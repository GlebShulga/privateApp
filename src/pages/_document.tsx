import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="I am a skilled software developer with expertise in React and NodeJS. I offer software development services. Contact me to learn how I can help bring your software development project to life."
        />
        <link rel="icon" href="/assets/logo-light-bg.png" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GQNPXPY6NE"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-GQNPXPY6NE');
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
