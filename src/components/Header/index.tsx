import { FaList } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { HeaderWrapper } from './Header.style';
import useHeader from '../../hooks/useHeader';
import Modal from '../Modal';
import Login from '../Login';
import SignUp from '../SignUp';

const Header = () => {
  const {
    router,
    isModal,
    isLogin,
    modalType,
    onClickSetModalType,
    onClickCloseModal,
    onClickLogout,
  } = useHeader();

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
          <div className="right-buttons">
            {isLogin ? (
              <>
                <button
                  type="button"
                  className="login-button"
                  onClick={onClickLogout}
                >
                  로그아웃
                </button>
                <button
                  type="button"
                  className="bookmark-button"
                  onClick={() => router.push('/bookmark')}
                >
                  <FaList />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="login-button"
                  onClick={() => onClickSetModalType('LOGIN')}
                >
                  로그인
                </button>
                <button
                  type="button"
                  className="login-button"
                  onClick={() => onClickSetModalType('SIGN_UP')}
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </HeaderWrapper>
      {isModal && (
        <Modal onClickClose={onClickCloseModal}>
          {modalType === 'LOGIN' ? <Login /> : <SignUp />}
        </Modal>
      )}
    </>
  );
};

export default Header;
