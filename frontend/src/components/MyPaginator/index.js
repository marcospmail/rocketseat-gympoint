import React from 'react';
import PropTypes from 'prop-types';

import { MPaginator } from './styles';

export default function MyPaginator({
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
        disabled={page === 1}
        onClick={() => {
          handlePreviousPageChange();
        }}
      >
        Anterior
      </button>

      <span>{page}</span>

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
  lastPage: PropTypes.bool.isRequired,
  page: PropTypes.string,
  handlePreviousPageChange: PropTypes.func.isRequired,
  handleNextPageChange: PropTypes.func.isRequired,
};
