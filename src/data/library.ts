export type LibraryCategory = "Aarti" | "Chalisa" | "Mantras" | "Stotra" | "Favorites";

export type LibraryItem = {
  id: string;
  category: Exclude<LibraryCategory, "Favorites">;
  title: string;
  icon: "lamp" | "book" | "om" | "trishul" | "lingam";
  preview: string;
  hindi: string[];
  english: string[];
};

const verificationNote = "Devotional text placeholder. Verify source scripture, regional wording, meter, and translation before public release.";

function item(entry: LibraryItem): LibraryItem {
  return entry;
}

function mantra(id: string, title: string, preview: string, hindi: string[], english: string[]) {
  return item({ id, category: "Mantras", title, icon: "om", preview, hindi: [...hindi, verificationNote], english: [...english, verificationNote] });
}

function aarti(id: string, title: string, preview: string, hindi: string[], english: string[]) {
  return item({ id, category: "Aarti", title, icon: "lamp", preview, hindi: [...hindi, verificationNote], english: [...english, verificationNote] });
}

function stotra(id: string, title: string, preview: string, hindi: string[], english: string[]) {
  return item({ id, category: "Stotra", title, icon: "trishul", preview, hindi: [...hindi, verificationNote], english: [...english, verificationNote] });
}

export const libraryItems: LibraryItem[] = [
  aarti(
    "shiv-aarti",
    "Shiv Aarti",
    "Jai Shiv Omkara...",
    ["जय शिव ओंकारा, स्वामी जय शिव ओंकारा।", "ब्रह्मा विष्णु सदाशिव, अर्धांगी धारा।।", "एकानन चतुरानन पंचानन राजे।"],
    ["A traditional aarti in praise of Lord Shiva.", "Use verified regional wording before release."]
  ),
  aarti(
    "om-jai-gangadhar-aarti",
    "Om Jai Gangadhar Aarti",
    "Om Jai Gangadhar...",
    ["ॐ जय गंगाधर, हर जय गंगाधर।", "कैलाशवासी शिव, करुणा के सागर।"],
    ["A devotional aarti form honoring Shiva as Gangadhar.", "Regional versions vary; verify the final lyrics."]
  ),
  aarti(
    "mahadev-aarti",
    "Mahadev Aarti",
    "Har Har Mahadev...",
    ["हर हर महादेव, शंभू दयालु।", "भक्तों के संकट हरने वाले, त्रिपुरारी कृपालु।"],
    ["A simple editable Mahadev aarti placeholder.", "Replace with a verified public-domain version before release."]
  ),
  aarti(
    "shivratri-aarti",
    "Mahashivratri Aarti",
    "Shivratri ki aarti...",
    ["शिवरात्रि पावन रजनी, जागे भक्त निरंतर।", "भोलेनाथ की आरती उतारें, प्रेम भरे अंतर।"],
    ["A Mahashivratri-themed aarti placeholder.", "Verify any liturgical text before publishing."]
  ),
  aarti(
    "jyotirlinga-aarti",
    "Jyotirlinga Aarti",
    "Dwadash Jyotirlinga vandana...",
    ["द्वादश ज्योतिर्लिंग प्रभु, शिव स्वरूप महान।", "भक्ति दीप जलाकर करें, हर हर शिव का गान।"],
    ["A respectful Jyotirlinga aarti placeholder.", "Temple-specific aartis should be verified locally."]
  ),
  item({
    id: "shiv-chalisa",
    category: "Chalisa",
    title: "Shiv Chalisa",
    icon: "book",
    preview: "Jai Girija Pati Dinadayala...",
    hindi: ["जय गिरिजा पति दीनदयाला।", "सदा करत संत जन प्रतिपाला।।", "चंद्रशेखर करुणा के सागर।", verificationNote],
    english: ["A devotional praise of Lord Shiva.", "Use a verified text and translation before public release.", verificationNote]
  }),
  mantra(
    "om-namah-shivaya",
    "Om Namah Shivaya",
    "ॐ नमः शिवाय",
    ["ॐ नमः शिवाय।", "पंचाक्षरी मंत्र का जप शांति, स्मरण और समर्पण के लिए किया जाता है।"],
    ["Om Namah Shivaya.", "A revered Panchakshari mantra used for remembrance and surrender."]
  ),
  mantra(
    "maha-mrityunjaya",
    "Maha Mrityunjaya Mantra",
    "Om Tryambakam Yajamahe...",
    ["ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।", "उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्।।"],
    ["Om, we meditate upon the three-eyed one.", "May this mantra inspire healing, courage, and surrender."]
  ),
  mantra(
    "rudra-gayatri",
    "Rudra Gayatri Mantra",
    "Om Tatpurushaya Vidmahe...",
    ["ॐ तत्पुरुषाय विद्महे।", "महादेवाय धीमहि।", "तन्नो रुद्रः प्रचोदयात्।।"],
    ["Om, may we know the supreme person.", "May we meditate on Mahadev; may Rudra inspire us."]
  ),
  mantra(
    "shiva-gayatri",
    "Shiva Gayatri Mantra",
    "Om Mahadevaya Vidmahe...",
    ["ॐ महादेवाय विद्महे।", "रुद्रमूर्तये धीमहि।", "तन्नः शिवः प्रचोदयात्।।"],
    ["Om, may we know Mahadev.", "May we meditate on the form of Rudra; may Shiva guide us."]
  ),
  mantra(
    "shiva-moola-mantra",
    "Shiva Moola Mantra",
    "Om Namah Shivaya Shantaya...",
    ["ॐ नमः शिवाय शान्ताय।", "ॐ हराय नमः।", "ॐ शंभवे नमः।"],
    ["Seed-style Shiva invocations for calm jaap.", "Use verified lineage wording where required."]
  ),
  mantra(
    "shambho-mantra",
    "Shambho Mahadeva Mantra",
    "Shambho Mahadeva...",
    ["शंभो महादेव।", "हर हर महादेव।", "शिव शंभो शंकरा।"],
    ["A simple call-and-response devotional chant.", "Suitable as an editable kirtan-style placeholder."]
  ),
  mantra(
    "namah-shivaya-gurave",
    "Namah Shivaya Gurave",
    "Namah Shivaya Gurave...",
    ["नमः शिवाय गुरवे।", "सच्चिदानन्द मूर्तये।", "निष्प्रपञ्चाय शान्ताय।"],
    ["Salutations to Shiva as the inner teacher.", "Verify exact tradition-specific wording before release."]
  ),
  mantra(
    "mrityunjaya-bija",
    "Mrityunjaya Bija Mantra",
    "Om Haum Joom Sah...",
    ["ॐ हौं जूं सः।", "ॐ भूर्भुवः स्वः।", "त्र्यम्बकं यजामहे..."],
    ["A bija-linked Mrityunjaya practice placeholder.", "Bija usage can be tradition-specific; verify carefully."]
  ),
  mantra(
    "panchakshari-dhyana",
    "Panchakshari Dhyana",
    "Na Ma Shi Va Ya...",
    ["न - पृथ्वी का स्मरण।", "म - जल का स्मरण।", "शि - अग्नि का स्मरण।", "व - वायु का स्मरण।", "य - आकाश का स्मरण।"],
    ["A meditation aid around the syllables Na Ma Shi Va Ya.", "This is explanatory placeholder content, not scripture."]
  ),
  mantra(
    "shiv-dwadash-nama",
    "Shiva Dwadash Nama",
    "Twelve names of Shiva...",
    ["महादेव, शंकर, शंभू, रुद्र।", "नीलकण्ठ, त्रिपुरारी, पशुपति, ईशान।", "गंगाधर, चंद्रशेखर, विश्वनाथ, भोलेनाथ।"],
    ["Twelve devotional names of Shiva for daily remembrance.", "Name lists vary by source; verify the final collection."]
  ),
  stotra(
    "rudrashtakam",
    "Rudrashtakam",
    "Namami Shamishan...",
    ["नमामीशमीशान निर्वाणरूपं।", "विभुं व्यापकं ब्रह्मवेदस्वरूपम्।।"],
    ["A revered hymn in praise of Shiva.", "Placeholder lines are included for editing and verification."]
  ),
  stotra(
    "lingashtakam",
    "Lingashtakam",
    "Brahma Murari Surarchita Lingam...",
    ["ब्रह्ममुरारि सुरार्चित लिङ्गम्।", "निर्मलभासित शोभित लिङ्गम्।।"],
    ["A devotional hymn honoring the Shiva Lingam.", "Confirm exact text before publishing."]
  ),
  stotra(
    "shiv-tandav-stotram",
    "Shiv Tandav Stotram",
    "Jatatavi Galajjala...",
    ["जटाटवीगलज्जलप्रवाहपावितस्थले।", "गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।।"],
    ["A powerful stotra traditionally associated with Shiva's cosmic dance.", "Use verified Devanagari and transliteration before release."]
  ),
  stotra(
    "shiva-panchakshara-stotram",
    "Shiva Panchakshara Stotram",
    "Nagendraharaya Trilochanaya...",
    ["नागेन्द्रहाराय त्रिलोचनाय।", "भस्माङ्गरागाय महेश्वराय।", "नित्याय शुद्धाय दिगम्बराय।"],
    ["A stotra built around the sacred syllables of Namah Shivaya.", "Verify full verses and translation before release."]
  ),
  stotra(
    "bilvashtakam",
    "Bilvashtakam",
    "Tridalam Trigunakaram...",
    ["त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम्।", "त्रिजन्मपापसंहारं एकबिल्वं शिवार्पणम्।।"],
    ["A hymn traditionally recited while offering bilva leaves.", "Verify source and full text before release."]
  ),
  stotra(
    "shiva-mahimna-stotram",
    "Shiva Mahimna Stotram",
    "Mahimna Param Te...",
    ["महिम्नः पारं ते परमविदुषो यद्यसदृशी।", "स्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।।"],
    ["A major Sanskrit hymn praising the greatness of Shiva.", "Use a verified public-domain edition for the full text."]
  ),
  stotra(
    "daridrya-dahana-shiva-stotram",
    "Daridrya Dahana Shiva Stotram",
    "Vishveshvaraya Narakarnava...",
    ["विश्वेश्वराय नरकार्णवतारणाय।", "कर्णामृताय शशिशेखरधारणाय।"],
    ["A devotional stotra invoking Shiva's grace.", "Verify wording and attribution before publishing."]
  ),
  stotra(
    "vishwanath-ashtakam",
    "Vishwanath Ashtakam",
    "Gangataranga Ramaniya...",
    ["गङ्गातरङ्ग रमणीय जटाकलापं।", "गौरी निरन्तर विभूषित वामभागम्।"],
    ["A hymn in praise of Kashi Vishwanath.", "Verify exact text before release."]
  ),
  stotra(
    "kalabhairava-ashtakam",
    "Kalabhairava Ashtakam",
    "Devaraja Sevyamana...",
    ["देवराजसेव्यमान पावनाङ्घ्रिपङ्कजम्।", "व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।"],
    ["A hymn to Kalabhairava, a fierce form associated with Shiva.", "Verify full source and translation before release."]
  ),
  stotra(
    "chandrasekhara-ashtakam",
    "Chandrasekhara Ashtakam",
    "Chandrasekhara Chandrasekhara...",
    ["चन्द्रशेखर चन्द्रशेखर चन्द्रशेखर पाहि माम्।", "चन्द्रशेखर चन्द्रशेखर चन्द्रशेखर रक्ष माम्।।"],
    ["A devotional hymn invoking Shiva as Chandrasekhara.", "Verify exact verses before publishing."]
  )
];
