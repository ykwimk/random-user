import { ResultsType } from '../../api/randomUser';
import { ListWrapper } from './List.style';

interface ListPropsType {
  results: ResultsType[];
}

const List = ({ results }: ListPropsType) => {
  return (
    <ListWrapper>
      <ul>
        {results &&
          results.map((result) => {
            const { cell, name, phone, email, picture } = result;
            const fullName = `${name.title}. ${name.first} ${name.last}`;
            return (
              <li key={phone}>
                <div className="list-item">
                  <div className="photo">
                    <img src={picture.thumbnail} alt={fullName} />
                  </div>
                  <div className="content">
                    <div className="full-name">{fullName}</div>
                    <div className="cell">{cell}</div>
                    <div className="email">{email}</div>
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
