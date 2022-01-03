import useHome from '../../hooks/useHome';
import { HomeWrapper } from './Home.style';
import Search from '../Search';
import List from '../List';
import Loading from '../Loading';

const Home = () => {
  const { sentinel, isLoading, results, onClickListItem } = useHome();

  return (
    <HomeWrapper>
      <Search />
      <List list={results} onClickListItem={onClickListItem} />
      <div ref={sentinel as any}>{isLoading && <Loading />}</div>
    </HomeWrapper>
  );
};

export default Home;
