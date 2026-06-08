import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { usePersistentState } from "../storage/usePersistentState";
import { defaultSettings, storageKeys } from "../state/appState";
import { colors, gradients } from "../theme";

const backgroundImages = {
  "Kailash Darshan": require("../../assets/cosmic-kailash-background.png"),
  "Cosmic Shiva": require("../../assets/cosmic-shiva-dance-background.jpg")
};

export function CosmicBackground({ children }: PropsWithChildren) {
  const [settings] = usePersistentState(storageKeys.settings, defaultSettings);
  const source = backgroundImages[settings.background] ?? backgroundImages["Kailash Darshan"];

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.root} imageStyle={styles.image}>
      <LinearGradient colors={gradients.appOverlay} style={StyleSheet.absoluteFill} />
      <LinearGradient colors={gradients.bottomShade} style={StyleSheet.absoluteFill} />
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.navy
  },
  image: {
    opacity: 0.78
  },
  overlay: {
    flex: 1
  }
});
