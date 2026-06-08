import { Link, useFocusEffect } from "expo-router";
import { Bell, Flame, Menu, Pencil, Settings } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { DevotionalIcon } from "../../src/components/DevotionalIcon";
import { GlassCard } from "../../src/components/GlassCard";
import { ProgressBar } from "../../src/components/ProgressBar";
import { Screen } from "../../src/components/Screen";
import { articles } from "../../src/data/articles";
import { emptyProgress, loadTodayProgress, SadhanaProgress } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

const quickActions = [
  { title: "Start Jaap", icon: "mala", href: "/jaap" },
  { title: "Read Aarti", icon: "lamp", href: "/reading/shiv-aarti" },
  { title: "Meditate", icon: "lotus", href: "/meditate" },
  { title: "Jyotirlingas", icon: "temple", href: "/explore" }
] as const;

export default function HomeScreen() {
  const [progress, setProgress] = useState<SadhanaProgress>(emptyProgress());
  const completedMala = Math.floor(progress.todayChants / 108);
  const currentMalaCount = progress.todayChants % 108;
  const displayCount = progress.todayChants > 0 && currentMalaCount === 0 ? 108 : currentMalaCount;
  const progressRatio = progress.todayChants === 0 ? 0 : displayCount / 108;

  useFocusEffect(
    useCallback(() => {
      loadTodayProgress().then(setProgress).catch(() => undefined);
    }, [])
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Menu color={colors.cream} size={26} />
        <View>
          <AppText style={styles.greeting}>Har Har Mahadev 🙏</AppText>
          <AppText muted>Good Morning, Devotee</AppText>
        </View>
        <View style={styles.headerActions}>
          <Link href="/progress" asChild>
            <Pressable accessibilityRole="button" style={styles.iconButton}>
              <Pencil color={colors.gold} size={18} />
            </Pressable>
          </Link>
          <Link href="/settings" asChild>
            <Pressable accessibilityRole="button" style={styles.iconButton}>
              <Bell color={colors.cream} size={20} />
            </Pressable>
          </Link>
        </View>
      </View>

      <GlassCard style={styles.hero}>
        <View style={styles.heroGlow} />
        <AppText style={styles.mantra}>ॐ नमः शिवाय</AppText>
        <AppText muted style={styles.center}>Om Namah Shivaya</AppText>
        <View style={styles.divider} />
        <AppText muted style={styles.center}>Today's Sadhana</AppText>
        <AppText style={styles.sadhana}>Discipline</AppText>
      </GlassCard>

      <View style={styles.quickGrid}>
        {quickActions.map((item) => (
          <Link key={item.title} href={item.href} asChild>
            <Pressable accessibilityRole="button" style={styles.quickPressable}>
              <GlassCard style={styles.quickCard}>
                <DevotionalIcon name={item.icon} size={22} />
                <AppText style={styles.quickText}>{item.title}</AppText>
              </GlassCard>
            </Pressable>
          </Link>
        ))}
      </View>

      <GlassCard style={styles.quoteCard}>
        <View>
          <AppText gold>Daily Quote</AppText>
          <AppText style={styles.quote}>The one who chants Shiva's name walks with steadiness, humility, and peace.</AppText>
        </View>
        <Flame color={colors.gold} size={44} />
      </GlassCard>

      <GlassCard style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View>
            <AppText gold>Today's Progress</AppText>
            <AppText style={styles.progressTitle}>{completedMala} Mala Completed</AppText>
            <AppText muted>{displayCount} / 108</AppText>
          </View>
          <View style={styles.streak}>
            <AppText gold>Streak</AppText>
            <AppText>{progress.todayChants > 0 || progress.meditationSeconds > 0 ? "Active" : "Begin"} 🔥</AppText>
          </View>
        </View>
        <ProgressBar progress={progressRatio} />
      </GlassCard>

      <View style={styles.sectionHeader}>
        <AppText style={styles.sectionTitle}>Stories & Knowledge</AppText>
        <Link href="/settings" asChild>
          <Pressable accessibilityRole="button">
            <Settings color={colors.creamMuted} size={19} />
          </Pressable>
        </Link>
      </View>
      {articles.slice(0, 3).map((article) => (
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  headerActions: {
    flexDirection: "row",
    gap: 8
  },
  iconButton: {
    minWidth: 42,
    minHeight: 42,
    borderRadius: radii.round,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,244,216,0.07)",
    borderColor: colors.border,
    borderWidth: 1
  },
  greeting: {
    fontWeight: "800",
    fontSize: 17
  },
  hero: {
    minHeight: 270,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: spacing.xl,
    borderColor: colors.goldBorder
  },
  heroGlow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(244,169,47,0.13)"
  },
  mantra: {
    fontSize: 42,
    lineHeight: 58,
    fontWeight: "800",
    textAlign: "center"
  },
  center: {
    textAlign: "center"
  },
  divider: {
    width: 95,
    height: 1,
    backgroundColor: colors.goldBorder,
    marginVertical: spacing.md
  },
  sadhana: {
    fontSize: 24,
    fontWeight: "700"
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: spacing.md
  },
  quickPressable: {
    width: "48.5%"
  },
  quickCard: {
    minHeight: 112,
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  quickText: {
    fontWeight: "700"
  },
  quoteCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  quote: {
    maxWidth: 250,
    marginTop: 6,
    fontWeight: "600"
  },
  progressCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    gap: spacing.md
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700"
  },
  streak: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingLeft: spacing.md
  },
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800"
  },
  articleCard: {
    padding: spacing.md,
    marginBottom: spacing.sm
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4
  }
});
