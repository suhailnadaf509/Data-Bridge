import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app"; // Import AppProps

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} /> {/* Ensure Component is rendered here */}
    </SessionProvider>
  );
}
