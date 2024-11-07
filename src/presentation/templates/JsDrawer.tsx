import { DrawerNavigationEventMap, DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createDrawerNavigator();

export const JsDrawer = withLayoutContext<DrawerNavigationOptions, typeof Navigator, DrawerNavigationState<ParamListBase>, DrawerNavigationEventMap>(
  Navigator,
);
