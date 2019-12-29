import styled from 'styled-components';

export const MPaginator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0 10px;
    font-weight: bold;
  }

  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: #fff;
    font-weight: bold;
    color: #ee4d64;
    font-size: 16px;
    transition: background 0.2s;

    &:disabled {
      color: #ddd;
      cursor: default;
    }

    &:not(:disabled):hover {
      background: #e8e8e8;
    }
  }
`;
