import React, { useState, useEffect, useRef, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function CurrencyInput({
  name,
  disabled,
  prefix,
  thousandSeparator,
  onChange,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(
    name || ''
  );
  const [value, setValue] = useState();

  useMemo(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (ref.current) {
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
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <>
      <NumberFormat
        id={fieldName}
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
          if (onChange) onChange(values.floatValue);
        }}
        disabled={!!disabled}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

CurrencyInput.defaultProps = {
  disabled: false,
  prefix: '',
  thousandSeparator: '',
  name: null,
  onChange: null,
};

CurrencyInput.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  thousandSeparator: PropTypes.string,
  onChange: PropTypes.func,
};
