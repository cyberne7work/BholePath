import * as Haptics from "expo-haptics";
import { Bookmark, Repeat2, RotateCcw } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { AppText } from "../../src/components/AppText";
import { GlassCard } from "../../src/components/GlassCard";
import { Screen } from "../../src/components/Screen";
import { usePersistentState } from "../../src/storage/usePersistentState";
import { JaapSession, loadJaapSessions, recordChants, saveJaapSessions, storageKeys } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

const MANTRAS = [
  { title: "ॐ नमः शिवाय", subtitle: "Om Namah Shivaya" },
  { title: "महामृत्युंजय मंत्र", subtitle: "Maha Mrityunjaya" },
  { title: "हर हर महादेव", subtitle: "Har Har Mahadev" }
];

export default function JaapScreen() {
  const [count, setCount] = usePersistentState(storageKeys.jaapCurrent, 54);
  const [malaCount, setMalaCount] = usePersistentState(storageKeys.jaapMalas, 2);
  const [sessions, setSessions] = useState<JaapSession[]>([]);
  const [mantraIndex, setMantraIndex] = useState(0);
  const mantra = MANTRAS[mantraIndex];
  const complete = count >= 108;

  useEffect(() => {
    loadJaapSessions()
      .then(setSessions)
      .catch(() => undefined);
  }, []);

  const saveSessions = useCallback((next: JaapSession[]) => {
    setSessions(next);
    saveJaapSessions(next).catch(() => undefined);
  }, []);

  const chant = useCallback(() => {
    if (count >= 108) return;
    const next = count + 1;
    setCount(next);
    recordChants(1).catch(() => undefined);
    Haptics.selectionAsync().catch(() => undefined);
    if (next === 108) {
      setMalaCount((current) => current + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    }
  }, [count, setCount, setMalaCount]);

  const saveSession = useCallback(() => {
    const next = [{ id: `${Date.now()}`, count, mantra: mantra.subtitle, completedAt: new Date().toISOString() }, ...sessions].slice(0, 20);
    saveSessions(next);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  }, [count, mantra.subtitle, saveSessions, sessions]);

  const beads = useMemo(() => Array.from({ length: 108 }), []);

  return (
    <Screen contentStyle={styles.content}>
      <AppText style={styles.header}>Jaap</AppText>
      <Pressable onPress={chant} accessibilityRole="button" style={styles.tapArea}>
        <AppText style={styles.mantra}>{mantra.title}</AppText>
        <AppText gold style={styles.subtitle}>{mantra.subtitle}</AppText>
        <View style={styles.malaWrap}>
          <Svg width={320} height={320} viewBox="0 0 320 320" style={styles.malaSvg}>
            <Circle cx={160} cy={160} r={112} stroke={colors.goldBorder} strokeWidth={1} fill="rgba(7,16,31,0.42)" />
            {beads.map((_, index) => {
              const angle = (index / 108) * Math.PI * 2 - Math.PI / 2;
              const x = 160 + Math.cos(angle) * 132;
              const y = 160 + Math.sin(angle) * 132;
              const filled = index < count;
              return <Circle key={index} cx={x} cy={y} r={filled ? 6 : 4.2} fill={filled ? colors.gold : "rgba(118,75,39,0.75)"} opacity={filled ? 0.96 : 0.72} />;
            })}
          </Svg>
          <View style={styles.counter}>
            <AppText gold style={styles.trishul}>ॐ</AppText>
            <AppText style={styles.count}>{Math.min(count, 108)}</AppText>
            <AppText style={styles.total}>/ 108</AppText>
          </View>
        </View>
        <AppText gold style={styles.tapText}>{complete ? "Mala Complete. Har Har Mahadev." : "Tap anywhere to chant"}</AppText>
      </Pressable>

      <View style={styles.actions}>
        <RoundAction icon={<RotateCcw color={colors.cream} size={22} />} label="Reset" onPress={() => setCount(0)} />
        <RoundAction icon={<Repeat2 color={colors.gold} size={22} />} label="Change Mantra" onPress={() => setMantraIndex((mantraIndex + 1) % MANTRAS.length)} />
        <RoundAction icon={<Bookmark color={colors.cream} size={22} />} label="Save Session" onPress={saveSession} />
      </View>

      <GlassCard style={styles.malas}>
        <AppText style={styles.malaNumber}>{malaCount}</AppText>
        <AppText gold>Malas Completed</AppText>
        <AppText muted>{sessions.length} saved sessions</AppText>
      </GlassCard>
    </Screen>
  );
}

function RoundAction({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.action}>
      <View style={styles.actionCircle}>{icon}</View>
      <AppText style={styles.actionLabel}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: "center" },
  header: { fontSize: 20, fontWeight: "800", marginBottom: spacing.md },
  tapArea: { alignItems: "center", width: "100%", minHeight: 480 },
  mantra: { fontSize: 34, fontWeight: "800", textAlign: "center" },
  subtitle: { fontWeight: "700", marginTop: 4 },
  malaWrap: { width: 320, height: 320, marginTop: spacing.lg, alignItems: "center", justifyContent: "center" },
  malaSvg: { position: "absolute" },
  counter: { alignItems: "center" },
  trishul: { fontSize: 28 },
  count: { fontSize: 58, lineHeight: 66, fontWeight: "900" },
  total: { fontSize: 22 },
  tapText: { marginTop: spacing.md, textAlign: "center" },
  actions: { width: "100%", flexDirection: "row", justifyContent: "space-around", marginTop: spacing.md },
  action: { alignItems: "center", minWidth: 86 },
  actionCircle: { width: 62, height: 62, borderRadius: radii.round, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  actionLabel: { marginTop: 8, fontSize: 12, textAlign: "center" },
  malas: { width: "100%", marginTop: spacing.lg, padding: spacing.md, alignItems: "center" },
  malaNumber: { color: colors.gold, fontSize: 26, fontWeight: "900" }
});
