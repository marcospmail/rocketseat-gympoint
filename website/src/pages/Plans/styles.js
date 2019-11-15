import styled from 'styled-components';

import { actionButton } from '~/styles/util';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;

  strong {
    flex: 1;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    ${actionButton}
    width: 142px;
    height: 36px;

    span {
      margin-left: 5px;
    }
  }
`;

export const Data = styled.table`
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  thead th {
    text-align: left;
    color: #444444;
    font-weight: bold;
    line-height: 19px;

    &:nth-child(2) {
      text-align: center;
    }

    &:nth-child(3) {
      text-align: center;
    }
  }

  tbody tr {
    td {
      color: #666666;
      padding: 16px 0;
      border-bottom: 1px solid #eeeeee;

      &:nth-child(1) {
        width: 40%;
      }

      &:nth-child(2) {
        width: 20%;
        text-align: center;
      }

      &:nth-child(3) {
        width: 20%;
        text-align: center;
      }

      &:nth-child(4) {
        width: 20%;
      }

      &:last-child {
        width: 230px;
        text-align: right;
      }

      button {
        background: none;
        border: 0;

        &:first-child {
          color: #4d85ee;
          margin-right: 23px;
        }

        &:last-child {
          color: #de3b3b;
        }
      }
    }

    &:last-child {
      td {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
`;
