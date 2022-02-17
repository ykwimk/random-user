import useHome from '../../hooks/useHome';
import { HomeWrapper } from './Home.style';
import Search from '../Search';
import List from '../List';

const Home = () => {
  const {
    sentinel,
    isLoading,
    results,
    searchList,
    setSentinel,
    onChangeSearchInput,
    onClickSearchButton,
    onClickListItem,
  } = useHome();

  return (
    <HomeWrapper>
      <Search
        onChangeSearchInput={onChangeSearchInput}
        onClickSearchButton={onClickSearchButton}
      />
      <List
        isLoading={isLoading}
        sentinel={sentinel}
        setSentinel={setSentinel}
        list={searchList.length > 0 ? searchList : results}
        onClickListItem={onClickListItem}
      />
    </HomeWrapper>
  );
};

export default Home;
