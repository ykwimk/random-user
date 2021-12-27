import useHeader from '../hooks/useHeader';
import { HeaderWrapper } from './Header.style';

const Header = () => {
  useHeader();

  return (
    <HeaderWrapper>
      <div className="search-input-wrap">
        <input type="text" className="search-input" />
        <button type="button" className="search-button">
          찾기
        </button>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
