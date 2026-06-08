import { Pause, Play, RotateCcw, Volume2 } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { AppText } from "../../src/components/AppText";
import { GlassCard } from "../../src/components/GlassCard";
import { Screen } from "../../src/components/Screen";
import { recordMeditationSeconds } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

const presets = [5, 11, 21, 30];
const phases = ["Breathe In", "Hold", "Breathe Out"];

export default function MeditateScreen() {
  const [minutes, setMinutes] = useState(11);
  const [remaining, setRemaining] = useState(11 * 60);
  const [running, setRunning] = useState(false);
  const [savedSeconds, setSavedSeconds] = useState(0);
  const unsavedSecondsRef = useRef(0);
  const scale = useSharedValue(0.88);

  const flushMeditation = useCallback(() => {
    const seconds = unsavedSecondsRef.current;
    if (seconds <= 0) return;
    unsavedSecondsRef.current = 0;
    setSavedSeconds((current) => current + seconds);
    recordMeditationSeconds(seconds).catch(() => undefined);
  }, []);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.08, { duration: 4200 }), -1, true);
  }, [scale]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      unsavedSecondsRef.current += 1;
      setRemaining((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) {
      setRunning(false);
      flushMeditation();
    }
  }, [flushMeditation, remaining]);

  useEffect(() => () => flushMeditation(), [flushMeditation]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const phase = useMemo(() => phases[Math.floor((Date.now() / 4000) % phases.length)], [remaining, running]);
  const time = `${Math.floor(remaining / 60).toString().padStart(2, "0")}:${(remaining % 60).toString().padStart(2, "0")}`;

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <AppText style={styles.title}>Meditate</AppText>
        <Volume2 color={colors.gold} size={22} />
      </View>
      <AppText style={styles.phase}>{phase}</AppText>
      <View style={styles.circleWrap}>
        <Animated.View style={[styles.breathCircle, animatedStyle]}>
          <AppText style={styles.om}>ॐ</AppText>
        </Animated.View>
      </View>
      <AppText style={styles.time}>{time}</AppText>
      <AppText muted>Time Remaining</AppText>
      <View style={styles.presets}>
        {presets.map((preset) => (
          <Pressable key={preset} accessibilityRole="button" onPress={() => { flushMeditation(); setMinutes(preset); setRemaining(preset * 60); setRunning(false); }} style={[styles.preset, minutes === preset && styles.activePreset]}>
            <AppText style={minutes === preset ? styles.activePresetText : styles.presetText}>{preset} Min</AppText>
          </Pressable>
        ))}
      </View>
      <GlassCard style={styles.controls}>
        <Pressable accessibilityRole="button" style={styles.controlButton} onPress={() => { flushMeditation(); setRunning(false); setRemaining(minutes * 60); }}>
          <RotateCcw color={colors.gold} size={22} />
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.playButton} onPress={() => setRunning((current) => { if (current) flushMeditation(); return !current; })}>
          {running ? <Pause color={colors.navy} size={30} /> : <Play color={colors.navy} fill={colors.navy} size={30} />}
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.controlButton} onPress={() => { setRunning(false); flushMeditation(); }}>
          <Pause color={colors.creamMuted} size={24} />
        </Pressable>
      </GlassCard>
      <AppText muted style={styles.savedText}>{Math.floor(savedSeconds / 60)} min saved this session</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: "center" },
  header: { width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg },
  title: { fontSize: 22, fontWeight: "900" },
  phase: { fontSize: 22, fontWeight: "800", marginBottom: spacing.lg },
  circleWrap: { width: 288, height: 288, alignItems: "center", justifyContent: "center" },
  breathCircle: { width: 240, height: 240, borderRadius: 120, borderWidth: 1.5, borderColor: colors.goldSoft, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(248,200,106,0.05)", shadowColor: colors.gold, shadowOpacity: 0.36, shadowRadius: 28 },
  om: { fontSize: 82, fontWeight: "900", color: colors.cream },
  time: { fontSize: 22, fontWeight: "800", marginTop: spacing.md },
  presets: { flexDirection: "row", gap: 8, marginTop: spacing.lg },
  preset: { minHeight: 44, minWidth: 72, borderRadius: radii.round, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  activePreset: { borderColor: colors.gold, backgroundColor: "rgba(244,169,47,0.15)" },
  presetText: { color: colors.cream },
  activePresetText: { color: colors.gold, fontWeight: "800" },
  controls: { width: "100%", marginTop: spacing.lg, padding: spacing.md, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  controlButton: { width: 58, height: 58, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: colors.glass },
  playButton: { width: 72, height: 72, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: colors.gold },
  savedText: { marginTop: spacing.md }
});
