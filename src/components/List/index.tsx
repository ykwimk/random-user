import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { ResultsType } from '../../api/randomUser';
import { ListWrapper } from './List.style';
import ListItem from '../ListItem';

interface ListPropsType {
  list: ResultsType[];
  onClickListItem: (phone: string, isBookmark?: boolean) => void;
}

const List = ({ list, onClickListItem }: ListPropsType) => {
  return (
    <ListWrapper>
      <ul>
        {list &&
          list.map((item) => {
            const { cell, name, phone, email, picture, isBookmark } = item;
            const fullName = `${name.title}. ${name.first} ${name.last}`;
            const id = nanoid();
            return (
              <ListItem
                key={id}
                phone={phone}
                picture={picture}
                fullName={fullName}
                cell={cell}
                email={email}
                isBookmark={isBookmark}
                onClickListItem={onClickListItem}
              />
            );
          })}
      </ul>
    </ListWrapper>
  );
};

export default List;
