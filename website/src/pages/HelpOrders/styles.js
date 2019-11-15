import styled from 'styled-components';
import Modal from 'react-modal';

import { validationErrorSpan, actionButton } from '~/styles/util';

export const Container = styled.div`
  max-width: 700px;
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
`;

export const NoData = styled.div`
  margin-top: 20px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
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
        color: #4d85ee;
        margin-right: 23px;
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

const customStyles = {
  overlay: { background: 'rgba(0, 0, 0, 0.7)' },
};

export const AnswearModal = styled(Modal).attrs({
  style: customStyles,
})`
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  span {
    color: #444;
    font-size: 16px;
    line-height: 26px;

    & + span {
      margin-top: 8px;
    }

    strong {
      font-size: 14px;
      line-height: 16px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      margin-top: 8px;
      height: 127px;
      line-height: 18px;
      border: 1px solid #dddddd;
      background: none;
      resize: none;
      padding: 10px;
      border-radius: 4px;

      & + span {
        ${validationErrorSpan}
      }
    }

    button {
      ${actionButton}
      height: 36px;
      margin-top: 21px;
    }
  }
`;
