import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@rocketseat/unform';

// import { Container } from './styles';

export default function CurrencyInput() {
  const { registerField } = useField('height');
  const [height, setHeight] = useState();

  const heightRef = useRef();

  useEffect(() => {
    if (heightRef.current) {
      registerField({
        name: 'height',
        ref: heightRef.current,
        // path: 'props.height',
      });
    }
  }, []); //eslint-disable-line

  return (
    <CurrencyInput
      id="heightId"
      ref={heightRef}
      // onChange={newHeight => setHeight(newHeight)}
      thousandSeparator=""
    />
  );
}
