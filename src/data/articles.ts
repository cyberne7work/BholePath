export type Article = {
  id: string;
  title: string;
  excerpt: string;
  body: string[];
};

const contentNote = "This article is a respectful editable placeholder. Verify theological, historical, and translation details before public release.";

export const articles: Article[] = [
  { id: "who-is-lord-shiva", title: "Who is Lord Shiva?", excerpt: "A calm introduction to Shiva's devotional symbolism.", body: ["Lord Shiva is worshipped as Mahadev, the great lord, and is associated with transformation, stillness, meditation, and compassion.", contentNote] },
  { id: "om-namah-shivaya", title: "Meaning of Om Namah Shivaya", excerpt: "The spirit of the Panchakshari mantra.", body: ["Om Namah Shivaya is commonly understood as a bow to Shiva, inviting humility, awareness, and inner purification.", contentNote] },
  { id: "trishul-symbolism", title: "Symbolism of Trishul", excerpt: "A devotional look at Shiva's trident.", body: ["The Trishul is often interpreted as a symbol of balance, discipline, and the transcendence of limitation.", contentNote] },
  { id: "neelkanth", title: "Story of Neelkanth", excerpt: "The compassionate image of Shiva as Neelkanth.", body: ["Neelkanth evokes the image of Shiva absorbing poison for cosmic welfare, a symbol of sacrifice and protection.", contentNote] },
  { id: "damru", title: "Meaning of Damru", excerpt: "Rhythm, creation, and sacred sound.", body: ["The Damru is associated with sacred rhythm and the pulse of creation in devotional symbolism.", contentNote] },
  { id: "rudraksha", title: "Importance of Rudraksha", excerpt: "A bead of remembrance and discipline.", body: ["Rudraksha beads are used by many devotees as a reminder of prayer, restraint, and steady sadhana.", contentNote] },
  { id: "mahashivratri", title: "Mahashivratri", excerpt: "A night of worship, fasting, and remembrance.", body: ["Mahashivratri is observed by many devotees through prayer, jaap, fasting, and meditation.", contentNote] },
  { id: "kailash", title: "Kailash and Shiva", excerpt: "The mountain as a symbol of silence.", body: ["Kailash is revered in devotional imagination as a seat of stillness, austerity, and divine presence.", contentNote] }
];
