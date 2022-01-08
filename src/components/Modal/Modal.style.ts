import styled from '@emotion/styled';

export const ModalWrapper = styled('div')`
  position: relative;
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
  }
  .modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -200px;
    width: 400px;
    height: 400px;
    background: #fff;
    border-radius: 14px;
    z-index: 10;
    padding: 15px;
  }
  .modal-header {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 15px;
  }
  .modal-close-button {
    width: 26px;
    height: 26px;
    font-size: 26px;
    cursor: pointer;
  }
  .modal-contents {
    p {
      text-align: center;
      font-size: 16px;
    }
  }
`;
