import React from 'react';

import { TButton, TButtonText } from './styles';

export default function MyButton({ children }) {
  return (
    <TButton onPress={() => {}}>
      <TButtonText>{children}</TButtonText>
    </TButton>
  );
}
