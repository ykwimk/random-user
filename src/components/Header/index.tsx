import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaList } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { HeaderWrapper } from './Header.style';
import Modal from '../Modal';
import Login from '../Login';

const Header = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);

  const onClickToggleLoginModal = () => {
    setIsModal(!isModal);
  };

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
