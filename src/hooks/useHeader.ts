import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LoginStateType, logoutAction } from './../redux/reducers/auth';

export default function useHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginDone, loginResponse, isLogin } = useSelector(
    ({ auth }: { auth: LoginStateType }) => auth,
  );
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const onClickSetModalType = (modalType: string) => {
    setIsModal(true);
    setModalType(modalType);
  };

  const onClickCloseModal = () => {
    setIsModal(false);
  };

  const onClickLogout = () => {
    dispatch(logoutAction({}));
  };

  useEffect(() => {
    if (isLogin && loginDone) {
      const { status } = loginResponse.data;
      switch (status) {
        case 'ok': {
          setIsModal(false);
          break;
        }
        default:
          alert('로그인 실패');
          break;
      }
    }
  }, [loginDone, loginResponse, isLogin]);

  return {
    router,
    isModal,
    isLogin,
    modalType,
    onClickSetModalType,
    onClickCloseModal,
    onClickLogout,
  };
}
