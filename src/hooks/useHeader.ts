import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LoginStateType } from './../redux/reducers/auth';

export default function useHeader() {
  const router = useRouter();
  const { loginDone, loginResponse } = useSelector(
    ({ auth }: { auth: LoginStateType }) => auth,
  );
  const [isModal, setIsModal] = useState<boolean>(false);

  const onClickToggleLoginModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    const { status } = loginResponse.data;
    if (loginDone) {
      switch (status) {
        case 'ok': {
          alert('로그인 성공!');
          setIsModal(false);
          break;
        }
        default:
          alert('로그인 실패');
          break;
      }
    }
  }, [loginDone, loginResponse]);

  return {
    router,
    isModal,
    onClickToggleLoginModal,
  };
}
