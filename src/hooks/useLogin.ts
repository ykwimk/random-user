import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/reducers/auth';
export default function useLogin() {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>('karn.yong@mecallapi.com');
  const [password, setPassword] = useState<string>('mecallapi');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'id') {
      setId(value);
      return;
    }
    setPassword(value);
  };

  const onClickLoginButton = useCallback(() => {
    dispatch(loginAction.request({ username: id, password }));
  }, [id, password, dispatch]);

  return {
    id,
    password,
    onChangeInput,
    onClickLoginButton,
  };
}
