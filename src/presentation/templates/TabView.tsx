import TransactionList from '../organisms/lists/TransactionList';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import AppTabBar from '@/presentation/organisms/TabBar';
import TokenList from '@/presentation/organisms/lists/TokenList';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const TokensRoute = () => (
  <ThemedView style={styles.tokensTab}>
    <TokenList />
  </ThemedView>
);

const HistoryRoute = () => (
  <ThemedView style={styles.historyTab}>
    <TransactionList />
  </ThemedView>
);

const renderScene = SceneMap({
  tokens: TokensRoute,
  history: HistoryRoute,
});

export default function AppTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tokens', title: 'Tokens' },
    { key: 'history', title: 'History' },
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
  historyTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
