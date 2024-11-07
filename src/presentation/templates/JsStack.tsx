import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import { StackNavigationEventMap, StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router';

export const Stack = createStackNavigator();

export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Stack.Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Stack.Navigator);
