import React from 'react';

import logo from '~/assets/logo.png';

import { Header, HeaderImage, HeaderText } from './styles';

export default function MyHeader() {
  return (
    <Header>
      <HeaderImage source={logo} />
      <HeaderText>GYMPOINT</HeaderText>
    </Header>
  );
}
