import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  addRandomUserBookmarkAction,
  deleteRandomUserBookmarkAction,
  getRandomUsersAction,
  RandomUserStateType,
} from './../redux/reducers/randomUser';

export default function useHome() {
  const dispatch = useDispatch();
  const { getRandomUserLoading, getRandomUserDone, getRandomUserResponse } =
    useSelector(
      ({ randomUser }: { randomUser: RandomUserStateType }) => randomUser,
      shallowEqual,
    );

  const onClickListItem = (phone: string, isBookmark?: boolean) => {
    if (isBookmark) {
      dispatch(deleteRandomUserBookmarkAction(phone));
      return;
    }
    dispatch(addRandomUserBookmarkAction(phone));
  };

  useEffect(() => {
    dispatch(getRandomUsersAction.request({ results: 10 }));
  }, []);

  return {
    loading: getRandomUserLoading,
    done: getRandomUserDone,
    results: getRandomUserResponse.data.results,
    onClickListItem,
  };
}
