import { loadUserAction } from './../redux/reducers/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const sentinel = useRef<HTMLDivElement>();
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
    dispatch(getRandomUsersAction.request({ results: 10, page }));
  }, [dispatch, page]);

  // useEffect(() => {
  //   const options = {
  //     rootMargin: '0px',
  //     threshold: 1.0,
  //   };
  //   let observer: IntersectionObserver;
  //   if (sentinel.current && response.data.results && _.isEmpty(searchList)) {
  //     observer = new IntersectionObserver(([entries]) => {
  //       if (!isLoading && entries.isIntersecting) {
  //         setPage(page + 1);
  //       }
  //     }, options);
  //     observer.observe(sentinel.current);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [sentinel, page, isLoading, response.data.results, searchList]);

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
    searchList,
    onChangeSearchInput,
    onClickSearchButton,
    onClickListItem,
  };
}
