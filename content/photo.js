/* Photogrammetrie und Fernerkundung – Interaktives Lernskript + Klausur-Cheatsheet
   Quellen: GoodNotes „Digitale Photogrammetrie.pdf“ (Knoblach, mit Mitschrift), „UAV Photogrammetrie.pdf“,
   „Photogrammetrie und Mobile Mapping.pdf“, Übungen/„Digitale Photogrammetrie Zusammenfassungen.pdf“, „Laserscanning Zusammenfassung.pdf“,
   „Ü1 Schärfentiefe“, „Ü2 3D-Rekonstruktion in RealityScan“, „Ü3 TLS“, RealityScan-Übungen, UAV-Sicherheitsunterweisung; eLearning Kurs 33609. */
window.CONTENT = window.CONTENT || {};
(function(){
const R = String.raw;
CONTENT.photo = {
  title: "Photogrammetrie und Fernerkundung",
  lead: "Vom Lochkameramodell über Kollinearität und Bündelblockausgleichung zu UAV-Befliegung, Mobile Mapping und Laserscanning – mit allen Rechenaufgaben zu GSD, Footprint, Flughöhe, Disparität und Fehlerbudget.",
  sources: [
    "GoodNotes: Photogrammetrie/Digitale Photogrammetrie.pdf (Prof. Dr.-Ing. Knoblach, 76 S., mit Mitschrift)",
    "GoodNotes: UAV Photogrammetrie.pdf, Photogrammetrie und Mobile Mapping.pdf, UAV Sicherheitsunterweisung und Briefing.pdf",
    "GoodNotes: Übungen/Digitale Photogrammetrie Zusammenfassungen.pdf, Laserscanning Zusammenfassung.pdf (E. Heß), Ü1 Schärfentiefe, Ü2 RealityScan, Ü3 TLS",
    "eLearning Kurs 33609: Kursstruktur (Fernerkundungs-Abschnitt noch leer), Lernzielfragen (Titel; Inhalte nicht maschinenlesbar abrufbar)"
  ],
  chapters: []
};
const C = CONTENT.photo.chapters;

C.push({
  id: "grund", title: "Photogrammetrischer Prozess und Abbildungsmodell",
  intro: "Photogrammetrie rekonstruiert Form und Lage eines Objekts indirekt aus Bildern. Ein Bild allein verliert die Tiefe – erst mindestens zwei Bilder machen 3D-Koordinaten möglich.",
  sources: ["Digitale Photogrammetrie Folien 1–27", "Zusammenfassungen (Heß) – Grundlagen"],
  blocks: [
    { callout: "def", title: "Photogrammetrie", body: "Messverfahren, das Form und Lage (<b>Geometrie</b>) sowie inhaltliche Beschreibung (<b>Interpretation</b>) eines Objekts aus Bildern gewinnt. Fotografie projiziert 3D auf 2D; Photogrammetrie rekonstruiert aus <b>mindestens 2 Bildern</b> mathematisch das 3D-Objekt." },
    { olist: ["<b>Objekt</b>", "<b>Bildaufnahme</b>: physikalischer Entstehungsprozess, Sensor- und Kameratechnik", "<b>Bildmessung</b>: Objektpunkte identifizieren, Radiometrie (Grau-/Farbwerte) und Geometrie (Lage im Bild)", "<b>Objektrekonstruktion</b>: Transformation Bild ↔ Objekt (2D → 3D), Objektmodell"] },
    { h3: "Herausforderungen der Abbildung" },
    { list: ["verdeckte Bereiche", "begrenzte Auflösung („Wo genau ist die Ecke?“)", "wenig Kontrast", "projektive Verzerrung (Form und Lage nicht maßstäblich)", "optische Abbildungsfehler (Verzeichnung)", "radiometrische Änderungen (Beleuchtung, spiegelndes Glas)"] },
    { h3: "Lochkamera und Zentralprojektion" },
    { p: "Alle Abbildungsstrahlen sind Geraden durch das <b>Projektionszentrum O′</b>. Die Bildebene liegt im Abstand der <b>Kamerakonstante c</b> dahinter." },
    { h3: "Koordinatensysteme" },
    { table: { head: ["System", "Beschreibung"], rows: [
      ["Pixel-/Sensorsystem (u, v)", "2D, in Pixeln, Ursprung meist in der Bildecke"],
      ["Bildkoordinatensystem (x′, y′)", "2D in mm auf dem Sensor, bezogen auf den Bildhauptpunkt"],
      ["Kamerakoordinatensystem (x′, y′, z′)", "3D, Ursprung im Projektionszentrum, $z'=-c$ für Bildpunkte"],
      ["Objekt-/Weltkoordinatensystem (X, Y, Z)", "übergeordnetes 3D-System (z. B. ETRS89/UTM, Fahrzeugsystem)"]
    ]}},
    { callout: "info", title: "Negativ- und Positivlage", body: "Physikalisch entsteht das Bild in <b>Negativlage</b> (hinter O′, seitenverkehrt, auf dem Kopf). Am Monitor sieht man die <b>Positivlage</b> (vor O′, aufrecht). Rechnerisch gleichwertig, Vorzeichen beachten." },
    { h3: "Maßstab und Bodenauflösung (GSD)" },
    { formula: R`m=\frac{h}{c},\qquad GSD = m\cdot p = \frac{h\cdot p}{c},\qquad B_w = \frac{h\cdot S_w}{c}=N_w\cdot GSD,\qquad h_{max}=\frac{GSD\cdot c}{p}`, vars: ["$h$ – Aufnahmeabstand / Flughöhe über Grund", "$c$ – Kamerakonstante (≈ Brennweite f)", "$p$ – Pixelgröße (pixel pitch), z. B. 2.4 µm", "$S_w$ – Sensorbreite, $N_w$ – Pixel in der Breite, $B_w$ – Footprint-Breite"] },
    { callout: "trap", title: "Einheiten", body: "Alles in dieselbe Einheit bringen: h in mm, p in mm (2.4 µm = 0.0024 mm), c in mm. Häufigster Fehler: µm und mm verwechseln → Faktor 1000." },
    { steps: { title: "Drei GSD-Aufgaben aus der Übung", task: "1) h = 120 m, f = 24 mm, p = 2.4 µm. 2) $S_w$ = 36 mm, $N_w$ = 6000 px, h = 500 m, f = 50 mm. 3) GSD ≤ 2.5 cm/px, p = 3.45 µm, f = 35 mm – max. Flughöhe?", steps: [
      { t: "Aufgabe 1", b: R`$GSD=\frac{120\,000\cdot0.0024}{24}=12$ mm $=1.2$ cm/px` },
      { t: "Aufgabe 2 – Pixelgröße", b: R`$p=36/6000=0.006$ mm` },
      { t: "Aufgabe 2 – GSD und Footprint", b: R`$GSD=\frac{500\,000\cdot0.006}{50}=60$ mm $=6$ cm/px; $B_w=\frac{500\cdot36}{50}=360$ m $=6000\cdot0.06$ m ✓` },
      { t: "Aufgabe 3", b: R`$h=\frac{25\cdot35}{0.00345}=253\,623$ mm $\approx253.6$ m` }
    ]}},
    { quiz: [
      { type: "gap", q: "Drohne: h = 80 m, f = 8.8 mm, p = 2.4 µm. GSD in cm/px?", answer: 2.18, tol: 0.02, explain: "$80000\\cdot0.0024/8.8=21.8$ mm." },
      { type: "mc", q: "Wie viele Bilder braucht man mindestens für eine 3D-Rekonstruktion eines Punktes?", options: ["2", "1", "3", "4"], answer: 0, explain: "Zwei Bildstrahlen schneiden sich im Raum (Vorwärtsschnitt)." },
      { type: "mc", q: "Was verdoppelt sich, wenn man die Flughöhe verdoppelt (gleiche Kamera)?", options: ["GSD und Footprint", "nur die GSD", "die Pixelanzahl", "die Kamerakonstante"], answer: 0, explain: "Beide sind proportional zu h." }
    ]}
  ]
});

C.push({
  id: "orient", title: "Innere und äußere Orientierung, Kollinearität",
  intro: "Damit ein Bild messbar wird, muss man wissen, wie die Strahlen in der Kamera laufen (innere Orientierung) und wo die Kamera im Raum steht und wohin sie blickt (äußere Orientierung). Die Kollinearitätsgleichungen verbinden beides.",
  sources: ["Digitale Photogrammetrie Folien 21–46", "Mitschrift (Kollinearität, Parameter)"],
  blocks: [
    { table: { head: ["", "Innere Orientierung (IO)", "Äußere Orientierung (AO)"], rows: [
      ["beschreibt", "Strahlengang in der Kamera", "Lage und Ausrichtung der Kamera im Objektsystem"],
      ["Parameter", "Kamerakonstante c, Bildhauptpunkt $H'(x_0',y_0')$, Verzeichnung $\\Delta x',\\Delta y'$", "Projektionszentrum $X_0,Y_0,Z_0$ und Drehwinkel $\\omega,\\varphi,\\kappa$ (6 Freiheitsgrade)"],
      ["Bestimmung", "Kamerakalibrierung (Labor/Schachbrett oder simultan)", "Rückwärtsschnitt über Passpunkte, Bündelblock, GNSS/INS"]
    ]}},
    { list: [
      "<b>Bildhauptpunkt H′</b>: Lotfußpunkt von O′ auf die Bildebene, ungefähr Bildmitte.",
      "<b>Kamerakonstante c</b>: lotrechter Abstand O′ – Bildebene.",
      "<b>Verzeichnung</b>: radial-symmetrisch (tonnen-/kissenförmig, Brechung an den Linsen) und tangential-dezentrisch (Linsenmontage). Bei Weitwinkel/Fisheye besonders stark."
    ]},
    { formula: R`\mathbf{x}'_P=\begin{pmatrix}x'_P-x'_0-\Delta x'\\ y'_P-y'_0-\Delta y'\\ -c\end{pmatrix}`, vars: ["fehlerfreier Bildvektor aus gemessenen Bildkoordinaten"] },
    { h3: "Drehmatrix" },
    { formula: R`R=\begin{pmatrix}\cos\varphi\cos\kappa & -\cos\varphi\sin\kappa & \sin\varphi\\ \cos\omega\sin\kappa+\sin\omega\sin\varphi\cos\kappa & \cos\omega\cos\kappa-\sin\omega\sin\varphi\sin\kappa & -\sin\omega\cos\varphi\\ \sin\omega\sin\kappa-\cos\omega\sin\varphi\cos\kappa & \sin\omega\cos\kappa+\cos\omega\sin\varphi\sin\kappa & \cos\omega\cos\varphi\end{pmatrix}`, vars: ["Drehungen um X (ω), Y (φ), Z (κ) in dieser Reihenfolge", "R ist orthogonal: $R^{-1}=R^T$"] },
    { h3: "Kollinearitätsgleichungen – die Grundgleichungen" },
    { formula: R`x'_P=x'_0+z'\,\frac{r_{11}(X_P-X_0)+r_{21}(Y_P-Y_0)+r_{31}(Z_P-Z_0)}{r_{13}(X_P-X_0)+r_{23}(Y_P-Y_0)+r_{33}(Z_P-Z_0)}+\Delta x'` },
    { formula: R`y'_P=y'_0+z'\,\frac{r_{12}(X_P-X_0)+r_{22}(Y_P-Y_0)+r_{32}(Z_P-Z_0)}{r_{13}(X_P-X_0)+r_{23}(Y_P-Y_0)+r_{33}(Z_P-Z_0)}+\Delta y'`, vars: ["Objektpunkt, Projektionszentrum und Bildpunkt liegen auf einer Geraden", "$z'=-c$; IO: $x'_0,y'_0,c,\\Delta x',\\Delta y'$; AO: $X_0,Y_0,Z_0,\\omega,\\varphi,\\kappa$"] },
    { h3: "Rückwärts- und Vorwärtsschnitt" },
    { table: { head: ["Verfahren", "gegeben", "gesucht", "Bilanz"], rows: [
      ["Räumlicher Rückwärtsschnitt", "IO, ≥ 3 Passpunkte (X, Y, Z) mit Bildkoordinaten", "AO eines Bildes (6 Parameter)", "3 Punkte → 6 Gleichungen → 6 Unbekannte (lösbar)"],
      ["Räumlicher Vorwärtsschnitt", "IO + AO von ≥ 2 Bildern, Bildkoordinaten", "X, Y, Z des Neupunkts", "4 Bildkoordinaten → 3 Unbekannte (überbestimmt)"]
    ]}},
    { callout: "merke", body: "Neupunkte brauchen Vorwärtsschnitt → dafür AO → dafür Rückwärtsschnitt mit Passpunkten → dafür IO → dafür Kalibrierung. In der <b>Bündelblockausgleichung</b> wird alles simultan geschätzt (Simultankalibrierung) – deshalb ist meist keine separate Kalibrierung nötig." },
    { h3: "Kamerakalibrierung mit Schachbrett" },
    { p: "Ca. 20 Bilder eines ebenen Schachbretts (bekannte Eckkoordinaten X, Y, 0) aus unterschiedlichen Perspektiven. Die Ecken werden automatisch erkannt. Unbekannt: IO (für alle Bilder gleich) und AO (je Bild). Ergebnis vor allem: $x'_0, y'_0, c, \\Delta x', \\Delta y'$." },
    { callout: "trap", title: "Hardware-Checkliste", body: "Autofokus <b>aus</b> und Fokus fixieren, Festbrennweite (sonst ändert sich c unbemerkt), Bildstabilisator aus (Drift auf Stativ), Spiegelvorauslösung. Jede Änderung an Fokus oder Zoom macht die Kalibrierung ungültig." },
    { quiz: [
      { type: "mc", q: "Welche Parameter gehören zur inneren Orientierung?", options: ["c, x′₀, y′₀, Verzeichnung", "X₀, Y₀, Z₀", "ω, φ, κ", "Passpunktkoordinaten"], answer: 0, explain: "Alles, was den Strahlengang innerhalb der Kamera beschreibt." },
      { type: "gap", q: "Wie viele Passpunkte braucht ein räumlicher Rückwärtsschnitt mindestens?", answer: 3, tol: 0, explain: "6 AO-Unbekannte, jeder Punkt liefert 2 Gleichungen." },
      { type: "bug", q: "Fehler finden:", lines: ["IO: c, x'0, y'0, Δx', Δy'", "AO: X0, Y0, Z0, ω, φ, κ", "Vorwärtsschnitt braucht nur ein Bild", "Bündelblock schätzt IO und AO simultan"], answer: 2, explain: "Vorwärtsschnitt braucht ≥ 2 Bilder mit bekannter Orientierung." }
    ]}
  ]
});

C.push({
  id: "buendel", title: "Bildzuordnung, Bündelblock und dichte Punktwolken",
  intro: "Moderne Auswertung (RealityScan, Metashape, Pix4D) läuft in fünf Schritten: Merkmale finden, zuordnen, Passpunkte messen, Bündelausgleichung, dichte Bildzuordnung. Jeder Schritt hat typische Prüfungsfragen.",
  sources: ["Digitale Photogrammetrie Folien 43–68", "Zusammenfassungen (Heß): Epipolargeometrie", "Mitschrift (SIFT, SGM)"],
  blocks: [
    { olist: [
      "<b>Merkmalsextraktion</b> (z. B. SIFT, SURF, FAST, Förstner-Operator): lokal einzigartige, invariante, robuste Punkte; je Punkt ein Deskriptor (Gradienten-Orientierungshistogramme, z. B. 16×16-Umgebung).",
      "<b>Merkmalszuordnung / Matching</b>: Deskriptoren über alle Bilder vergleichen (euklidische Distanz). Erst ein Punkt in ≥ 2 Bildern wird zur Verknüpfung.",
      "<b>Passpunkte messen</b> (falls vorhanden) – für den Bezug zum übergeordneten System.",
      "<b>Bündelblockausgleichung</b>: IO, AO und 3D-Punkte so schätzen, dass die Summe der <b>Reprojektionsfehler</b> minimal wird → dünne (sparse) Punktwolke.",
      "<b>Dichte Bildzuordnung</b> (z. B. Semi-Global Matching, SGM) → dichte (dense) Punktwolke, Mesh, DOM, Orthophoto."
    ]},
    { callout: "def", title: "Reprojektionsfehler", body: "Der berechnete 3D-Punkt wird mit den Kollinearitätsgleichungen zurück ins Bild projiziert und mit den gemessenen Pixelkoordinaten verglichen. Die Differenz ist der Reprojektionsfehler (in Pixeln) – das Qualitätsmaß jeder Bündelblockausgleichung." },
    { table: { head: ["Verknüpfung durch", "Vorteile", "Nachteile"], rows: [
      ["visuell/manuell", "Anzahl und Verteilung in der Hand des Auswerters", "sehr zeitaufwendig; Genauigkeit hängt von Sorgfalt ab"],
      ["codierte Zielmarken", "keine manuelle Messung, hohe Zuverlässigkeit und Genauigkeit (Korrelation)", "Aufwand beim Anbringen; Objekt optisch verändert"],
      ["Merkmalspunkte", "kein Zusatzaufwand, schnell, sehr viele Punkte", "keine Kontrolle über Anzahl/Verteilung; braucht Textur"]
    ]}},
    { h3: "Epipolargeometrie" },
    { p: "Die Ebene durch beide Projektionszentren O₁, O₂ (Basis B) und den Objektpunkt heißt Epipolarebene. Ihre Schnittlinie mit der Bildebene ist die <b>Epipolarlinie</b>: Der Partnerpunkt muss auf ihr liegen – die Suche wird von 2D auf 1D reduziert. Nach der <b>Rektifizierung</b> fallen Epipolarlinien mit Bildzeilen zusammen." },
    { formula: R`Z = \frac{c\cdot B}{d}`, vars: ["$Z$ – Tiefe (Aufnahmeabstand)", "$B$ – Basis zwischen den Bildern", "$d$ – Disparität (Versatz Such-/Partnerpixel, gleiche Einheit wie c)"] },
    { steps: { title: "Tiefe aus Disparität", task: "c = 4000 px, B = 0.5 m, d = 40 px. Wie weit ist der Punkt entfernt, und wie ändert sich Z bei d = 41 px?", steps: [
      { t: "Tiefe", b: R`$Z=4000\cdot0.5/40=50$ m` },
      { t: "1 px mehr", b: R`$Z=2000/41=48.78$ m – ein Pixel Disparitätsfehler ≈ 1.2 m Tiefenfehler` },
      { t: "Folgerung", b: "Tiefengenauigkeit ∝ Z²/(c·B): größere Basis und kürzere Entfernung verbessern sie quadratisch." }
    ]}},
    { h3: "Aufnahmekonfiguration" },
    { list: [
      "Günstige Schnittgeometrie (große Schnittwinkel) – schleifende Schnitte vermeiden.",
      "Objekt im Zentrum: umrunden. Fassade: Aufnahmeabstände variieren. Innenraum: jeweils die gegenüberliegende Wand fotografieren.",
      "Hohe Überlappung; texturierte Oberflächen (Glas und einfarbige Flächen sind problematisch)."
    ]},
    { table: { head: ["Schritt", "Rechenzeit"], rows: [["Merkmale finden", "Sekunden – Minuten"], ["Korrespondenzsuche", "Sekunden – Minuten"], ["Bündelblock", "Sekunden – Minuten"], ["Dichte Bildzuordnung", "Minuten – Stunden"]] } },
    { quiz: [
      { type: "order", q: "Ordne den photogrammetrischen Auswerteablauf:", steps: ["Merkmalsextraktion", "Merkmalszuordnung", "Passpunkte messen", "Bündelblockausgleichung", "Dichte Bildzuordnung"] },
      { type: "mc", q: "Was minimiert die Bündelblockausgleichung?", options: ["Summe der Reprojektionsfehler", "Anzahl der Bilder", "Disparität", "Belichtungszeit"], answer: 0, explain: "Kleinste Quadrate über die Bildkoordinaten-Residuen." },
      { type: "gap", q: "c = 3000 px, B = 0.2 m, d = 12 px. Tiefe Z in m?", answer: 50, tol: 0.1, explain: "$3000\\cdot0.2/12=50$ m." }
    ]}
  ]
});

C.push({
  id: "kamera", title: "Digitalkamera, Belichtung und Schärfentiefe",
  intro: "Messbilder sind nur so gut wie die Aufnahme. Ü1 untersucht mit einer Nikon D750, wie Blende und Brennweite die Schärfentiefe verändern – und warum Automatiken aus sein müssen.",
  sources: ["Zusammenfassungen (Heß): Schärfentiefe und Funktionsweise der Digitalkamera", "Ü1 Kennenlernen einer DSLR (Nikon D750)"],
  blocks: [
    { h3: "Sensor" },
    { list: [
      "<b>Photodiode</b> (PIN): innerer photoelektrischer Effekt, misst nur Intensität, keine Farbe.",
      "<b>Bayer-Filter</b> RGGB: 50 % Grün, je 25 % Rot und Blau; Farbe durch <b>Demosaicing</b> interpoliert.",
      "<b>CCD</b>: Ladung über Schieberegister zu zentralem Verstärker – homogen, aber langsam, stromhungrig.",
      "<b>CMOS</b>: Verstärker je Pixel, paralleles Auslesen, hohe Bildraten, wenig Strom – Standard heute."
    ]},
    { h3: "Belichtungsdreieck" },
    { table: { head: ["Parameter", "steuert", "Nebenwirkung"], rows: [
      ["Blende k = f/D", "Lichtmenge", "kleine k (f/1.4): wenig Schärfentiefe; große k (f/16): viel Schärfentiefe, aber Beugungsunschärfe"],
      ["Verschlusszeit t", "Belichtungsdauer", "lange Zeit → Bewegungsunschärfe (Stativ, Fernauslöser)"],
      ["ISO", "Verstärkung vor A/D-Wandlung", "verstärkt auch Rauschen → schlechteres SNR"]
    ]}},
    { formula: R`SNR=\frac{S}{\sigma_{ges}}=\frac{S}{\sqrt{S+\sigma_{Auslese}^2+\sigma_{Dunkel}^2}}`, vars: ["$S$ – Signal (Photonenrauschen $\\sqrt S$)", "ISO erzeugt kein Licht, nur Verstärkung"] },
    { callout: "merke", body: "Messaufnahme: kleine Blende (k ≥ 11) für Schärfentiefe + niedriger ISO (≤ 400) → lange Belichtung → Stativ. Fokus manuell, Stabilisator aus, Einzelbild, manueller Modus." },
    { h3: "Ü1: 9-Bilder-Matrix" },
    { p: "Kamera ca. 3 m vor einer schräg in die Tiefe gelegten 4-m-Latte, einmal auf die 2-m-Marke fokussiert. ISO fest 1000. Brennweiten 28/50/85 mm × Blenden f/4, f/8, f/22. Auswertung bei 100 % Pixelansicht: Bereich der Schärfentiefe entlang der Skala je Bild." },
    { list: ["Größere Blendenzahl → größere Schärfentiefe", "Längere Brennweite → geringere Schärfentiefe", "Bei f/22 sichtbare Beugungsunschärfe trotz großer Schärfentiefe"] },
    { quiz: [
      { type: "mc", q: "Warum muss der Autofokus für Messaufnahmen deaktiviert werden?", options: ["Fokusänderung ändert die Kamerakonstante (IO)", "Er verbraucht zu viel Strom", "Er erhöht das Rauschen", "Er verändert den ISO-Wert"], answer: 0, explain: "c und Verzeichnung hängen von der Fokuseinstellung ab." },
      { type: "mc", q: "Welche Farbe ist im Bayer-Filter doppelt vertreten?", options: ["Grün", "Rot", "Blau", "keine"], answer: 0, explain: "RGGB – angepasst an das menschliche Auge." }
    ]}
  ]
});

C.push({
  id: "uav", title: "UAV-Photogrammetrie",
  intro: "Drohnen liefern Bilder mit Zentimeter-GSD aus geringer Höhe. Für den Klausurstoff zählen Drohnentypen, Sensorik, Georeferenzierung (GCP vs. RTK), Datenprodukte und Recht.",
  sources: ["UAV Photogrammetrie.pdf", "UAV Sicherheitsunterweisung und Briefing.pdf", "Übung UAV-Auswertung in RealityScan (Mavic 3, Phantom 4 RTK, GCPs Stadion)"],
  blocks: [
    { callout: "def", title: "UAV / UAS", body: "<b>UAV</b> (unmanned aerial vehicle) bezeichnet nur das Fluggerät. <b>UAS</b> (unmanned aircraft system) das Gesamtsystem mit Copter, Steuerung, Bodenstation." },
    { table: { head: ["", "Multicopter", "Starrflügler (Fixed Wing)"], rows: [
      ["Vorteile", "senkrechter Start/Landung, wenig Platz, Position halten, hohe Auflösung", "große Reichweite und Flughöhe, windunempfindlicher"],
      ["Nachteile", "kurze Flugzeit, kleine Gebiete, windempfindlich", "geringere Auflösung, Platz für Start/Landung, kein Schweben"]
    ]}},
    { h3: "Sensorik" },
    { list: ["<b>GNSS</b>: globale Position (Breite, Länge, ellipsoidische Höhe)", "<b>INS/IMU</b>: 3-Achs-Beschleunigung + 3-Achs-Gyroskop → Roll, Pitch, Yaw", "Barometer, Ultraschall, Stereo-Vision-Sensoren", "GNSS/IMU liefern Startwerte X₀, Y₀, Z₀, ω, φ, κ für die Bündelausgleichung"] },
    { h3: "Georeferenzierung" },
    { table: { head: ["Konfiguration", "Genauigkeit Bildpositionen", "GCPs"], rows: [
      ["„Nicht-RTK“-Drohne", "absolut < 10 m (Meterbereich)", "<b>notwendig</b>"],
      ["RTK-Drohne mit Korrekturdienst (SAPOS)", "1–2 cm", "optional, als Kontrolle empfohlen"],
      ["RTK-Drohne mit eigener Basis", "relativ 1–2 cm", "optional, als Kontrolle"]
    ]}},
    { callout: "def", title: "RTK", body: "Real-Time Kinematic: Korrekturdaten einer Referenzstation (Basis oder Dienst wie SAPOS) und Auswertung der <b>Trägerphasen</b> liefern die Position in Echtzeit zentimetergenau." },
    { p: "<b>Verknüpfungspunkte</b> liefern die relative Orientierung des Bildverbands, <b>Ground Control Points (GCP)</b> die absolute Orientierung im übergeordneten System." },
    { h3: "Datenprodukte" },
    { table: { head: ["Produkt", "Beschreibung"], rows: [
      ["Dichte Punktwolke", "Ergebnis der dichten Bildzuordnung"],
      ["Mesh-Modell", "vermaschte, texturierte Oberfläche"],
      ["DOM (digitales Oberflächenmodell)", "Raster (GeoTIFF), jede Zelle speichert eine Höhe Z statt RGB"],
      ["Orthophoto / Orthomosaik", "verzerrungsfrei und lagerichtig in Parallelprojektion (über das DOM entzerrt) → <b>messbar</b>; Mosaik aus vielen Bildern"]
    ]}},
    { h3: "Recht (EU-Drohnenverordnung, LuftVO)" },
    { table: { head: ["Kategorie", "Klasse", "Regel", "Nachweis"], rows: [
      ["A1", "C0 < 250 g", "Überflug Unbeteiligter erlaubt (keine Ansammlungen)", "keiner"],
      ["A1", "C1 < 900 g", "kein Überflug Unbeteiligter", "Fernpiloten-Zeugnis A1/A3"],
      ["A2", "C2 < 4 kg", "30 m Sicherheitsabstand", "Fernpiloten-Zeugnis A2"],
      ["A3", "C3/C4 < 25 kg", "150 m Abstand zu Wohn-/Gewerbegebieten, weit entfernt von Menschen", "A1/A3"]
    ]}},
    { list: ["Menschenansammlungen nie überfliegen; Unbeteiligte bei > 250 g nicht überfliegen", "Geografische Gebiete nach § 21h LuftVO beachten (Flughäfen, Naturschutz, Wohngrundstücke, Bundesfernstraßen) – Ausnahmegenehmigungen möglich"] },
    { h3: "Beispiel-Drohne und Software" },
    { p: "DJI Phantom 4 RTK: 1391 g, 30 min Flugzeit, 20 MP. Flugplanung z. B. mit Pix4Dcapture (Gebiet, Überlappung, Flughöhe). Auswertung: RealityScan, Pix4D, Metashape, PhotoModeler, Trimble Business Center, ArcGIS Pro; Open Source: VisualSfM, COLMAP." },
    { quiz: [
      { type: "mc", q: "Wofür braucht eine RTK-Drohne noch GCPs?", options: ["Als unabhängige Kontrolle (Checkpoints)", "Für die relative Orientierung", "Für die Flugplanung", "Gar nicht, sie sind verboten"], answer: 0, explain: "Georeferenzierung erfolgt über RTK; GCPs prüfen das Ergebnis." },
      { type: "mc", q: "Was unterscheidet ein Orthophoto von einem Luftbild?", options: ["Parallelprojektion, lagerichtig und messbar", "Höhere Auflösung", "Es ist farbig", "Es zeigt nur Gebäude"], answer: 0, explain: "Entzerrung über das Oberflächenmodell beseitigt Reliefversatz." },
      { type: "mc", q: "Eine 600-g-Drohne der Klasse C1: Darf sie über einen Passanten fliegen?", options: ["Nein", "Ja", "Ja, unter 50 m Höhe", "Nur mit A2-Zeugnis"], answer: 0, explain: "C1: kein Überflug unbeteiligter Personen." }
    ]}
  ]
});

C.push({
  id: "mms", title: "Mobile Mapping",
  intro: "Mobile Mapping erfasst raumbezogene Daten von einer bewegten Plattform. Die Kamera bekommt ihre äußere Orientierung aus einer Trajektorie – und damit werden Zeit- und Winkelfehler direkt zu Punktfehlern.",
  sources: ["Photogrammetrie und Mobile Mapping.pdf (Folien 1–5 Abschnitte)"],
  blocks: [
    { callout: "def", title: "Mobile Mapping", body: "Erfassung raumbezogener Daten durch eine Kombination unterschiedlicher Sensoren auf einer Trägerplattform, die sich während der Aufnahme überwiegend kontinuierlich fortbewegt (Fahrzeug, UAV, Backpack)." },
    { table: { head: ["Modul", "Sensoren", "Aufgabe"], rows: [
      ["Direct Georeferencing Module (DGM)", "GNSS, IMU/INS, Barometer", "Trajektorie: Ort und Orientierung im Zielsystem (meist WGS84)"],
      ["Remote Acquisition Module", "Kamera, Laserscanner, Radar", "Erfassung des Messobjekts"]
    ]}},
    { list: ["<b>Trajektorie</b> = zeitabhängige äußere Orientierung (X, Y, Z, Roll, Pitch, Yaw) alle ~5–20 ms", "IMU misst relativ zur letzten Position → <b>Drift</b> (Fehler summieren sich); GNSS liefert absolute Stützung, fällt aber bei Abschattung aus", "Rolle der Kamera: 3D-Erfassung, Kolorierung von Punktwolken, Visual Odometry/SLAM, Interpretation (Verkehrszeichen, Markierungen)"] },
    { h3: "Georeferenzierung" },
    { table: { head: ["", "indirekt", "direkt", "integriert"], rows: [
      ["Prinzip", "AO aus Pass- und Verknüpfungspunkten (Bündelblock)", "AO direkt aus GNSS/INS + Systemkalibrierung", "GNSS/INS als gewichtete Beobachtungen im Bündelblock + wenige Passpunkte"],
      ["+", "hohe Genauigkeit, Kontrolle", "keine Passpunkte, echtzeitfähig", "robust, Driftkorrektur, Simultankalibrierung"],
      ["−", "Passpunkte aufwendig, nicht echtzeitfähig", "abhängig von GNSS-Empfang/IMU-Drift; Kalibrier- und Zeitfehler wirken ungedämpft", "rechenintensiv"],
      ["Beispiel", "Nicht-RTK-Drohne mit GCPs", "klassisches Messfahrzeug", "moderne MMS, RTK-Drohnen"]
    ]}},
    { h3: "Systemkalibrierung" },
    { list: ["IO jeder Kamera (Weitwinkel/Fisheye → starke Verzeichnung)", "relative Orientierung Kamera–Kamera (Basis $b_x,b_y,b_z$, Drehwinkel)", "<b>Hebelarm</b> (lever arm): Translation DGS-Zentrum → Projektionszentrum", "<b>Boresight</b>: Verdrehung IMU- gegen Kamerasystem", "Hebelarm GNSS-Antenne – IMU"] },
    { h3: "Fehlerbudget" },
    { formula: R`\Delta s_{Zeit}=v\cdot\Delta t,\qquad \Delta s_{Winkel}=D\cdot\tan\Delta\alpha`, vars: ["$v$ – Fahrgeschwindigkeit [m/s], $\\Delta t$ – Zeitversatz Kamera/Trajektorie", "$D$ – Aufnahmeentfernung, $\\Delta\\alpha$ – Winkelfehler (IMU oder Boresight)"] },
    { steps: { title: "Wie groß wird der Fehler?", task: "a) 72 km/h, Δt = 1 ms. b) Δα = 0.05°, D = 30 m.", steps: [
      { t: "a) Geschwindigkeit", b: R`$72$ km/h $=20$ m/s` },
      { t: "a) Lagefehler längs", b: R`$\Delta s=20\cdot0.001=0.02$ m $=2$ cm` },
      { t: "b) Punktfehler quer", b: R`$\Delta s=30\cdot\tan0.05^\circ=0.026$ m $=2.6$ cm` },
      { t: "Folgerung", b: "Synchronisation im Millisekundenbereich und Boresight-Kalibrierung auf hundertstel Grad sind Pflicht." }
    ]}},
    { h3: "Bildbasierte Navigation" },
    { list: ["Kamera in Fahrtrichtung: Basis liegt in Blickrichtung → schleifende Schnitte nahe dem Fluchtpunkt", "Kamera seitlich: günstige Schnittwinkel (Normalfall) → seitliche/schräge Kameras, hohe Bildfrequenz", "<b>Structure from Motion</b>: die Bewegung erzeugt die Basis", "<b>Visual Odometry</b>: Kamerabewegung Bild für Bild schätzen; <b>Visual SLAM</b>: zusätzlich Karte aufbauen und Schleifen schließen → stützt Trajektorie bei GNSS-Ausfall"] },
    { quiz: [
      { type: "gap", q: "MMS fährt 50 km/h, Zeitversatz 2 ms. Lagefehler in cm?", answer: 2.78, tol: 0.03, explain: "$13.89\\cdot0.002=0.0278$ m." },
      { type: "mc", q: "Was beschreibt der Boresight-Winkel?", options: ["Verdrehung zwischen IMU- und Kamerakoordinatensystem", "Abstand GNSS-Antenne – IMU", "Öffnungswinkel der Kamera", "Drift der IMU"], answer: 0, explain: "Der Abstand ist der Hebelarm." },
      { type: "mc", q: "Warum sind nach vorn blickende Kameras für die Triangulation ungünstig?", options: ["Schleifende Schnitte, da die Basis in Blickrichtung liegt", "Zu viel Licht", "Sie sehen keine Fassaden", "Sie sind nicht kalibrierbar"], answer: 0, explain: "Kleine Schnittwinkel vergrößern den Punktfehler." }
    ]}
  ]
});

C.push({
  id: "tls", title: "Terrestrisches Laserscanning",
  intro: "Ein Laserscanner misst berührungslos und flächenhaft Millionen Punkte über ein Winkelraster mit elektrooptischer Distanzmessung. Prüfungsrelevant sind Messprinzip, Distanzverfahren und Registrierung.",
  sources: ["Laserscanning Zusammenfassung (Heß, nach Holst/Wieser)", "Ü3 TLS (Z+F IMAGER 5016)"],
  blocks: [
    { table: { head: ["", "Tachymeter", "Laserscanner"], rows: [
      ["Punktauswahl", "gezielt, semantisch", "keine Vorauswahl, Raster (fehlende Semantik)"],
      ["Rate", "ca. 30 s pro Punkt manuell", "bis 2 MHz"],
      ["Prinzip", "Genauigkeit schlägt Redundanz", "Redundanz durch Punktdichte"]
    ]}},
    { p: "<b>3D-Polaranhängen</b>: Jeder Punkt aus Horizontalwinkel, Vertikalwinkel und Strecke. Winkelmessung wie beim Tachymeter (inkrementelle Kodierung, Grob- und Feinmessung), aber Teilkreisabgriff nur ca. 10 kHz – Konflikt mit 2 MHz Messrate." },
    { h3: "Distanzmessung" },
    { table: { head: ["Kriterium", "Impulsverfahren", "Phasenvergleich"], rows: [
      ["Messzeit/Eindeutigkeit", "schnell, eindeutig", "länger (mehrere Maßstäbe)"],
      ["Reichweite", "größer", "durch Modulationswelle begrenzt"],
      ["Genauigkeit/Auflösung", "geringer (Zeitmessung)", "hoch (digitale Phasenmessung)"]
    ]}},
    { formula: R`\text{Impuls: } D=\frac{c\cdot\Delta t}{2},\qquad \text{Phase: } D=N\cdot\frac{\lambda}{2}+\frac{\Delta\varphi}{2\pi}\cdot\frac{\lambda}{2}`, vars: ["Eindeutigkeitsbereich = λ/2; Grobmaßstab (niedrige f) löst N, Feinmaßstab (hohe f) liefert Genauigkeit", "Beispiel: 15 MHz → λ = 20 m, Eindeutigkeit 10 m"] },
    { list: ["<b>Strahldivergenz</b>: Laserfleck wächst mit der Entfernung → begrenzt die räumliche Auflösung", "<b>Intensität</b> wird mitgemessen (Reflektivität)", "<b>Zweiachs-Neigungssensor</b>: Stehachsschiefe; Winkel werden automatisch korrigiert; liefert Vorinformation für die Registrierung"] },
    { h3: "Registrierung" },
    { p: "Alle Einzelscans in ein gemeinsames Koordinatensystem überführen (Gesamtpunktwolke)." },
    { table: { head: ["Strategie", "Beispiele"], rows: [["Zusatzhardware", "Neigungssensor, GNSS, Kamera, Kompass, Tachymeter"], ["Künstliche Zielzeichen", "Schachbrett-/Tilt-and-Turn-Targets, Kugeln, Zylinder"], ["Punktwolkenbasiert", "ICP, Objektkorrespondenzen, Punktfeatures"]] } },
    { callout: "merke", body: "<b>Mindestens 3 gemeinsame Targets</b> pro Standpunktpaar: Eine räumliche Transformation hat 6 Freiheitsgrade (3 Translationen, 3 Rotationen); 3 Punkte liefern 9 Koordinaten → Überbestimmung. Targets nicht kollinear und mit günstigen Schnittwinkeln aufstellen." },
    { list: ["Kugeltargets: Mittelpunkt durch Kugelausgleichung", "Flachtargets (schwarz-weiß): Zentrum durch Geradenschnitt", "<b>ICP</b> (Iterative Closest Point): iterativ nächste Punktpaare zuordnen und Transformation schätzen; braucht gute Vorregistrierung, sonst lokale Minima"] },
    { callout: "ex", title: "Ü3 TLS", body: "Fassade Gebäude A mit Z+F IMAGER 5016 (Phasenvergleich) von 8 Standpunkten. Auflösung Middle (12.5 mm Punktabstand auf 10 m), Qualität Balanced (≈ 7.4 min/Scan), i-Cam + SmartLight. Zwischen aufeinanderfolgenden Standpunkten Sicht auf ≥ 3 identische Targets." },
    { quiz: [
      { type: "mc", q: "Warum mindestens 3 Targets für die Registrierung?", options: ["6 Freiheitsgrade, 3 Punkte liefern 9 Gleichungen (überbestimmt)", "Weil der Scanner 3 Achsen hat", "Für die Farbe", "Wegen der Intensität"], answer: 0, explain: "2 Punkte (6 Koordinaten) würden die Rotation um ihre Verbindungsachse nicht festlegen." },
      { type: "gap", q: "Modulationsfrequenz 150 kHz. Eindeutigkeitsbereich in m? (c ≈ 3·10⁸ m/s)", answer: 1000, tol: 1, explain: "λ = 2000 m, Eindeutigkeit λ/2 = 1000 m." },
      { type: "mc", q: "Was ist die Hauptgefahr beim ICP?", options: ["Konvergenz in ein lokales Minimum bei schlechter Vorregistrierung", "Zu hohe Genauigkeit", "Er braucht Targets", "Er funktioniert nur mit Farbe"], answer: 0, explain: "Falsche Punktpaare → falsche Lösung." }
    ]}
  ]
});

C.push({
  id: "uebungen", title: "Übungen und Fernerkundung",
  intro: "Überblick über die Laborübungen mit RealityScan und den aktuellen Stand des Fernerkundungsteils.",
  sources: ["Ü2 3D-Rekonstruktion in RealityScan", "Übung Objektrekonstruktion RealityScan", "Übung UAV-Auswertung in RealityScan", "eLearning 33609 (Abschnitt Fernerkundung)"],
  blocks: [
    { table: { head: ["Übung", "Inhalt", "Lernpunkt"], rows: [
      ["Ü1 DSLR", "9-Bilder-Matrix Blende × Brennweite", "Schärfentiefe, Belichtungsdreieck"],
      ["Ü2 RealityScan", "3D-Objektrekonstruktion aus Fotoserie", "Ausrichten (Merkmale + Bündel), Maßstab über Strecken/Passpunkte, Mesh, Textur"],
      ["UAV-Auswertung", "Mavic-3- und Phantom-4-RTK-Daten, GCPs Stadion", "GCPs messen, Kontrollpunkte, Orthomosaik und DOM, RTK vs. GCP vergleichen"],
      ["Ü3 TLS", "Fassade mit Z+F 5016", "Standpunkt- und Targetplanung, Registrierung"]
    ]}},
    { recipe: { title: "RealityScan-Workflow", steps: ["Bilder importieren", "Ausrichten (Align) → Komponenten prüfen, Reprojektionsfehler", "Passpunkte/GCPs setzen, Maßstab definieren", "Region festlegen, Modell rechnen (Normal/High Detail)", "Texturieren, vereinfachen, exportieren (Mesh, Punktwolke, Ortho, DOM)"] } },
    { callout: "info", title: "Fernerkundung", body: "Der Fernerkundungsabschnitt im eLearning ist noch leer, und in GoodNotes liegt noch kein Material. Sobald Unterlagen erscheinen, wird dieses Kapitel ergänzt (u. a. Spektralbereiche, Sensoren, Klassifikation, Vegetationsindizes wie NDVI)." }
  ]
});

CONTENT.photo.cheatsheet = {
  lead: "Formeln, Definitionen und Vergleiche für die Klausur Photogrammetrie und Fernerkundung.",
  sections: [
    { title: "1 · Maßstab & GSD", blocks: [
      { formula: R`m=\tfrac{h}{c},\ \ GSD=\tfrac{h\,p}{c},\ \ B_w=\tfrac{h\,S_w}{c},\ \ h_{max}=\tfrac{GSD\,c}{p}` },
      { list: ["120 m, 24 mm, 2.4 µm → 1.2 cm/px", "500 m, 50 mm, 6 µm → 6 cm/px, Footprint 360 m", "GSD 2.5 cm, 35 mm, 3.45 µm → h ≈ 253.6 m", "Einheiten: alles in mm!"] }
    ]},
    { title: "2 · Orientierung", blocks: [
      { table: { head: ["IO", "AO"], rows: [["c, x′₀, y′₀, Δx′, Δy′", "X₀, Y₀, Z₀, ω, φ, κ"], ["Kalibrierung", "Rückwärtsschnitt / GNSS-INS"]] } },
      { formula: R`x'=x'_0+z'\tfrac{r_{11}\Delta X+r_{21}\Delta Y+r_{31}\Delta Z}{r_{13}\Delta X+r_{23}\Delta Y+r_{33}\Delta Z}+\Delta x'` },
      { formula: R`y'=y'_0+z'\tfrac{r_{12}\Delta X+r_{22}\Delta Y+r_{32}\Delta Z}{r_{13}\Delta X+r_{23}\Delta Y+r_{33}\Delta Z}+\Delta y'`, vars: ["$z'=-c$, $\\Delta X=X_P-X_0$ usw."] },
      { list: ["Rückwärtsschnitt: ≥ 3 Passpunkte → AO", "Vorwärtsschnitt: ≥ 2 orientierte Bilder → XYZ", "Bündelblock: alles simultan, min. Σ Reprojektionsfehler"] }
    ]},
    { title: "3 · Auswertekette", blocks: [
      { olist: ["Merkmale (SIFT, SURF, FAST, Förstner)", "Matching (Deskriptor-Distanz)", "Passpunkte", "Bündelblock → sparse", "Dichte Zuordnung (SGM) → dense, Mesh, DOM, Ortho"] },
      { formula: R`Z=\tfrac{c\,B}{d}` },
      { list: ["Epipolarlinie: Suche 2D → 1D", "Rektifizierung: Epipolarlinien = Bildzeilen"] }
    ]},
    { title: "4 · Kamera", blocks: [
      { list: ["k = f/D; großes k → viel Schärfentiefe, Beugung", "ISO verstärkt Rauschen; SNR = S/√(S+σ²ₐ+σ²d)", "Bayer RGGB, Demosaicing; CCD vs. CMOS", "Messaufnahme: AF aus, VR aus, Festbrennweite, Stativ"] }
    ]},
    { title: "5 · UAV", blocks: [
      { table: { head: ["", "GCPs"], rows: [["Nicht-RTK (< 10 m)", "notwendig"], ["RTK (1–2 cm)", "nur Kontrolle"]] } },
      { list: ["UAV = Gerät, UAS = System", "Multicopter vs. Fixed Wing", "DOM = Höhenraster; Orthophoto = messbar, lagerichtig", "C0 < 250 g · C1 < 900 g · C2 < 4 kg (30 m) · C3/C4 < 25 kg (150 m)", "§ 21h LuftVO geografische Gebiete"] }
    ]},
    { title: "6 · Mobile Mapping", blocks: [
      { formula: R`\Delta s=v\,\Delta t;\qquad \Delta s=D\tan\Delta\alpha` },
      { list: ["72 km/h, 1 ms → 2 cm; 30 m, 0.05° → 2.6 cm", "DGM (GNSS, IMU) + Remote Module (Kamera, Scanner)", "indirekt / direkt / integriert", "Hebelarm = Translation, Boresight = Rotation", "IMU-Drift; Visual Odometry/SLAM"] }
    ]},
    { title: "7 · Laserscanning", blocks: [
      { formula: R`D_{Impuls}=\tfrac{c\,\Delta t}{2};\quad \text{Eindeutigkeit}=\tfrac{\lambda}{2}=\tfrac{c}{2f}` },
      { list: ["Impuls: Reichweite; Phase: Genauigkeit", "Registrierung ≥ 3 Targets (6 DoF)", "ICP braucht Vorregistrierung (lokale Minima)", "Kugel → Ausgleichung, Flachtarget → Geradenschnitt"] }
    ]}
  ]
};
})();
