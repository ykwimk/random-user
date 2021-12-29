import styled from '@emotion/styled';

export const SearchWrapper = styled('div')`
  .search-input-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .search-input {
      height: 40px;
      border-radius: 5px 0 0 5px;
      font-size: 14px;
      font-family: 'Pretendard';
      border: 1px solid #000;
      padding: 0 10px;
    }
    .search-button {
      display: block;
      width: 60px;
      background: #000000;
      color: #ffffff;
      line-height: 40px;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
    }
  }
`;
