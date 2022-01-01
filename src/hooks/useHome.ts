import { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  addRandomUserBookmarkAction,
  deleteRandomUserBookmarkAction,
  getRandomUsersAction,
  RandomUserStateType,
} from './../redux/reducers/randomUser';

export default function useHome() {
  const sentinel = useRef<HTMLDivElement>();
  const dispatch = useDispatch();
  const { getRandomUserLoading, getRandomUserDone, getRandomUserResponse } =
    useSelector(
      ({ randomUser }: { randomUser: RandomUserStateType }) => randomUser,
      shallowEqual,
    );

  const [page, setPage] = useState<number>(1);

  const onClickListItem = (phone: string, isBookmark?: boolean) => {
    if (isBookmark) {
      dispatch(deleteRandomUserBookmarkAction(phone));
      return;
    }
    dispatch(addRandomUserBookmarkAction(phone));
  };

  const loadMore = useCallback(() => {
    console.log('loadmore');
    dispatch(getRandomUsersAction.request({ results: 10, page }));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(getRandomUsersAction.request({ results: 10, page: 1 }));
  }, []);

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting) {
        console.log('bottom');
      }
    }, options);

    if (sentinel.current) {
      observer.observe(sentinel.current);
    }
    return () => observer && observer.disconnect();
  }, [sentinel, loadMore]);

  return {
    sentinel,
    loading: getRandomUserLoading,
    done: getRandomUserDone,
    results: getRandomUserResponse.data.results,
    onClickListItem,
  };
}
