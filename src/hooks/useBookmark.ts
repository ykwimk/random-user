import { shallowEqual, useSelector } from 'react-redux';
import { RandomUserStateType } from './../redux/reducers/randomUser';

export default function useBookmark() {
  const { bookmarkList } = useSelector(
    ({ randomUser }: { randomUser: RandomUserStateType }) => randomUser,
    shallowEqual,
  );

  const onClickListItem = (phone: string, isBookmark?: boolean) => {
    console.log(phone, isBookmark);
  };

  return {
    bookmarkList,
    onClickListItem,
  };
}