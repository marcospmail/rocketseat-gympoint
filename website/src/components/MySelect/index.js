import React, { useRef, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function MySelector({ name, options }) {
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

  function handleChange(selectedValue) {
    setValue(selectedValue);
  }

  return (
    <>
      <Select
        name={fieldName}
        options={options}
        value={value}
        ref={ref}
        onChange={handleChange}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
      />

      {error && <span>{error}</span>}
    </>
  );
}

// MySelector.propTypes = {
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf.isRequired,
// };
