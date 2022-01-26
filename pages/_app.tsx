import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../src/components/Layout';
import wrapper from '../src/redux/store/configureStore';
import { loadUserAction } from '../src/redux/reducers/auth';
import '../src/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction.request({}));
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
