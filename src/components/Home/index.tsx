import { HomeWrapper } from './Home.style';
import useHome from '../../hooks/useHome';
import Search from '../Search';
import List from '../List';

const Home = () => {
  const { loading, done, results } = useHome();

  return (
    <HomeWrapper>
      <Search />
      <List results={results} />
    </HomeWrapper>
  );
};

export default Home;
