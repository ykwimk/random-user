import { SearchWrapper } from './Search.style';

const Search = () => {
  return (
    <SearchWrapper>
      <div className="search-input-wrap">
        <input type="text" className="search-input" />
        <button type="button" className="search-button">
          찾기
        </button>
      </div>
    </SearchWrapper>
  );
};

export default Search;
