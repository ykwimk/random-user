import { HomeWrapper } from './Home.style';
import useHome from '../../hooks/useHome';
import Search from '../Search';
import List from '../List';

const Home = () => {
  const { loading, done, results, onClickListItem } = useHome();

  return (
    <HomeWrapper>
      <Search />
      <List list={results} onClickListItem={onClickListItem} />
    </HomeWrapper>
  );
};

export default Home;
