import _ from 'lodash';
import useBookmark from '../../hooks/useBookmark';
import List from '../List';
import { BookmarkWrapper } from './Bookmark.style';

const Bookmark = () => {
  const { bookmarkList, onClickListItem } = useBookmark();

  return (
    <BookmarkWrapper>
      {!_.isEmpty(bookmarkList) ? (
        <List list={bookmarkList} onClickListItem={onClickListItem} />
      ) : (
        <div>empty list!</div>
      )}
    </BookmarkWrapper>
  );
};

export default Bookmark;
