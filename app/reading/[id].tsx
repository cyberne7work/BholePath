import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Heart, Minus, MoreHorizontal, Play, Plus, Share2 } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, Share, StyleSheet, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { GlassCard } from "../../src/components/GlassCard";
import { Screen } from "../../src/components/Screen";
import { libraryItems } from "../../src/data/library";
import { usePersistentState } from "../../src/storage/usePersistentState";
import { defaultSettings, recordArticleRead, storageKeys } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

export default function ReadingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = useMemo(() => libraryItems.find((entry) => entry.id === id) ?? libraryItems[0], [id]);
  const [language, setLanguage] = useState<"Hindi" | "English">("Hindi");
  const [fontSize, setFontSize] = useState(20);
  const [readerTheme, setReaderTheme] = useState<"Warm" | "Contrast">("Warm");
  const [audioStatus, setAudioStatus] = useState("Audio placeholder");
  const [favorites, setFavorites] = usePersistentState<string[]>(storageKeys.favorites, []);
  const [settings, , settingsReady] = usePersistentState(storageKeys.settings, defaultSettings);
  const favorite = favorites.includes(item.id);
  const lines = language === "Hindi" ? item.hindi : item.english;

  useEffect(() => {
    if (!settingsReady) return;
    setLanguage(settings.language);
    setFontSize(settings.fontSize === "Large" ? 23 : 20);
  }, [settings.fontSize, settings.language, settingsReady]);

  useEffect(() => {
    recordArticleRead(`reading:${item.id}`).catch(() => undefined);
  }, [item.id]);

  const shareReading = () => {
    Share.share({
      title: item.title,
      message: `${item.title}\n\n${lines.slice(0, 3).join("\n")}\n\nShared from BholePath.`
    }).catch(() => undefined);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: item.title }} />
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <AppText style={styles.backText}>‹</AppText>
        </Pressable>
        <AppText style={styles.title}>{item.title}</AppText>
        <Pressable accessibilityRole="button" onPress={() => setFontSize((size) => Math.min(28, size + 1))} style={styles.backButton}>
          <AppText style={styles.aA}>aA</AppText>
        </Pressable>
      </View>

      <View style={styles.segment}>
        {(["Hindi", "English"] as const).map((value) => (
          <Pressable key={value} accessibilityRole="button" onPress={() => setLanguage(value)} style={[styles.segmentButton, language === value && styles.activeSegment]}>
            <AppText style={language === value ? styles.activeSegmentText : styles.segmentText}>{value}</AppText>
          </Pressable>
        ))}
      </View>

      <GlassCard style={[styles.reader, readerTheme === "Contrast" && styles.readerContrast]}>
        {lines.map((line) => (
          <AppText key={line} style={[styles.line, { fontSize, lineHeight: fontSize * 1.72 }]}>{line}</AppText>
        ))}
        <AppText muted style={styles.audioStatus}>{audioStatus}</AppText>
      </GlassCard>

      <GlassCard style={styles.toolbar}>
        <Tool label="Share" icon={<Share2 color={colors.cream} size={20} />} onPress={shareReading} />
        <Pressable
          accessibilityRole="button"
          onPress={() => setFavorites((current) => favorite ? current.filter((entry) => entry !== item.id) : [...current, item.id])}
          style={styles.tool}
        >
          <Heart color={favorite ? colors.gold : colors.cream} fill={favorite ? colors.gold : "transparent"} size={20} />
          <AppText style={styles.toolLabel}>Favorite</AppText>
        </Pressable>
        <Tool
          label="Play"
          icon={<Play color={colors.navy} fill={colors.navy} size={21} />}
          primary
          onPress={() => setAudioStatus("Audio playback placeholder for future verified recitation.")}
        />
        <Pressable accessibilityRole="button" onPress={() => setFontSize((size) => Math.max(16, size - 1))} style={styles.tool}>
          <Minus color={colors.cream} size={18} />
          <AppText style={styles.toolLabel}>Font</AppText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => setReaderTheme((theme) => theme === "Warm" ? "Contrast" : "Warm")} style={styles.tool}>
          <Plus color={colors.cream} size={18} />
          <AppText style={styles.toolLabel}>Theme</AppText>
        </Pressable>
        <Tool label="More" icon={<MoreHorizontal color={colors.cream} size={20} />} onPress={() => Alert.alert("Content note", "Devotional content should be verified before public release.")} />
      </GlassCard>
    </Screen>
  );
}

function Tool({ icon, label, primary, onPress }: { icon: React.ReactNode; label: string; primary?: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.tool, primary && styles.primaryTool]}>
      {icon}
      <AppText style={[styles.toolLabel, primary && styles.primaryLabel]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md },
  backButton: { minWidth: 44, minHeight: 44, borderRadius: radii.round, alignItems: "center", justifyContent: "center" },
  backText: { fontSize: 34 },
  aA: { fontSize: 18, fontWeight: "800" },
  title: { fontSize: 20, fontWeight: "900" },
  segment: { alignSelf: "center", flexDirection: "row", padding: 4, backgroundColor: colors.glass, borderRadius: radii.round, marginBottom: spacing.md },
  segmentButton: { minWidth: 96, minHeight: 42, borderRadius: radii.round, alignItems: "center", justifyContent: "center" },
  activeSegment: { backgroundColor: colors.gold },
  segmentText: { color: colors.creamMuted, fontWeight: "700" },
  activeSegmentText: { color: colors.navy, fontWeight: "900" },
  reader: { padding: spacing.lg, marginBottom: spacing.md },
  readerContrast: { backgroundColor: "rgba(0,0,0,0.22)", borderColor: colors.goldBorder },
  line: { textAlign: "center", marginBottom: spacing.md, color: colors.cream },
  audioStatus: { textAlign: "center", marginTop: spacing.sm },
  toolbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: spacing.sm },
  tool: { minWidth: 48, minHeight: 50, alignItems: "center", justifyContent: "center", gap: 4 },
  primaryTool: { backgroundColor: colors.gold, borderRadius: radii.round, width: 58, height: 58 },
  toolLabel: { fontSize: 10 },
  primaryLabel: { color: colors.navy, fontWeight: "900" }
});
