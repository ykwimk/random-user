import { useRouter } from 'next/dist/client/router';
import { FaList } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { HeaderWrapper } from './Header.style';
import Modal from '../Modal';
import Login from '../Login';

const Header = () => {
  const router = useRouter();

  const onClickClose = () => {
    console.log('close');
  };

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
          onClick={() => console.log('로그인')}
        >
          로그인
        </button>
        <button
          type="button"
          className="bookmark-button"
          onClick={() => router.push('/bookmark')}
        >
          <FaList />
        </button>
      </div>
      <Modal onClickClose={onClickClose}>
        <Login />
      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
