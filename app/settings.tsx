import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { AppText } from "../src/components/AppText";
import { GlassCard } from "../src/components/GlassCard";
import { Screen } from "../src/components/Screen";
import { usePersistentState } from "../src/storage/usePersistentState";
import { AppSettings, defaultSettings, storageKeys } from "../src/state/appState";
import { colors, radii, spacing } from "../src/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = usePersistentState<AppSettings>(storageKeys.settings, defaultSettings);

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <AppText style={styles.backText}>‹</AppText>
        </Pressable>
        <AppText style={styles.title}>Settings</AppText>
        <View style={styles.back} />
      </View>
      <GlassCard style={styles.card}>
        <AppText gold>Theme selector</AppText>
        <Segment values={["Cosmic Dark", "Light", "System"]} selected={settings.theme} onSelect={(theme) => setSettings((current) => ({ ...current, theme }))} />
      </GlassCard>
      <GlassCard style={styles.card}>
        <AppText gold>Background</AppText>
        <Segment values={["Kailash Darshan", "Cosmic Shiva"]} selected={settings.background} onSelect={(background) => setSettings((current) => ({ ...current, background }))} />
      </GlassCard>
      <GlassCard style={styles.card}>
        <AppText gold>Font size</AppText>
        <Segment values={["Comfort", "Large"]} selected={settings.fontSize} onSelect={(fontSize) => setSettings((current) => ({ ...current, fontSize }))} />
      </GlassCard>
      <GlassCard style={styles.card}>
        <AppText gold>Language selector</AppText>
        <Segment values={["Hindi", "English"]} selected={settings.language} onSelect={(language) => setSettings((current) => ({ ...current, language }))} />
      </GlassCard>
      <GlassCard style={styles.rowCard}>
        <View>
          <AppText gold>Reminder preference</AppText>
          <AppText muted>Daily sadhana reminder placeholder</AppText>
        </View>
        <Switch
          value={settings.reminders}
          onValueChange={(reminders) => setSettings((current) => ({ ...current, reminders }))}
          trackColor={{ false: colors.border, true: colors.goldBorder }}
          thumbColor={settings.reminders ? colors.gold : colors.creamMuted}
        />
      </GlassCard>
      <GlassCard style={styles.card}>
        <AppText style={styles.about}>About BholePath</AppText>
        <AppText muted>BholePath is a peaceful devotional companion for jaap, reading, meditation, and pilgrimage planning.</AppText>
      </GlassCard>
      <GlassCard style={styles.note}>
        <AppText>Devotional content should be verified before public release.</AppText>
      </GlassCard>
    </Screen>
  );
}

function Segment<T extends string>({ values, selected, onSelect }: { values: T[]; selected: T; onSelect: (value: T) => void }) {
  return (
    <View style={styles.segment}>
      {values.map((value) => (
        <Pressable key={value} accessibilityRole="button" onPress={() => onSelect(value)} style={[styles.segmentButton, selected === value && styles.activeSegment]}>
          <AppText style={[styles.segmentText, selected === value && styles.activeSegmentText]}>{value}</AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.lg },
  back: { width: 44, height: 44, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: colors.glass },
  backText: { fontSize: 34 },
  title: { fontSize: 22, fontWeight: "900" },
  card: { padding: spacing.lg, marginBottom: spacing.md, gap: spacing.md },
  rowCard: { padding: spacing.lg, marginBottom: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  segment: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  segmentButton: { minHeight: 42, paddingHorizontal: 14, borderRadius: radii.round, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  activeSegment: { backgroundColor: colors.gold, borderColor: colors.gold },
  segmentText: { color: colors.creamMuted, fontWeight: "700" },
  activeSegmentText: { color: colors.navy, fontWeight: "900" },
  about: { fontSize: 18, fontWeight: "900" },
  note: { padding: spacing.lg, borderColor: colors.goldBorder }
});
