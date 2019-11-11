import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@rocketseat/unform';

// import { Container } from './styles';

export default function CurrencyInput() {
  const { fieldName, registerField } = useField('height');
  const [height, setHeight] = useState();

  const heightRef = useRef(null);

  useEffect(() => {
    // if (heightRef.current) {
    registerField({
      name: fieldName,
      ref: heightRef.current,
      // path: 'props.height',
    });
    // }
  }, [heightRef.current]); //eslint-disable-line

  return (
    <CurrencyInput
      name={fieldName}
      id="heightId"
      ref={heightRef}
      // onChange={newHeight => setHeight(newHeight)}
      thousandSeparator=""
    />
  );
}
