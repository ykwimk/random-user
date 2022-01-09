import styled from '@emotion/styled';

export const LoginWrapper = styled('div')`
  .login-title {
    text-align: center;
    font-size: 21px;
  }
  .input-box {
    margin-bottom: 8px;
    .input {
      width: 100%;
      height: 44px;
      padding: 12px;
      border: 1px solid #222;
      box-sizing: border-box;
      font-size: 14px;
    }
  }
  .login-button {
    width: 100%;
    line-height: 46px;
    height: 46px;
    background: #333;
    cursor: pointer;
    margin-top: 10px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
  }
`;
