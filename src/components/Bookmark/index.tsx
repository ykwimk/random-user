import useBookmark from '../../hooks/useBookmark';
import List from '../List';
import { BookmarkWrapper } from './Bookmark.style';

const Bookmark = () => {
  const { bookmarkList, onClickListItem } = useBookmark();

  return (
    <BookmarkWrapper>
      <List list={bookmarkList} onClickListItem={onClickListItem} />
    </BookmarkWrapper>
  );
};

export default Bookmark;
