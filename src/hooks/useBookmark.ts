import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  deleteRandomUserBookmarkAction,
  RandomUserStateType,
} from './../redux/reducers/randomUser';

export default function useBookmark() {
  const dispatch = useDispatch();
  const { bookmarkList } = useSelector(
    ({ randomUser }: { randomUser: RandomUserStateType }) => randomUser,
    shallowEqual,
  );

  const onClickListItem = (phone: string) => {
    dispatch(deleteRandomUserBookmarkAction(phone));
  };

  return {
    bookmarkList,
    onClickListItem,
  };
}
