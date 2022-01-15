import styled from '@emotion/styled';
import { NextRouter } from 'next/router';

export const HeaderWrapper = styled.div<{ router: NextRouter }>`
  padding: 30px 0;
  .content {
    display: flex;
    ${(props) =>
      props.router?.pathname === '/bookmark'
        ? 'justify-content: space-between;'
        : 'justify-content: flex-end;'}
    align-items: center;
    .back-button {
      font-size: 27px;
      cursor: pointer;
    }
    .login-button {
      position: relative;
      line-height: 40px;
      font-size: 13px;
      cursor: pointer;
      margin-right: 10px;
      font-weight: 500;
    }
    .bookmark-button {
      width: 40px;
      height: 40px;
      font-size: 22px;
      cursor: pointer;
    }
    .right-buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
`;
