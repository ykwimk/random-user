import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getRandomUsersAction,
  RandomUserStateType,
} from '../redux/reducers/randomUser';

export default function useHome() {
  const dispatch = useDispatch();
  const { getRandomUserLoading, getRandomUserDone, getRandomUserResponse } =
    useSelector(
      ({ randomUser }: { randomUser: RandomUserStateType }) => randomUser,
      shallowEqual,
    );

  useEffect(() => {
    dispatch(getRandomUsersAction.request({ results: 10 }));
  }, [dispatch]);

  return {
    loading: getRandomUserLoading,
    done: getRandomUserDone,
    results: getRandomUserResponse.data.results,
  };
}
