import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { useMemo } from 'react';
import { Animated, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Route, TabBarProps } from 'react-native-tab-view';

interface AppTabBarProps extends TabBarProps<Route> {
  onIndexChange: (index: number) => void;
}

export default function AppTabBar(props: AppTabBarProps) {
  const inputRange = useMemo(() => props.navigationState.routes.map((_, i) => i), []);
  const textColor = useThemeColor({}, 'text');
  const selectedTextColor = useThemeColor({}, 'selectedText');
  return (
    <ThemedView style={styles.tabBar}>
      {props.navigationState.routes.map((route, index) => {
        const isSelected = index === props.navigationState.index;
        const color = isSelected ? selectedTextColor : textColor;

        return (
          <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => props.onIndexChange(index)}>
            <Animated.Text style={{ ...styles.tabText, color }}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 12,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
