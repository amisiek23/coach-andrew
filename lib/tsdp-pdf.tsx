import {
  Document, Page, View, Text, StyleSheet, Svg, Rect, G,
} from "@react-pdf/renderer";

const GREEN       = "#377A00";
const GREEN_LIGHT = "#EAF7EB";
const TEXT        = "#151716";
const MUTED       = "#64748B";
const WHITE       = "#ffffff";

const RESULT_COLORS: Record<string, string> = {
  "Deep Inner Calling":            "#377A00",
  "Active Search":                 "#2D5A8E",
  "Emerging Awareness":            "#D97706",
  "External Identity Orientation": "#64748B",
};

const RESULT_ICONS: Record<string, string> = {
  "Deep Inner Calling":            "🌿",
  "Active Search":                 "🔍",
  "Emerging Awareness":            "🌅",
  "External Identity Orientation": "🔲",
};

const TSDP_RESULTS = [
  { min: 20, max: 25, label: "Deep Inner Calling",            desc: "You strongly feel that there is a deeper self within you waiting to be expressed. This is not confusion — it is awakening. The inner calling you sense is real, and it is asking to be honoured." },
  { min: 14, max: 19, label: "Active Search",                 desc: "You are aware that there is more to you than your current expression. You are in the process of discovery — actively searching, questioning, and beginning to listen more deeply to what is true for you." },
  { min: 8,  max: 13, label: "Emerging Awareness",            desc: "You occasionally feel this inner layer, but it is not yet stable. Life may still be guided more by external structures. The awareness is emerging — and that is where every meaningful journey begins." },
  { min: 0,  max: 7,  label: "External Identity Orientation", desc: "Your identity is currently shaped more by roles, expectations, and environment. The inner layer may not yet be a central focus — and that is okay. Asking the question at all is the first step." },
];

const SECTION_NAMES = ["Inner Sense of Uniqueness", "Authentic vs Adapted Self", "Expression & Courage", "Inner Voice & Direction", "Depth & Meaning"];
const SECTION_SHORT = ["Uniqueness", "Authentic", "Expression", "Inner Voice", "Depth"];

