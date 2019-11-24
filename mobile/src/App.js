import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from '~/routes';

import NavigationService from '~/services/navigation';

export default function src() {
  const signed = useSelector(state => state.auth.signed);
  const Routes = createRouter(signed);

  return (
    <Routes
      ref={navigationRef => NavigationService.setNavigator(navigationRef)}
    />
  );
}
