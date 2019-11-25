import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Checkins from '~/pages/Checkins';
import HelpOrdersList from '~/pages/HelpOrders';
import HelpOrderQuestion from '~/pages/HelpOrder';
import HelpOrderAsk from '~/pages/HelpOrderAsk';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: {
          screen: createBottomTabNavigator(
            {
              Checkins,
              HelpOrders: {
                screen: createStackNavigator(
                  {
                    HelpOrdersList,
                    HelpOrderQuestion,
                    HelpOrderAsk,
                  },
                  {
                    defaultNavigationOptions: {
                      headerTransparent: true,
                      headerTintColor: '#FFF',
                      headerLeftContainerStyle: {
                        marginLeft: 20,
                      },
                    },
                  }
                ),
                navigationOptions: {
                  tabBarLabel: 'Pedir ajuda',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon
                      name="add-circle-outline"
                      size={20}
                      color={tintColor}
                    />
                  ),
                },
              },
            },
            {
              resetOnBlur: true,
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
