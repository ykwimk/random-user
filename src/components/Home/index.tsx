import useHome from '../../hooks/useHome';
import { HomeWrapper } from './Home.style';
import Search from '../Search';
import List from '../List';

const Home = () => {
  const { sentinel, loading, results, onClickListItem } = useHome();

  return (
    <HomeWrapper>
      <Search />
      <List list={results} onClickListItem={onClickListItem} />
      <div ref={sentinel as any}>{loading && 'loading...'}</div>
    </HomeWrapper>
  );
};

export default Home;
