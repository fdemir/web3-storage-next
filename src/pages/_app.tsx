import "~/styles/global.scss";

import { AppProps } from "next/app";
import Head from "next/head";

import DefaultLayout from "~/components/layouts/Default";
import { SocketProvider } from "~/context/SocketContext";
import { LoggerProvider } from "~/context/LoggerContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="min-h-screen w-full bg-slate-100">
      <Head>
        <title>Web 3 Storage Example</title>
      </Head>

      <LoggerProvider>
        <SocketProvider>
          <DefaultLayout>
            {/* @ts-ignore - FIXME: */}
            <Component {...pageProps} />
          </DefaultLayout>
        </SocketProvider>
      </LoggerProvider>
    </div>
  );
};

export default App;
