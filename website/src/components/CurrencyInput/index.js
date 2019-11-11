import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function CurrencyInput({
  name,
  disabled,
  prefix,
  thousandSeparator,
}) {
  const ref = useRef();
  const { fieldName, defaultValue, registerField } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    console.tron.log(`default value ${defaultValue}`);

    if (ref.current && defaultValue) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.value',
        defaultValue,
        clearValue: pickerRef => {
          pickerRef.setInputValue(null);
        },
      });
    }
  }, [ref.current, fieldName, defaultValue]); //eslint-disable-line

  return (
    <>
      <NumberFormat
        thousandSeparator={thousandSeparator}
        isNumericString
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        prefix={prefix}
        ref={ref}
        name={fieldName}
        value={value}
        onValueChange={values => {
          setValue(values.floatValue);
        }}
        disabled={!!disabled}
      />
    </>
  );
}

CurrencyInput.defaultProps = {
  disabled: false,
  prefix: '',
  thousandSeparator: '',
};

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  thousandSeparator: PropTypes.string,
};
