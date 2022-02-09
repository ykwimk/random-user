import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout';
import wrapper from '../src/redux/store/configureStore';
import '../src/styles/globals.css';
import 'react-virtualized/styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
