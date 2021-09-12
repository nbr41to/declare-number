import '../styles/globals.css';

import type { AppProps /*, AppContext */ } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default MyApp;
