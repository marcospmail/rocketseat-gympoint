import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';

export default createAppContainer(
  createStackNavigator(
    {
      SignIn: {
        screen: SignIn,
      },
    },
    {
      defaultNavigationOptions: {
        headerTransparent: true,
      },
    }
  )
);
