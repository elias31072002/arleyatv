import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();

import {Dashboard} from '../pages';

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}
