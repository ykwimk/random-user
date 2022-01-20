import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../redux/reducers/auth';

export default function useSignUp() {
  const dispatch = useDispatch();
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

  return { onChangeInput, onClickSignUp };
}
