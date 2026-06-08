export const colors = {
  navy: "#07101F",
  navy2: "#101A32",
  indigo: "#182142",
  charcoal: "#111827",
  cosmic: "#2A1B46",
  purple: "#5C3B88",
  saffron: "#F4A92F",
  gold: "#F8C86A",
  goldSoft: "#FFD98A",
  cream: "#FFF4D8",
  creamMuted: "#CDBF9F",
  white: "#FFFFFF",
  glass: "rgba(255, 244, 216, 0.08)",
  glassStrong: "rgba(255, 244, 216, 0.14)",
  goldBorder: "rgba(248, 200, 106, 0.38)",
  border: "rgba(255, 244, 216, 0.12)",
  shadow: "rgba(0, 0, 0, 0.45)",
  success: "#7ADCA2"
};

export const gradients = {
  app: [colors.navy, "#0B1730", colors.cosmic] as const,
  appOverlay: ["rgba(3,8,18,0.50)", "rgba(7,16,31,0.34)", "rgba(7,16,31,0.76)"] as const,
  bottomShade: ["rgba(7,16,31,0.06)", "rgba(7,16,31,0.44)", "rgba(3,8,18,0.92)"] as const,
  card: ["rgba(255,244,216,0.13)", "rgba(255,244,216,0.045)"] as const,
  gold: [colors.goldSoft, colors.saffron, "#B57422"] as const,
  twilight: ["rgba(42,27,70,0.86)", "rgba(11,23,48,0.94)", "rgba(7,16,31,1)"] as const
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  round: 999
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30
};

export const typography = {
  title: 28,
  subtitle: 18,
  body: 15,
  caption: 12
};
