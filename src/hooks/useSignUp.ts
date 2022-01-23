import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AuthStateType, signUpAction } from '../redux/reducers/auth';

export default function useSignUp() {
  const dispatch = useDispatch();
  const { signUpResponse } = useSelector(
    ({ auth }: { auth: AuthStateType }) => auth,
    shallowEqual,
  );
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');

  const onChangeInput = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    if (name === 'userId') setUserId(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'nickName') setNickName(value);
  };

  const onClickSignUp = useCallback(() => {
    dispatch(signUpAction.request({ userId, password, nickName }));
  }, [userId, password, nickName, dispatch]);

  useEffect(() => {
    const { status, data } = signUpResponse;
    if (status !== -1) {
      switch (status) {
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

  return { onChangeInput, onClickSignUp };
}
