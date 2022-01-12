import { FaList } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { HeaderWrapper } from './Header.style';
import Modal from '../Modal';
import Login from '../Login';
import useHeader from '../../hooks/useHeader';

const Header = () => {
  const { router, isModal, onClickToggleLoginModal } = useHeader();

  return (
    <>
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
            className="login-button"
            onClick={onClickToggleLoginModal}
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
      </HeaderWrapper>
      {isModal && (
        <Modal onClickClose={onClickToggleLoginModal}>
          <Login />
        </Modal>
      )}
    </>
  );
};

export default Header;
