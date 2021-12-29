import { useRouter } from 'next/dist/client/router';
import { FaList } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { HeaderWrapper } from './Header.style';

const Header = () => {
  const router = useRouter();

  return (
    <HeaderWrapper router={router && router}>
      <div className="content">
        {router.pathname === '/bookmark' && (
          <button
            type="button"
            className="back-button"
            onClick={() => history.back()}
          >
            <BiArrowBack />
          </button>
        )}
        <button
          type="button"
          className="bookmark-button"
          onClick={() => router.push('/bookmark')}
        >
          <FaList />
        </button>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
