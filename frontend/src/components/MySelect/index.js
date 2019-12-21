import React, { useRef, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function MySelect({
  name,
  options,
  onChange,
  noOptionsMessage,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useMemo(() => setValue(defaultValue), [defaultValue]); //eslint-disable-line

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
    <>
      <Select
        name={fieldName}
        options={options}
        value={value}
        ref={ref}
        onChange={newValue => {
          handleChange(newValue);
          if (onChange) onChange(newValue);
        }}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        className="react-select-container"
        classNamePrefix="react-select"
        isSearchable={false}
        placeholder="Selecione..."
        loadingMessage={() => 'Carregando...'}
        noOptionsMessage={() =>
          noOptionsMessage || 'Nenhum registro encontrado'
        }
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

MySelect.defaultProps = {
  onChange: null,
  noOptionsMessage: null,
};

MySelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  noOptionsMessage: PropTypes.string,
};
