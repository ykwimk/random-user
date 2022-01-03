import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { ResultsType } from '../../api/randomUser';
import { ListWrapper } from './List.style';

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
              <li key={id}>
                <div
                  className="list-item"
                  onClick={() => onClickListItem(phone, isBookmark)}
                >
                  <div className="photo">
                    <img src={picture.thumbnail} alt={fullName} />
                  </div>
                  <div className="content">
                    <div className="information">
                      <div className="full-name">{fullName}</div>
                      <div className="cell">{cell}</div>
                      <div className="email">{email}</div>
                    </div>
                    <div className="icon">
                      {isBookmark ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </ListWrapper>
  );
};

export default List;
