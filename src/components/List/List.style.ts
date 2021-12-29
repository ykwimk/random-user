import styled from '@emotion/styled';

export const ListWrapper = styled('div')`
  li {
    margin-bottom: 10px;
    padding: 15px;
    cursor: pointer;
    &:hover {
      background: #f6f6f6;
    }
  }
  .list-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .photo {
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
  }
  .content {
    .full-name {
      font-weight: bold;
      margin-bottom: 4px;
    }
    .cell,
    .email {
      font-size: 13px;
    }
  }
`;