const s = StyleSheet.create({
  page:        { padding: "1.6cm", fontFamily: "Helvetica", backgroundColor: "#F8FAF8" },
  header:      { marginBottom: 24, alignItems: "center" },
  tagline:     { fontSize: 9, color: GREEN, fontFamily: "Helvetica-Bold", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 },
  title:       { fontSize: 26, fontFamily: "Helvetica-Bold", color: TEXT, marginBottom: 4 },
  card:        { backgroundColor: WHITE, borderRadius: 12, padding: 24, marginBottom: 16, alignItems: "center" },
  card2:       { backgroundColor: WHITE, borderRadius: 12, padding: 24, marginBottom: 16 },
  scoreCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 6, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  scoreNum:    { fontSize: 30, fontFamily: "Helvetica-Bold", color: TEXT },
  scoreOf:     { fontSize: 11, color: MUTED },
  icon:        { fontSize: 28, marginBottom: 6 },
  label:       { fontSize: 20, fontFamily: "Helvetica-Bold", color: TEXT, marginBottom: 8 },
  badge:       { fontSize: 9, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", paddingHorizontal: 12, paddingVertical: 3, borderRadius: 10, marginBottom: 12 },
  desc:        { fontSize: 12, color: "#3a4a3a", lineHeight: 1.7, textAlign: "center", maxWidth: 380 },
  sectionTitle:{ fontSize: 13, fontFamily: "Helvetica-Bold", color: MUTED, marginBottom: 14 },
  barRow:      { marginBottom: 12 },
  barLabel:    { fontSize: 11, fontFamily: "Helvetica-Bold", color: TEXT, marginBottom: 4 },
  barTrack:    { height: 8, backgroundColor: "#E2E8F0", borderRadius: 4, overflow: "hidden" },
  barFill:     { height: 8, borderRadius: 4 },
  barScore:    { fontSize: 10, color: GREEN, fontFamily: "Helvetica-Bold", marginTop: 2, textAlign: "right" },
  scaleRow:    { flexDirection: "row", gap: 10, padding: 12, borderRadius: 10, marginBottom: 8, alignItems: "flex-start" },
  scaleIcon:   { fontSize: 16, marginRight: 8, marginTop: 1 },
  scaleLabel:  { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  scaleDesc:   { fontSize: 10, color: MUTED, lineHeight: 1.5 },
  ctaCard:     { backgroundColor: GREEN, borderRadius: 12, padding: 24, alignItems: "center", marginTop: 8 },
  ctaTitle:    { fontSize: 16, fontFamily: "Helvetica-Bold", color: WHITE, marginBottom: 8 },
  ctaText:     { fontSize: 11, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, textAlign: "center", marginBottom: 14 },
  ctaLink:     { fontSize: 12, fontFamily: "Helvetica-Bold", color: WHITE, textDecoration: "underline" },
  footer:      { marginTop: 16, alignItems: "center" },
  footerText:  { fontSize: 9, color: MUTED },
});

function BarChart({ sectionYes }: { sectionYes: number[] }) {
  const barW = 440;
  const barH = 10;
  const gap  = 28;
  const totalH = sectionYes.length * (barH + gap);

  return (
    <Svg width={barW} height={totalH}>
      {sectionYes.map((yes, i) => {
        const pct   = yes / 5;
        const fillW = Math.round(pct * barW);
        const y     = i * (barH + gap);
        const color = pct >= 0.8 ? GREEN : pct >= 0.6 ? "#2D5A8E" : pct >= 0.4 ? "#D97706" : "#94A3B8";
        return (
          <G key={i}>
            <Text style={{ fontSize: 10, fill: TEXT, fontFamily: "Helvetica-Bold" }} x={0} y={y - 2}>{SECTION_SHORT[i]}</Text>
            <Rect x={0} y={y + 8} width={barW} height={barH} rx={4} fill="#E2E8F0" />
            {fillW > 0 && <Rect x={0} y={y + 8} width={fillW} height={barH} rx={4} fill={color} />}
            <Text style={{ fontSize: 9, fill: color }} x={barW} y={y + 19} textAnchor="end">{yes}/5</Text>
          </G>
        );
      })}
    </Svg>
  );
}

interface Props {
  totalYes: number;
  sectionYes: number[];
  accessType: "quiz" | "consultation";
  calendlyUrl?: string;
}

export function TsdpPdfDocument({ totalYes, sectionYes, accessType, calendlyUrl }: Props) {
  const result = TSDP_RESULTS.find((r) => totalYes >= r.min && totalYes <= r.max) ?? TSDP_RESULTS[TSDP_RESULTS.length - 1];
  const color  = RESULT_COLORS[result.label] ?? GREEN;
  const icon   = RESULT_ICONS[result.label]  ?? "✨";

  return (
    <Document title="Unique Self Assessment Results" author="CoachAndrew">

      {/* ── PAGE 1: Score card ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.tagline}>CoachAndrew · Unique Self Assessment</Text>
          <Text style={s.title}>Your Results</Text>
        </View>

        <View style={s.card}>
          <View style={[s.scoreCircle, { borderColor: color }]}>
            <Text style={s.scoreNum}>{totalYes}</Text>
            <Text style={s.scoreOf}>/ 25</Text>
          </View>
          <Text style={s.icon}>{icon}</Text>
          <Text style={s.label}>{result.label}</Text>
          <View style={[s.badge, { backgroundColor: GREEN_LIGHT }]}>
            <Text style={{ color: GREEN }}>{totalYes} YES answers out of 25</Text>
          </View>
          <Text style={s.desc}>{result.desc}</Text>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>Breath. Move. Grow. — coachandrew.com</Text>
        </View>
      </Page>

      {/* ── PAGE 2: Dimensions + Breakdown ── */}
      <Page size="A4" style={s.page}>
        <View style={s.card2}>
          <Text style={s.sectionTitle}>Profile Dimensions</Text>
          <BarChart sectionYes={sectionYes} />
        </View>

        <View style={s.card2}>
          <Text style={s.sectionTitle}>Section Breakdown</Text>
          {SECTION_NAMES.map((name, i) => (
            <View key={name} style={s.barRow}>
              <Text style={s.barLabel}>{name}</Text>
              <View style={s.barTrack}>
                <View style={[s.barFill, { width: `${(sectionYes[i] / 5) * 100}%`, backgroundColor: GREEN }]} />
              </View>
              <Text style={s.barScore}>{sectionYes[i]} / 5</Text>
            </View>
          ))}
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>Breath. Move. Grow. — coachandrew.com</Text>
        </View>
      </Page>

      {/* ── PAGE 3: Scale + CTA ── */}
      <Page size="A4" style={s.page}>
        <View style={s.card2}>
          <Text style={s.sectionTitle}>Self-Discovery Activation Scale</Text>
          {TSDP_RESULTS.map((r) => {
            const c       = RESULT_COLORS[r.label] ?? GREEN;
            const isYours = r.label === result.label;
            return (
              <View key={r.label} style={[s.scaleRow, { backgroundColor: isYours ? "#EAF7EB" : "#F8FAFC", borderWidth: isYours ? 1.5 : 0, borderColor: c }]}>
                <Text style={s.scaleIcon}>{RESULT_ICONS[r.label]}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[s.scaleLabel, { color: c }]}>{r.label} · {r.min}–{r.max} YES</Text>
                  <Text style={s.scaleDesc}>{r.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {accessType === "consultation" && (
          <View style={s.ctaCard}>
            <Text style={s.ctaTitle}>📅 Book Your Consultation</Text>
            <Text style={s.ctaText}>You've unlocked a 30-minute 1-on-1 session with Andrew. Use your results to guide the conversation.</Text>
            <Text style={s.ctaLink}>{calendlyUrl ?? "https://calendly.com/a-misiek23/30min"}</Text>
          </View>
        )}

        <View style={s.footer}>
          <Text style={s.footerText}>Breath. Move. Grow. — coachandrew.com</Text>
        </View>
      </Page>

    </Document>
  );
}
