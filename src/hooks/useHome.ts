import { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import _, { debounce } from 'lodash';
import {
  addRandomUserBookmarkAction,
  deleteRandomUserBookmarkAction,
  getRandomUsersAction,
  RandomUserStateType,
  searchRandomUserAction,
} from './../redux/reducers/randomUser';

export default function useHome() {
  const [sentinel, setSentinel] = useState<HTMLDivElement>();
  const dispatch = useDispatch();
  const {
    getRandomUserLoading: isLoading,
    getRandomUserDone: done,
    getRandomUserResponse: response,
    searchList,
  } = useSelector(
    ({ randomUser }: { randomUser: RandomUserStateType }) => randomUser,
    shallowEqual,
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const resultsList = useMemo(() => {
    return response.data.results;
  }, [response]);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  const onClickSearchButton = debounce(
    useCallback(() => {
      dispatch(searchRandomUserAction(searchValue));
    }, [searchValue, dispatch]),
    500,
  );

  const onClickListItem = (phone: string, isBookmark?: boolean) => {
    if (isBookmark) {
      dispatch(deleteRandomUserBookmarkAction(phone));
      return;
    }
    dispatch(addRandomUserBookmarkAction(phone));
  };

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    let observer: IntersectionObserver;
    console.log(sentinel);
    if (sentinel && !_.isEmpty(resultsList)) {
      observer = new IntersectionObserver(([entries]) => {
        if (!isLoading && entries.isIntersecting) {
          // setPage(page + 1);
          console.log('bottom');
          console.log(entries);
          observer.unobserve(sentinel);
        }
      }, options);
      observer.observe(sentinel);
    }
    return () => observer && observer.disconnect();
  }, [sentinel, isLoading, resultsList, dispatch]);

  useEffect(() => {
    dispatch(getRandomUsersAction.request({ results: 10, page }));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(getRandomUsersAction.cancel({}));
    };
  }, [dispatch]);

  return {
    sentinel,
    isLoading,
    done,
    results: resultsList,
    searchList,
    setSentinel,
    onChangeSearchInput,
    onClickSearchButton,
    onClickListItem,
  };
}
