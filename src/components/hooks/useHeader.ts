import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomUsersAction } from '../../redux/reducers/randomUser';

export default function useHeader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomUsersAction.request({ results: 10 }));
  }, [dispatch]);

  return {};
}
