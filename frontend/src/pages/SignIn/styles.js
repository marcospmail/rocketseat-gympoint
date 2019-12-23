import styled from 'styled-components';

import { validationErrorSpan, actionButton } from '~/styles/util';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 448px;
  text-align: center;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      text-align: left;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
    }
    input {
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      margin: 8px 0 0;
      border: 1px solid #dddddd;

      & + strong {
        margin-top: 20px;
      }

      &::placeholder {
        font-size: 16px;
        color: #999999;
      }
    }

    span {
      ${validationErrorSpan}
    }

    button {
      margin: 15px 0 0;
      height: 45px;
      ${actionButton}

      &:disabled {
        background-color: #ddd;
        cursor: default;
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 100px;
  }

  span {
    margin-top: 12px;
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
    color: #ee4d64;
  }
`;
