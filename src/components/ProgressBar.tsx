import { StyleSheet, View } from "react-native";
import { colors, radii } from "../theme";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.track} accessibilityRole="progressbar">
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(progress, 1)) * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 9,
    borderRadius: radii.round,
    backgroundColor: "rgba(255,244,216,0.13)",
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: radii.round,
    backgroundColor: colors.saffron
  }
});
