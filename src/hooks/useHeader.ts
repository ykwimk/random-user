import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  AuthStateType,
  logoutAction,
  signUpAction,
} from './../redux/reducers/auth';

export default function useHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginDone, loginResponse, isLogin, signUpResponse } = useSelector(
    ({ auth }: { auth: AuthStateType }) => auth,
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

  useEffect(() => {
    const { status, data } = signUpResponse;
    if (status !== -1) {
      switch (status) {
        case 201: {
          alert(data);
          setIsModal(false);
          break;
        }
        case 403: {
          alert(data);
          break;
        }
        default:
          break;
      }
    }
    dispatch(signUpAction.cancel({}));
  }, [signUpResponse, dispatch]);

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
