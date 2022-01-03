import { useEffect, useRef, useState } from 'react';
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
  const {
    getRandomUserLoading: isLoading,
    getRandomUserDone: done,
    getRandomUserResponse: response,
  } = useSelector(
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

  useEffect(() => {
    dispatch(getRandomUsersAction.request({ results: 10, page }));
  }, [dispatch, page]);

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entries]) => {
      if (!isLoading && entries.isIntersecting) {
        setPage(page + 1);
      }
    }, options);

    if (sentinel.current && response.data.results) {
      observer.observe(sentinel.current);
    }
    return () => observer && observer.disconnect();
  }, [sentinel, page, isLoading, response.data.results]);

  useEffect(() => {
    return () => {
      dispatch(getRandomUsersAction.cancel({}));
    };
  }, [dispatch]);

  return {
    sentinel,
    isLoading,
    done,
    results: response.data.results,
    onClickListItem,
  };
}
