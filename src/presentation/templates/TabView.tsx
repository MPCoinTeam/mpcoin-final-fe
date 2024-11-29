import { ThemedView } from '@/presentation/atoms/ThemedView';
import AppTabBar from '@/presentation/organisms/TabBar';
import ActivityList from '@/presentation/organisms/lists/ActivityList';
import TokenList from '@/presentation/organisms/lists/TokenList';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const TokensRoute = () => (
  <ThemedView style={styles.tokensTab}>
    <TokenList />
  </ThemedView>
);

const ActivitiesRoute = () => (
  <ThemedView style={styles.activityTab}>
    <ActivityList />
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
    { key: 'activities', title: 'History' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(props) => <AppTabBar onIndexChange={setIndex} {...props} />}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  tokensTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
