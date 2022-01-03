import styled from '@emotion/styled';

export const LoadingWrapper = styled('div')`
  width: 38px;
  height: 38px;
  margin: 0 auto;
  padding: 3px;
  font-size: 32px;
  animation: rotation 1s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
