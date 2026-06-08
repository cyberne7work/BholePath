import { useLocalSearchParams, useRouter } from "expo-router";
import { Share2 } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import { Pressable, Share, StyleSheet, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { GlassCard } from "../../src/components/GlassCard";
import { Screen } from "../../src/components/Screen";
import { articles } from "../../src/data/articles";
import { recordArticleRead } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const article = useMemo(() => articles.find((entry) => entry.id === id) ?? articles[0], [id]);

  useEffect(() => {
    recordArticleRead(article.id).catch(() => undefined);
  }, [article.id]);

  const shareArticle = () => {
    Share.share({
      title: article.title,
      message: `${article.title}\n\n${article.body.join("\n\n")}\n\nShared from BholePath.`
    }).catch(() => undefined);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <AppText style={styles.backText}>‹</AppText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={shareArticle} style={styles.back}>
          <Share2 color={colors.cream} size={20} />
        </Pressable>
      </View>
      <AppText gold>Stories & Knowledge</AppText>
      <AppText style={styles.title}>{article.title}</AppText>
      <GlassCard style={styles.card}>
        {article.body.map((line) => (
          <AppText key={line} style={styles.body}>{line}</AppText>
        ))}
      </GlassCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: spacing.md, flexDirection: "row", justifyContent: "space-between" },
  back: { width: 44, height: 44, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: colors.glass },
  backText: { fontSize: 34 },
  title: { fontSize: 30, lineHeight: 38, fontWeight: "900", marginVertical: spacing.md },
  card: { padding: spacing.lg },
  body: { fontSize: 18, lineHeight: 31, marginBottom: spacing.md }
});
