import { ParamListBase, DrawerNavigationState } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationOptions, DrawerNavigationEventMap } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createDrawerNavigator();

export const JsDrawer = withLayoutContext<
DrawerNavigationOptions,
  typeof Navigator,
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationEventMap
>(Navigator);
