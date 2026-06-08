import { Link } from "expo-router";
import { Heart, Search } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { GlassCard } from "../../src/components/GlassCard";
import { articles } from "../../src/data/articles";
import { jyotirlingas } from "../../src/data/jyotirlingas";
import { usePersistentState } from "../../src/storage/usePersistentState";
import { storageKeys } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";
import { Screen } from "../../src/components/Screen";

export default function ExploreScreen() {
  const [favorites, setFavorites] = usePersistentState<string[]>(storageKeys.jyotirlingaFavorites, []);
  const [pilgrimage] = usePersistentState<string[]>(storageKeys.pilgrimage, []);

  return (
    <Screen>
      <View style={styles.header}>
        <AppText style={styles.title}>Jyotirlingas</AppText>
        <Search color={colors.cream} size={22} />
      </View>
      <View style={styles.grid}>
        {jyotirlingas.map((item, index) => {
          const favorite = favorites.includes(item.id);
          return (
            <Link key={item.id} href={`/jyotirlinga/${item.id}`} asChild>
              <Pressable accessibilityRole="button" style={styles.cell}>
                <GlassCard style={styles.card}>
                  <View style={styles.imagePlaceholder}>
                    <View style={styles.sun} />
                    <View style={styles.peak} />
                    <Pressable
                      accessibilityRole="button"
                      onPress={(event) => {
                        event.stopPropagation();
                        setFavorites((current) => favorite ? current.filter((id) => id !== item.id) : [...current, item.id]);
                      }}
                      style={styles.favorite}
                    >
                      <Heart color={favorite ? colors.gold : colors.cream} fill={favorite ? colors.gold : "transparent"} size={17} />
                    </Pressable>
                  </View>
                  <View style={styles.cardBody}>
                    <AppText style={styles.cardTitle}>{index + 1}. {item.name}</AppText>
                    <AppText muted style={styles.location}>{item.location}</AppText>
                    {pilgrimage.includes(item.id) && <AppText gold style={styles.saved}>Pilgrimage saved</AppText>}
                  </View>
                </GlassCard>
              </Pressable>
            </Link>
          );
        })}
      </View>
      <View style={styles.sectionHeader}>
        <AppText style={styles.sectionTitle}>Stories & Knowledge</AppText>
      </View>
      {articles.map((article) => (
        <Link key={article.id} href={`/article/${article.id}`} asChild>
          <Pressable accessibilityRole="button">
            <GlassCard style={styles.articleCard}>
              <AppText style={styles.articleTitle}>{article.title}</AppText>
              <AppText muted>{article.excerpt}</AppText>
            </GlassCard>
          </Pressable>
        </Link>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.lg },
  title: { fontSize: 22, fontWeight: "900" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  cell: { width: "48.5%" },
  card: { overflow: "hidden" },
  imagePlaceholder: { height: 108, backgroundColor: "rgba(248,200,106,0.12)", overflow: "hidden" },
  sun: { position: "absolute", top: 18, right: 26, width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(248,200,106,0.8)" },
  peak: { position: "absolute", bottom: -20, left: -10, width: 190, height: 92, transform: [{ rotate: "8deg" }], backgroundColor: "rgba(7,16,31,0.72)", borderTopLeftRadius: 90, borderTopRightRadius: 18 },
  favorite: { position: "absolute", top: 8, right: 8, width: 34, height: 34, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(7,16,31,0.55)" },
  cardBody: { padding: spacing.sm },
  cardTitle: { fontWeight: "800", fontSize: 13 },
  location: { fontSize: 12 },
  saved: { fontSize: 11, marginTop: 3 },
  sectionHeader: { marginTop: spacing.xl, marginBottom: spacing.sm },
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  articleCard: { padding: spacing.md, marginBottom: spacing.sm },
  articleTitle: { fontSize: 16, fontWeight: "800", marginBottom: 4 }
});
