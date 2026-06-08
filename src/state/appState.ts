import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppSettings = {
  theme: "Cosmic Dark" | "Light" | "System";
  background: "Kailash Darshan" | "Cosmic Shiva";
  fontSize: "Comfort" | "Large";
  language: "Hindi" | "English";
  reminders: boolean;
};

export type JaapSession = {
  id: string;
  count: number;
  mantra: string;
  completedAt: string;
};

export type SadhanaProgress = {
  date: string;
  todayChants: number;
  meditationSeconds: number;
  articlesRead: string[];
  completedMalas: number;
};

export const storageKeys = {
  settings: "bholepath.settings",
  favorites: "bholepath.favorites",
  jyotirlingaFavorites: "bholepath.jyotirlinga.favorites",
  pilgrimage: "bholepath.pilgrimage",
  jaapCurrent: "bholepath.jaap.current",
  jaapMalas: "bholepath.jaap.malas",
  jaapSessions: "bholepath.jaap.sessions",
  sadhanaProgress: "bholepath.sadhana.progress"
};

export const defaultSettings: AppSettings = {
  theme: "Cosmic Dark",
  background: "Kailash Darshan",
  fontSize: "Comfort",
  language: "Hindi",
  reminders: true
};

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function emptyProgress(date = todayKey()): SadhanaProgress {
  return {
    date,
    todayChants: 0,
    meditationSeconds: 0,
    articlesRead: [],
    completedMalas: 0
  };
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const stored = await AsyncStorage.getItem(key);
  return stored ? (JSON.parse(stored) as T) : fallback;
}

async function writeJson<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadTodayProgress(): Promise<SadhanaProgress> {
  const progress = await readJson<SadhanaProgress>(storageKeys.sadhanaProgress, emptyProgress());
  return progress.date === todayKey() ? progress : emptyProgress();
}

export async function updateTodayProgress(updater: (current: SadhanaProgress) => SadhanaProgress) {
  const current = await loadTodayProgress();
  const next = updater(current);
  await writeJson(storageKeys.sadhanaProgress, next);
  return next;
}

export function recordChants(amount: number) {
  return updateTodayProgress((current) => ({
    ...current,
    todayChants: current.todayChants + amount,
    completedMalas: Math.floor((current.todayChants + amount) / 108)
  }));
}

export function recordMeditationSeconds(seconds: number) {
  if (seconds <= 0) return Promise.resolve(undefined);
  return updateTodayProgress((current) => ({
    ...current,
    meditationSeconds: current.meditationSeconds + seconds
  }));
}

export function recordArticleRead(articleId: string) {
  return updateTodayProgress((current) => ({
    ...current,
    articlesRead: current.articlesRead.includes(articleId) ? current.articlesRead : [...current.articlesRead, articleId]
  }));
}

export async function loadJaapSessions() {
  return readJson<JaapSession[]>(storageKeys.jaapSessions, []);
}

export async function saveJaapSessions(sessions: JaapSession[]) {
  await writeJson(storageKeys.jaapSessions, sessions);
}
