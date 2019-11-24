import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';

import App from '~/App';

import { store, persistor } from '~/store';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <App />
      </PersistGate>
    </Provider>
  );
}
