import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const PageTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  strong {
    font-size: 24px;
  }

  div {
    display: flex;

    button {
      width: 112px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        background-color: #cccccc;
        margin-right: 15px;
      }

      &:last-child {
        background-color: #ee4d64;
      }

      span {
        margin-left: 5px;
      }
    }
  }
`;

export const Data = styled(Form)`
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    margin-top: 20px;

    &:first-child {
      margin-top: 0px;
    }
  }

  input {
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-top: 8px;
    padding: 20px;

    & + span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      margin-top: 3px;
    }
  }

  table {
    margin-top: 20px;

    th {
      text-align: left;
    }

    td {
      padding-right: 15px;

      &:last-child {
        padding-right: 0;
      }

      input {
        width: 100%;
      }
    }
  }
`;
