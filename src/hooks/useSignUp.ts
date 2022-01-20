import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

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
    console.log(userId);
    console.log(password);
    console.log(nickName);
  }, [userId, password, nickName]);

  return { onChangeInput, onClickSignUp };
}
