import { Tabs } from "expo-router";
import { BookOpen, Compass, Flame, Home, Sparkles } from "lucide-react-native";
import { colors, radii } from "../../src/theme";

const iconSize = 22;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.creamMuted,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(7, 16, 31, 0.86)",
          borderTopColor: colors.goldBorder,
          borderTopWidth: 1,
          minHeight: 76,
          paddingTop: 8,
          paddingBottom: 14,
          borderTopLeftRadius: radii.xl,
          borderTopRightRadius: radii.xl
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600"
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <Home color={color} size={iconSize} /> }} />
      <Tabs.Screen name="jaap" options={{ title: "Jaap", tabBarIcon: ({ color }) => <Flame color={color} size={iconSize} /> }} />
      <Tabs.Screen name="library" options={{ title: "Library", tabBarIcon: ({ color }) => <BookOpen color={color} size={iconSize} /> }} />
      <Tabs.Screen name="meditate" options={{ title: "Meditate", tabBarIcon: ({ color }) => <Sparkles color={color} size={iconSize} /> }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: ({ color }) => <Compass color={color} size={iconSize} /> }} />
    </Tabs>
  );
}
