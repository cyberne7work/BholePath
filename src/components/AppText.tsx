import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { colors } from "../theme";

type Props = PropsWithChildren<{
  muted?: boolean;
  gold?: boolean;
  style?: StyleProp<TextStyle>;
}>;

export function AppText({ children, muted, gold, style }: Props) {
  return <Text style={[styles.text, muted && styles.muted, gold && styles.gold, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.cream,
    fontSize: 15,
    lineHeight: 22
  },
  muted: {
    color: colors.creamMuted
  },
  gold: {
    color: colors.gold
  }
});
