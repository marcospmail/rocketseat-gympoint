import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import Checkins from '~/pages/Checkins';
import HelpOrders from '~/pages/HelpOrders';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: {
          screen: createBottomTabNavigator(
            {
              Checkins: {
                screen: Checkins,
                navigationOptions: {
                  headerTransparent: false,
                  headerTintColor: '#FFF',
                  headerLeftContainerStyle: {
                    marginLeft: 20,
                  },
                },
              },
              HelpOrders,
            },
            {
              tabBarOptions: {
                keyboardHidesTabBar: true,
                activeTintColor: '#EE4E62',
                inactiveTintColor: '#999999',
              },
            }
          ),
        },
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
