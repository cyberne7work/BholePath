import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Heart, MapPin, Navigation } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { GlassCard } from "../../src/components/GlassCard";
import { Screen } from "../../src/components/Screen";
import { jyotirlingas } from "../../src/data/jyotirlingas";
import { usePersistentState } from "../../src/storage/usePersistentState";
import { storageKeys } from "../../src/state/appState";
import { colors, radii, spacing } from "../../src/theme";

export default function JyotirlingaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = useMemo(() => jyotirlingas.find((entry) => entry.id === id) ?? jyotirlingas[0], [id]);
  const [favorites, setFavorites] = usePersistentState<string[]>(storageKeys.jyotirlingaFavorites, []);
  const [pilgrimage, setPilgrimage] = usePersistentState<string[]>(storageKeys.pilgrimage, []);
  const favorite = favorites.includes(item.id);
  const inPilgrimage = pilgrimage.includes(item.id);

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <AppText style={styles.backText}>‹</AppText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => setFavorites((current) => favorite ? current.filter((entry) => entry !== item.id) : [...current, item.id])} style={styles.back}>
          <Heart color={favorite ? colors.gold : colors.cream} fill={favorite ? colors.gold : "transparent"} size={22} />
        </Pressable>
      </View>
      <GlassCard style={styles.image}>
        <View style={styles.sun} />
        <View style={styles.mountain} />
      </GlassCard>
      <AppText style={styles.name}>{item.name}</AppText>
      <AppText gold style={styles.location}>{item.location}</AppText>
      <GlassCard style={styles.section}>
        <AppText gold>Significance</AppText>
        <AppText style={styles.body}>{item.significance}</AppText>
      </GlassCard>
      <View style={styles.infoGrid}>
        <Info icon={<Calendar color={colors.gold} size={21} />} label="Best Time" value="May - Oct" />
        <Info icon={<Heart color={colors.gold} size={21} />} label="Deity" value="Lord Shiva" />
        <Info icon={<MapPin color={colors.gold} size={21} />} label="Distance" value="Add source" />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => setPilgrimage((current) => inPilgrimage ? current.filter((entry) => entry !== item.id) : [...current, item.id])}
        style={[styles.cta, inPilgrimage && styles.ctaSaved]}
      >
        <Navigation color={colors.navy} size={20} />
        <AppText style={styles.ctaText}>{inPilgrimage ? "Added to Pilgrimage" : "Add to Pilgrimage"}</AppText>
      </Pressable>
    </Screen>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <GlassCard style={styles.info}>
      {icon}
      <AppText gold style={styles.infoLabel}>{label}</AppText>
      <AppText style={styles.infoValue}>{value}</AppText>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm },
  back: { minWidth: 44, minHeight: 44, borderRadius: radii.round, alignItems: "center", justifyContent: "center", backgroundColor: colors.glass },
  backText: { fontSize: 34 },
  image: { height: 260, overflow: "hidden", marginBottom: spacing.md, backgroundColor: "rgba(248,200,106,0.11)" },
  sun: { position: "absolute", top: 34, right: 48, width: 54, height: 54, borderRadius: 27, backgroundColor: colors.gold },
  mountain: { position: "absolute", bottom: -40, left: -20, width: 430, height: 170, borderTopLeftRadius: 210, borderTopRightRadius: 48, transform: [{ rotate: "7deg" }], backgroundColor: "rgba(7,16,31,0.82)" },
  name: { fontSize: 28, fontWeight: "900" },
  location: { fontWeight: "800", marginBottom: spacing.md },
  section: { padding: spacing.lg, marginBottom: spacing.md },
  body: { marginTop: spacing.sm },
  infoGrid: { flexDirection: "row", gap: 10, marginBottom: spacing.lg },
  info: { flex: 1, minHeight: 112, padding: spacing.sm, alignItems: "center", justifyContent: "center" },
  infoLabel: { fontSize: 12, textAlign: "center", marginTop: 8 },
  infoValue: { fontSize: 12, textAlign: "center" },
  cta: { minHeight: 56, borderRadius: radii.md, backgroundColor: colors.gold, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  ctaSaved: { backgroundColor: colors.goldSoft },
  ctaText: { color: colors.navy, fontWeight: "900" }
});
