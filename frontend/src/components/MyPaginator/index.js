import React from 'react';
import PropTypes from 'prop-types';

import { MPaginator } from './styles';

export default function MyPaginator({
  firstPage,
  lastPage,
  page,
  handlePreviousPageChange,
  handleNextPageChange,
  ...rest
}) {
  return (
    <MPaginator {...rest}>
      <button
        type="button"
        disabled={firstPage}
        onClick={() => {
          handlePreviousPageChange();
        }}
      >
        Anterior
      </button>

      <button
        disabled={lastPage}
        type="button"
        onClick={() => {
          handleNextPageChange();
        }}
      >
        Próxima
      </button>
    </MPaginator>
  );
}

MyPaginator.defaultProps = {
  page: '',
};
MyPaginator.propTypes = {
  firstPage: PropTypes.bool.isRequired,
  lastPage: PropTypes.bool.isRequired,
  page: PropTypes.string,
  handlePreviousPageChange: PropTypes.func.isRequired,
  handleNextPageChange: PropTypes.func.isRequired,
};
