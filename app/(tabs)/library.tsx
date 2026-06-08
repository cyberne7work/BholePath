import { Link } from "expo-router";
import { ChevronRight, Heart, Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { DevotionalIcon } from "../../src/components/DevotionalIcon";
import { GlassCard } from "../../src/components/GlassCard";
import { Screen } from "../../src/components/Screen";
import { LibraryCategory, libraryItems } from "../../src/data/library";
import { usePersistentState } from "../../src/storage/usePersistentState";
import { storageKeys } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

const categories: LibraryCategory[] = ["Aarti", "Chalisa", "Mantras", "Stotra", "Favorites"];

export default function LibraryScreen() {
  const [category, setCategory] = useState<LibraryCategory>("Aarti");
  const [favorites, setFavorites] = usePersistentState<string[]>(storageKeys.favorites, []);
  const visibleItems = useMemo(
    () => libraryItems.filter((item) => category === "Favorites" ? favorites.includes(item.id) : item.category === category),
    [category, favorites]
  );

  return (
    <Screen>
      <View style={styles.header}>
        <AppText style={styles.title}>Library</AppText>
        <Search color={colors.cream} size={22} />
      </View>
      <View style={styles.tabs}>
        {categories.map((item) => (
          <Pressable key={item} onPress={() => setCategory(item)} accessibilityRole="tab" style={[styles.tab, category === item && styles.activeTab]}>
            <AppText style={[styles.tabText, category === item && styles.activeTabText]}>{item}</AppText>
          </Pressable>
        ))}
      </View>
      {visibleItems.map((item) => {
        const favorite = favorites.includes(item.id);
        return (
          <Link key={item.id} href={`/reading/${item.id}`} asChild>
            <Pressable accessibilityRole="button">
              <GlassCard style={styles.card}>
                <DevotionalIcon name={item.icon} />
                <View style={styles.cardText}>
                  <AppText style={styles.cardTitle}>{item.title}</AppText>
                  <AppText muted>{item.preview}</AppText>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={(event) => {
                    event.stopPropagation();
                    setFavorites((current) => favorite ? current.filter((id) => id !== item.id) : [...current, item.id]);
                  }}
                  style={styles.favorite}
                >
                  <Heart color={favorite ? colors.gold : colors.creamMuted} fill={favorite ? colors.gold : "transparent"} size={20} />
                </Pressable>
                <ChevronRight color={colors.cream} size={22} />
              </GlassCard>
            </Pressable>
          </Link>
        );
      })}
      {visibleItems.length === 0 && (
        <GlassCard style={styles.empty}>
          <AppText muted>No saved favorites yet.</AppText>
        </GlassCard>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg },
  title: { fontSize: 22, fontWeight: "900" },
  tabs: { flexDirection: "row", gap: 8, marginBottom: spacing.md },
  tab: { minHeight: 40, paddingHorizontal: 12, borderRadius: radii.round, justifyContent: "center" },
  activeTab: { backgroundColor: "rgba(244,169,47,0.18)", borderWidth: 1, borderColor: colors.goldBorder },
  tabText: { fontSize: 12, color: colors.creamMuted, fontWeight: "700" },
  activeTabText: { color: colors.gold },
  card: { minHeight: 78, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.sm },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "800" },
  favorite: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
  empty: { padding: spacing.lg, alignItems: "center" }
});
