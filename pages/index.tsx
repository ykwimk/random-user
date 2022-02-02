import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';
import Home from '../src/components/Home';
import { loadUserAction } from '../src/redux/reducers/auth';
import wrapper from '../src/redux/store/configureStore';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    store.dispatch(loadUserAction.request({}));
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
    };
  });

const HomePage = () => {
  return <Home />;
};

export default HomePage;
