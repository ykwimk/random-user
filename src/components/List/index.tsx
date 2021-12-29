import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { ResultsType } from '../../api/randomUser';
import { ListWrapper } from './List.style';

interface ListPropsType {
  results: ResultsType[];
  onClickListItem: (phone: string, isBookmark?: boolean) => void;
}

const List = ({ results, onClickListItem }: ListPropsType) => {
  return (
    <ListWrapper>
      <ul>
        {results &&
          results.map((result) => {
            const { cell, name, phone, email, picture, isBookmark } = result;
            const fullName = `${name.title}. ${name.first} ${name.last}`;
            return (
              <li key={phone}>
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
