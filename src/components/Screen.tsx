import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CosmicBackground } from "./Background";

type Props = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
}>;

export function Screen({ children, contentStyle, scroll = true }: Props) {
  const content = scroll ? (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, contentStyle]}>
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.safe}>{content}</SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  content: {
    padding: 18,
    paddingBottom: 108
  }
});
