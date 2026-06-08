import { BookOpen, Flame, Landmark, Music, Shield, Sparkles } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { colors, radii } from "../theme";

type Props = {
  name: "lamp" | "book" | "om" | "trishul" | "lingam" | "lotus" | "temple" | "mala";
  size?: number;
};

export function DevotionalIcon({ name, size = 24 }: Props) {
  const iconColor = colors.gold;
  const icon =
    name === "book" ? <BookOpen color={iconColor} size={size} /> :
    name === "trishul" ? <Shield color={iconColor} size={size} /> :
    name === "lingam" ? <Landmark color={iconColor} size={size} /> :
    name === "lotus" ? <Sparkles color={iconColor} size={size} /> :
    name === "temple" ? <Landmark color={iconColor} size={size} /> :
    name === "mala" ? <Sparkles color={iconColor} size={size} /> :
    name === "om" ? <Music color={iconColor} size={size} /> :
    <Flame color={iconColor} size={size} />;

  return <View style={styles.wrap}>{icon}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    width: 48,
    height: 48,
    borderRadius: radii.round,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(248, 200, 106, 0.11)",
    borderWidth: 1,
    borderColor: colors.goldBorder
  }
});
