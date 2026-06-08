import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "expo-router";
import { Flame, Medal, Settings } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../src/components/AppText";
import { DevotionalIcon } from "../src/components/DevotionalIcon";
import { GlassCard } from "../src/components/GlassCard";
import { Screen } from "../src/components/Screen";
import { emptyProgress, loadTodayProgress, SadhanaProgress, storageKeys } from "../src/state/appState";
import { colors, radii, spacing } from "../src/theme";

const badges = ["First Jaap", "7-Day Sadhana", "108 Chants", "Mahashivratri Special"];

export default function ProgressScreen() {
  const [progress, setProgress] = useState<SadhanaProgress>(emptyProgress());
  const [pilgrimageCount, setPilgrimageCount] = useState(0);
  const meditationMinutes = Math.floor(progress.meditationSeconds / 60);
  const unlocked = [
    progress.todayChants > 0,
    progress.todayChants > 0 && meditationMinutes > 0,
    progress.todayChants >= 108,
    progress.articlesRead.length > 0
  ];

  useFocusEffect(
    useCallback(() => {
      loadTodayProgress().then(setProgress).catch(() => undefined);
      AsyncStorage.getItem(storageKeys.pilgrimage)
        .then((stored) => setPilgrimageCount(stored ? (JSON.parse(stored) as string[]).length : 0))
        .catch(() => undefined);
    }, [])
  );

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.avatar}><DevotionalIcon name="om" /></View>
        <View style={styles.identity}>
          <AppText style={styles.name}>Devotee</AppText>
          <AppText muted>Har Har Mahadev</AppText>
        </View>
        <Link href="/settings" asChild>
          <Pressable accessibilityRole="button" style={styles.settings}>
            <Settings color={colors.cream} size={21} />
          </Pressable>
        </Link>
      </View>
      <View style={styles.stats}>
        <Stat value={`${progress.todayChants}`} label="Today's Chants" />
        <Stat value={`${meditationMinutes} min`} label="Meditation" />
        <Stat value={`${progress.articlesRead.length}`} label="Articles Read" />
      </View>
      <GlassCard style={styles.streak}>
        <View>
          <AppText gold>Current Streak</AppText>
          <AppText style={styles.streakText}>{progress.todayChants > 0 || meditationMinutes > 0 ? "Active Today" : "Begin Today"}</AppText>
          <AppText muted>{pilgrimageCount} pilgrimage places saved</AppText>
        </View>
        <Flame color={colors.gold} size={26} />
      </GlassCard>
      <GlassCard style={styles.badges}>
        <AppText gold>Achievements</AppText>
        <View style={styles.badgeRow}>
          {badges.map((badge, index) => (
            <View key={badge} style={[styles.badge, !unlocked[index] && styles.lockedBadge]}>
              <View style={[styles.badgeIcon, !unlocked[index] && styles.lockedBadgeIcon]}>{index === 2 ? <AppText style={styles.badge108}>108</AppText> : <Medal color={colors.gold} size={24} />}</View>
              <AppText style={styles.badgeLabel}>{unlocked[index] ? badge : `Locked: ${badge}`}</AppText>
            </View>
          ))}
        </View>
      </GlassCard>
    </Screen>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <GlassCard style={styles.stat}>
      <AppText style={styles.statValue}>{value}</AppText>
      <AppText style={styles.statLabel}>{label}</AppText>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.lg },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", backgroundColor: colors.glassStrong, marginRight: spacing.md },
  identity: { flex: 1 },
  name: { fontSize: 22, fontWeight: "900" },
  settings: { width: 44, height: 44, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: colors.glass },
  stats: { flexDirection: "row", gap: 10, marginBottom: spacing.md },
  stat: { flex: 1, minHeight: 90, alignItems: "center", justifyContent: "center", padding: spacing.sm },
  statValue: { fontSize: 22, fontWeight: "900" },
  statLabel: { fontSize: 11, textAlign: "center" },
  streak: { padding: spacing.lg, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  streakText: { fontSize: 22, fontWeight: "900" },
  badges: { padding: spacing.lg },
  badgeRow: { flexDirection: "row", gap: 10, marginTop: spacing.md },
  badge: { flex: 1, alignItems: "center" },
  lockedBadge: { opacity: 0.48 },
  badgeIcon: { width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: colors.gold, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(248,200,106,0.09)" },
  lockedBadgeIcon: { borderColor: colors.border },
  badge108: { color: colors.gold, fontSize: 16, fontWeight: "900" },
  badgeLabel: { marginTop: 8, fontSize: 10, textAlign: "center" }
});
