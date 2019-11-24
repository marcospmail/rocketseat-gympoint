import React from 'react';
import PropTypes from 'prop-types';

import MyInput from '~/components/MyInput';

export default function MyNumericInput({ customValue, onChange, ...rest }) {
  function handleChangeText(text) {
    if (/^\d+$/.test(text) || text === '') {
      onChange(text);
    }
  }

  return (
    <MyInput
      keyboardType="numeric"
      value={customValue}
      onChangeText={handleChangeText}
      {...rest}
    />
  );
}

MyNumericInput.propTypes = {
  customValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
