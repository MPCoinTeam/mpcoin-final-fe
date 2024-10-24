import * as React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TokenList from './TokenList';
import { ThemedView } from '../atoms/ThemedView';
import ActivityList from './ActivityList';

const TokensRoute = () => (
  <ThemedView style={styles.tokensTab}>
    <TokenList/>
  </ThemedView>
);

const ActivitiesRoute = () => (
  <ThemedView style={styles.activityTab}>
    <ActivityList/>
  </ThemedView>
);

const renderScene = SceneMap({
  tokens: TokensRoute,
  activities: ActivitiesRoute,
});

export default function AppTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tokens', title: 'Tokens' },
    { key: 'activities', title: 'Activities' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  tokensTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
  