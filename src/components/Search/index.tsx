import { SearchWrapper } from './Search.style';

interface SearchPropsType {
  onChangeSearchInput: (value: string) => void;
  onClickSearchButton: () => void;
}

const Search = ({
  onChangeSearchInput,
  onClickSearchButton,
}: SearchPropsType) => {
  return (
    <SearchWrapper>
      <div className="search-input-wrap">
        <input
          type="text"
          className="search-input"
          onChange={(e) => onChangeSearchInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onClickSearchButton();
          }}
        />
        <button
          type="button"
          className="search-button"
          onClick={onClickSearchButton}
        >
          찾기
        </button>
      </div>
    </SearchWrapper>
  );
};

export default Search;
