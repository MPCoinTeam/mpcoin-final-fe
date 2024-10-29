import { Route, TabBarProps } from "react-native-tab-view";
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/presentation/atoms/ThemedView";
import { useThemeColor } from "@/domain/usecases/hooks/themes/useThemeColor";
import { useMemo } from "react";

interface AppTabBarProps extends TabBarProps<Route> {
  onIndexChange: (index: number) => void;
}

export default function AppTabBar(props: AppTabBarProps) {
  const inputRange = useMemo(
    () => props.navigationState.routes.map((_, i) => i),
    []
  );
  const textColor = useThemeColor({}, "text");
  const selectedTextColor = useThemeColor({}, "selectedText");
  return (
    <ThemedView style={styles.tabBar}>
      {props.navigationState.routes.map((route, index) => {
        const isSelected = index === props.navigationState.index;
        const color = isSelected ? selectedTextColor : textColor;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => props.onIndexChange(index)}
          >
            <Animated.Text style={{ ...styles.tabText, color }}>
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    // flex: 1,
    alignItems: "center",
    padding: 16,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
