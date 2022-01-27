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
  const { loginResponse, isLogin, signUpResponse } = useSelector(
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
    dispatch(logoutAction.request({}));
  };

  useEffect(() => {
    const { status } = loginResponse;
    if (status !== -1) {
      switch (status) {
        case 200: {
          setIsModal(false);
          break;
        }
        default:
          break;
      }
    }
  }, [loginResponse]);

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
