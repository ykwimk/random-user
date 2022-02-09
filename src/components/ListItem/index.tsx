import React from 'react';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { PictureType } from '../../api/randomUser';
import { ListItemWrapper } from './ListItem.style';

interface ListItemPropsType {
  phone: string;
  picture: PictureType;
  fullName: string;
  cell: string;
  email: string;
  isBookmark?: boolean;
  style?: React.CSSProperties;
  onClickListItem: (phone: string, isBookmark?: boolean) => void;
}

const ListItem = ({
  phone,
  picture,
  fullName,
  cell,
  email,
  isBookmark,
  onClickListItem,
}: ListItemPropsType) => {
  return (
    <ListItemWrapper>
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
    </ListItemWrapper>
  );
};

export default ListItem;
