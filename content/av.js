/* Angewandte Vermessung – Interaktives Lernskript + Cheatsheet (Prüfung: Portfolio aus 5 Übungsausarbeitungen)
   Quellen: GoodNotes „Skript AV.pdf“ (Vorlesungsmanuskript Prof. Dr.-Ing. S. Knoblach, 91 S.), Folien „Streckenmaßstab und Freie Stationierung“,
   „Maßstabsfaktoren bei tachymetrischen Messungen“, Folien Präzisionsnivellement / Trig. Höhenbestimmung, Terminplan; eLearning Kurs 13270. */
window.CONTENT = window.CONTENT || {};
(function(){
const R = String.raw;
CONTENT.av = {
  title: "Angewandte Vermessung",
  lead: "Präzisionsnivellement, trigonometrische Höhenübertragung, Streckenmaßstab und freie Stationierung, Kameratachymeter, Straßenbestandsaufnahme und Hochschulnetz – mit den Rechenwegen, die in den Ausarbeitungen verlangt werden.",
  sources: [
    "GoodNotes: 3. Semester/Angewandte Vermessung/Skript AV.pdf (Vorlesungsmanuskript, Prof. Dr.-Ing. Stefan Knoblach, 91 S.)",
    "GoodNotes: Streckenmaßstab Freie Stationierung.pdf, Berücksichtigung des Streckenmaßstabs.pdf (Vorlesungsfolien)",
    "GoodNotes: Digitales Präzisionsnivellement.pdf, Trigonometrische Höhenbestimmung.pdf, Straßenbestandsaufnahme.pdf, Terminplan_AV.pdf, Ü2.pdf (Mitschrift)",
    "eLearning Kurs 13270: Kursstruktur, Hinweise Übungsvorbereitung/Leihscheine/Ausarbeitung, UTM-Rechenbeispiel (Koordinatenliste), Materialien Hochschulnetz (ATR, Satzmessprogramm)"
  ],
  chapters: []
};
const C = CONTENT.av.chapters;

C.push({
  id: "org", title: "Modul, Portfolio und Ausarbeitungen",
  intro: "Angewandte Vermessung wird nicht mit einer Klausur geprüft. Die Prüfung ist ein Portfolio aus fünf Übungsausarbeitungen, und wer mehr als 25 % der Übungen verpasst, wird gar nicht zugelassen. Dieses Kapitel fasst die Spielregeln zusammen.",
  sources: ["Skript AV, Allgemeine Hinweise (S. 4–5)", "Terminplan_AV.pdf", "eLearning: Hinweise Übungsvorbereitung, Leihscheine, Übungsausarbeitung"],
  blocks: [
    { table: { head: ["Übung", "Messung", "Auswertung", "Abgabe"], rows: [
      ["Digitales Präzisionsnivellement", "15./22.10.", "29.10.", "Ausarbeitung 1"],
      ["Trigonometrische Höhenübertragung", "15./22.10.", "29.10.", "Ausarbeitung 2"],
      ["Streckenmaßstab / freie Stationierung", "05.11.", "12.11.", "Ausarbeitung 3"],
      ["Kameratachymeter", "19./26.11.", "03.12.", "Ausarbeitung 4"],
      ["Neuvermessung Hochschulnetz (ATR, Satzmessung, Kalibrierung)", "17.12. / 07.01.", "14./21.01.", "Ausarbeitung 5"]
    ]}},
    { callout: "trap", title: "Zulassung und Anerkennung", body: "<p>Mehr als 25 % Fehlzeit führt zum Ausschluss, egal aus welchem Grund. Wer unvorbereitet erscheint, schließt die <b>ganze Gruppe</b> von der Übung aus. Nach der Abgabe kann jede Gruppe zur Übungsbesprechung gebeten werden. Wer dort die eigene Auswertung nicht erklären kann, bekommt die Übung nicht anerkannt.</p><p>Pro Übung ist genau <b>eine Überarbeitung</b> möglich (Frist meist eine Woche). Wird auch sie nicht anerkannt, ist die Übung endgültig nicht bestanden.</p>" },
    { h3: "Ablauf jeder Übung" },
    { olist: [
      "<b>Übungsvorbereitung</b> nach Muster: Instrumente absprechen, Örtlichkeit erkunden, Ausrüstung zusammenstellen, Instrument erproben. Ohne genehmigte Vorbereitung keine Messung.",
      "<b>Leihschein</b> digital bis 12 Uhr am Vortag an die Instrumentenausgabe (Betreff z. B. Leihschein_V3_GR3_Ü1_17102025).",
      "<b>Messung</b> in der Gruppe (3–4 Personen), bei jedem Wetter. Im Straßenraum gilt Warnwestenpflicht, auch beim Transport.",
      "<b>Daten</b> auf dem Laufwerk unter <code>V:\\_Stud-VG\\Lehrveranstaltungen\\KNO\\Angewandte Vermessung\\…\\Gruppe X</code> speichern.",
      "<b>Ausarbeitung</b> als ein PDF nach der Vorlage im Kurs „Geo – Dokumente für Studierende“, abgegeben im eLearning."
    ]},
    { recipe: { title: "Standard-Gliederung jeder Ausarbeitung", steps: [
      "Aufgabenstellung (Gesamtaufgabe und Teilaufgabe der Gruppe)",
      "Messung: Instrumentarium mit Genauigkeitsangaben, Durchführung, Prüfungen vor Ort",
      "Auswertung: Rechenwege, Tabellen, Widersprüche und Genauigkeiten",
      "Ergebnisse: tabellarisch, mit Beurteilung und Diskussion der Fragen aus dem Skript",
      "Anlagen: Messprotokolle, Stationierungsberichte, Messdaten"
    ]}},
    { callout: "merke", body: "Die Bewertung hängt an der <b>Diskussion</b>: Jede Übung im Skript endet mit konkreten Fragen (z. B. „Wovon hängt die Genauigkeit ab?“). Beantworte sie alle ausdrücklich und begründe mit Zahlen aus deiner Messung." },
    { quiz: [
      { type: "mc", q: "Was passiert, wenn eine Gruppe ohne genehmigte Übungsvorbereitung zur Messung kommt?", options: ["Die ganze Gruppe wird von der Übung ausgeschlossen", "Nur der Übungsverantwortliche bekommt einen Abzug", "Die Vorbereitung kann nachgereicht werden", "Nichts, sie ist freiwillig"], answer: 0, explain: "Skript: Unvorbereitetes Erscheinen führt zum Ausschluss der gesamten Gruppe." },
      { type: "mc", q: "Wie oft darf eine nicht anerkannte Ausarbeitung überarbeitet werden?", options: ["einmal", "zweimal", "beliebig oft bis Semesterende", "gar nicht"], answer: 0, explain: "Einmalig, Frist in der Regel eine Woche." }
    ]}
  ]
});

C.push({
  id: "niv", title: "Digitales Präzisionsnivellement",
  intro: "Das geometrische Nivellement misst Höhenunterschiede mit horizontaler Ziellinie. Für die Übung wird es als Doppelnivellement im Festpunktfeld Steinburg gemessen. Kernpunkte sind die Zugformen, die Protokollführung, die Widerspruchsverteilung und der Kilometerfehler.",
  sources: ["Skript AV Kap. 1.1–1.3 und 1.5 (S. 6–12, 29–31)", "Skript Kap. 3 Festpunktfeld Steinburg", "Folien Digitales Präzisionsnivellement", "eLearning: Beispiel Berechnung Genauigkeit Nivellement / Kilometerfehler (xlsx)"],
  blocks: [
    { h3: "Prinzip" },
    { formula: R`\Delta h = R - V,\qquad H_{neu} = H_{alt} + \Delta h`, vars: ["$R$ – Rückblickablesung (zum bekannten Punkt) [m]", "$V$ – Vorblickablesung (zum neuen Punkt) [m]", "Wechselpunkte auf Lattenuntersätzen („Frösche“)"] },
    { callout: "ex", title: "Skript", body: "HFP 622: $H=632.567$ m, $R=2.083$, $V=1.286$ ⇒ $\\Delta h=+0.797$ m, $H_{U1}=633.364$ m." },
    { h3: "Zugformen" },
    { table: { head: ["Form", "Anschluss", "Beurteilung"], rows: [
      ["Eingehängter Zug", "beidseitig an bekannte Höhen", "<b>Regelfall</b>: Fehler in Festpunkthöhen werden aufgedeckt"],
      ["Freier Zug", "einseitig", "vermeiden – selbst als Doppelnivellement ist die Ausgangshöhe nicht kontrolliert"],
      ["Schleife", "zurück zum Ausgangspunkt", "in sich kontrolliert ($\\sum\\Delta h=0$), Ausgangshöhe aber nicht prüfbar"],
      ["Knoten", "≥ 3 Züge von bekannten Punkten", "für neue Festpunkte: mehrfach bestimmt und ausgleichbar"]
    ]}},
    { h3: "Protokoll und Widerspruch" },
    { list: [
      "Im Feld nach jeder Aufstellung $\\Delta h_i$, am Streckenende $\\Delta H=\\sum\\Delta h$ bilden.",
      "Rechenprobe: $\\sum R-\\sum V=\\sum(R-V)$; zusätzlich $\\sum D$ (Zielweiten) führen.",
      "Hin- und Rückmessung <b>zeilenversetzt</b> ins Protokoll eintragen.",
      "Nur Höhen der gesuchten oder vermarkten Punkte berechnen, keine Wechselpunkthöhen."
    ]},
    { formula: R`w = \Delta H_{soll} - \Delta H_{ist},\qquad v_i = w\cdot\frac{D_i}{\sum D}`, vars: ["$w$ – Widerspruch (Soll − Ist) [mm]", "$D_i$ – Länge der Teilstrecke [km]", "Verteilung proportional zur Distanz (Varianz ∝ Weg)"] },
    { steps: { title: "Widerspruch verteilen", task: "Eingehängter Zug, Soll $\\Delta H=3.214$ m, gemessen $\\sum\\Delta h=3.210$ m; Teilstrecken $D=(0.12;\\,0.20;\\,0.15;\\,0.09)$ km.", steps: [
      { t: "Widerspruch", b: R`$w=3.214-3.210=+4.0$ mm` },
      { t: "Summe der Wege", b: R`$\sum D=0.56$ km` },
      { t: "Verbesserungen", b: R`$v=4.0\cdot D_i/0.56=(0.86;\ 1.43;\ 1.07;\ 0.64)$ mm, Summe $=4.0$ mm ✓` }
    ]}},
    { h3: "Kilometerfehler aus Doppelnivellement" },
    { p: "Aus den Differenzen $d_i=\\Delta h_{hin}+\\Delta h_{rück}$ (bzw. hin − rück bei gleichem Vorzeichen) der n Teilstrecken folgt die Genauigkeit. Gewicht $p_i=1/D_i$ mit $D_i$ in km." },
    { formula: R`s_{1km,\text{einfach}}=\sqrt{\frac{\sum p\,d\,d}{2n}},\qquad s_{0}=s_{1km,\text{doppelt}}=\frac{s_{1km,\text{einfach}}}{\sqrt2}=\sqrt{\frac{\sum p\,d\,d}{4n}},\qquad s_{\Delta H}=s_0\sqrt{\sum D}`, vars: ["$d_i$ – Differenz Hin/Rück der Teilstrecke i [mm]", "$n$ – Anzahl Teilstrecken", "$s_0$ – mittlerer Kilometerfehler des Doppelnivellements (Mittel aus hin und rück) [mm/√km]", "Skript: $\\sum pdd=49.43$, n = 2 ⇒ 3.51 mm, $s_0=2.49$ mm, $s_{\\Delta H}=2.49\\sqrt{0.331}=1.43$ mm"] },
    { steps: { title: "Kilometerfehler berechnen", task: "Drei Teilstrecken: $D=(0.42;\\,0.55;\\,0.38)$ km, $d=(1.2;\\,-0.8;\\,1.5)$ mm.", steps: [
      { t: "$p\\,d\\,d$", b: R`$1.44/0.42+0.64/0.55+2.25/0.38=3.43+1.16+5.92=10.51$` },
      { t: "Einfaches Nivellement", b: R`$s_{1km}=\sqrt{10.51/(2\cdot3)}=1.32$ mm` },
      { t: "Doppelnivellement", b: R`$s_0=1.32/\sqrt2=0.94$ mm` },
      { t: "Gesamtstrecke", b: R`$s_{\Delta H}=0.94\sqrt{1.35}=1.09$ mm` }
    ]}},
    { h3: "Die Übung „Steinburg“" },
    { list: [
      "Festpunktfeld Steinburg: 11 Nivellementpunkte (Nägel, Höhenbolzen, Hektometersteine).",
      "Gruppen messen Teilabschnitte (1→2→3→4→5, 8→7→6→5, 11→10→9→8→6) als Doppelnivellement mit <b>RVVR</b>.",
      "Grenzwert Hin/Rück: <b>1.0 mm</b> (zwischen 7 und 8: 2.0 mm). Bei Überschreitung selbstständig wiederholen.",
      "Vorher die <b>Nivellierprobe</b> (Ziellinie) vor Ort durchführen und dokumentieren.",
      "Instrumente: Trimble DiNi03, Leica DNA03, Leica LS15; Auswertung in CREMER."
    ]},
    { recipe: { title: "Ausarbeitung Präzisionsnivellement", steps: [
      "Instrumentarium mit Genauigkeitsangaben; Nivellierprobe mit Tabelle",
      "Widersprüche der eigenen Gruppe darstellen",
      "Alle Gruppen eines Blocks zu einem Höhennetz zusammenführen",
      "Gemittelte Höhenunterschiede aus allen Messungen",
      "Kilometerfehler (1 km Doppelnivellement) aus allen Messungen des Blocks",
      "Beurteilen; Punkt 6–8 über Flussüberquerung vs. Brücke der Deutschen Einheit vergleichen und diskutieren"
    ]}},
    { quiz: [
      { type: "gap", q: "R = 1.732 m, V = 2.015 m. Höhenunterschied in m?", answer: -0.283, tol: 0.0005, explain: "$\\Delta h=R-V=-0.283$ m." },
      { type: "mc", q: "Welche Zugform sollte für die Bestimmung eines neuen Höhenfestpunkts gewählt werden?", options: ["Knotennivellement", "Freier Zug", "Schleife", "Einfaches Nivellement"], answer: 0, explain: "Mehrfach bestimmt und ausgleichbar." },
      { type: "bug", q: "Fehler in der Kilometerfehlerberechnung finden:", lines: ["p_i = 1 / D_i  (D in km)", "s_1km,einfach = sqrt( Σ p·d·d / (2n) )", "s_0,doppelt = s_1km,einfach · sqrt(2)", "s_ΔH = s_0 · sqrt(Σ D)"], answer: 2, explain: "Das Mittel aus Hin und Rück ist genauer: $s_0=s_{1km}/\\sqrt2$." }
    ]}
  ]
});

C.push({
  id: "niv-fehler", title: "Messabweichungen beim Nivellement",
  intro: "Systematische Abweichungen sind pro Aufstellung winzig, summieren sich aber mit gleichem Vorzeichen. Deshalb werden sie fast immer durch die Messanordnung eliminiert statt rechnerisch korrigiert. Diese Tabelle ist das Herzstück jeder Diskussion in der Ausarbeitung.",
  sources: ["Skript AV Kap. 1.3–1.4 (S. 12–28)", "Förstner (1970), Major & Korth (2001) – zitiert im Skript"],
  blocks: [
    { callout: "def", title: "Arten von Messabweichungen", body: "<b>Zufällig</b>: streuen um null, durch Mehrfachmessung reduzierbar. <b>Systematisch</b>: gleiches Vorzeichen, durch Messanordnung eliminieren (Mittelbildung, gleiche Zielweiten, gerade Aufstellungszahl). <b>Grober Fehler</b>: Versehen, übersteigt die Streuung deutlich – durch Kontrollen aufdecken." },
    { table: { head: ["Abweichung", "Ursache", "Gegenmaßnahme"], rows: [
      ["Ziellinienschiefe", "Ziellinie nicht horizontal", "Prüfung nach Förstner, gleiche Zielweiten R/V"],
      ["Restzielachsneigung", "Restneigung ≈ 0.2 mm/50 m bleibt", "$d_R=d_V$ bzw. $\\sum d_R=\\sum d_V$"],
      ["Horizontschräge", "Kompensator-Hysterese bei Stehachsschiefe", "„rote Hose“: Libelle immer zur selben Latte einspielen, gerade Anzahl Aufstellungen"],
      ["Erdkrümmung", "Tangentialebene statt Kugel", "$d_R=d_V$; Korrektur im Digitalnivellier aktivieren"],
      ["Refraktion", "vertikaler Temperaturgradient", "kurze, hohe Sichten (> 0.5 m), kein Flimmern, Instrument nie auf Grenze Gras/Asphalt"],
      ["Einsinken Instrument/Latte", "weicher Boden", "Messfolge <b>RVVR</b>, fester Untergrund"],
      ["Einsinken Vorblicklatte beim Umsetzen", "Zeit beim Standpunktwechsel", "Hin- und Rückmessung mitteln"],
      ["Lattenschiefe", "Latte nicht lotrecht → Ablesung zu groß", "Lattenlibelle justieren, Streben"],
      ["Schwankendes Strichkreuz", "Vibration, Wind", "Gebiet meiden, Stativ tiefer, Mehrfachmessung"],
      ["Verdeckung / Schatten", "Strichcode gestört", "max. 30 % verdeckt, Latte drehen"],
      ["Beleuchtung", "Code nicht lesbar", "Lattenbeleuchtung"],
      ["Lattenanfang/-ende", "zu kleiner Codeausschnitt", "Abstand > 30 cm zu den Enden"],
      ["Nullpunktabweichung", "Teilungsnull ≠ Aufsetzfläche", "<b>gerade Anzahl</b> Aufstellungen (gleiche Latte auf Festpunkten)"],
      ["Schiefe Aufsetzfläche", "Fertigungstoleranz", "Lattenschuh (vor Festpunkt abnehmen!)"],
      ["Lattenmeter", "Teilung/Temperatur", "Laborkalibrierung (Komparator), Korrektur $L=l_0+L'(1+(m_0+\\alpha_T(T-T_0))10^{-6})$"],
      ["Federn der Latte", "Gras, weicher Boden", "Pflöcke als Wechselpunkte, wenig Druck"],
      ["Szintillation", "turbulente Luft", "starke Sonne meiden, Mehrfachmessung"]
    ]}},
    { h3: "Ziellinienprüfung nach Förstner" },
    { p: "Vier Punkte im Abstand von je ca. 15 m: außen Latten A und B, innen Instrumentenstandpunkte I₁ und I₂. Von I₁ werden $a_1'$, $b_1'$ abgelesen, von I₂ $a_2'$, $b_2'$. Weil der Höhenunterschied von beiden Standpunkten gleich sein muss, folgt:" },
    { formula: R`z' = (b_1'-a_1')-(b_2'-a_2'),\qquad a_2^{soll} = a_1'-b_1'+b_2',\qquad z = z'-k_E`, vars: ["$z'$ – Ziellinienabweichung auf 30 m (Digitalnivellier speichert sie)", "$a_2^{soll}$ – Sollablesung an A von I₂ zur Justierung", "$k_E$ – Erdkrümmungsanteil auf 30 m ≈ 0.1 mm"] },
    { steps: { title: "Förstner auswerten", task: "$a_1'=1.5432$, $b_1'=1.4210$, $a_2'=1.6125$, $b_2'=1.4897$ m.", steps: [
      { t: "Höhenunterschiede", b: R`$b_1'-a_1'=-0.1222$ m, $b_2'-a_2'=-0.1228$ m` },
      { t: "Ziellinienabweichung", b: R`$z'=-0.1222-(-0.1228)=+0.6$ mm auf 30 m` },
      { t: "Sollablesung", b: R`$a_2^{soll}=1.5432-1.4210+1.4897=1.6119$ m (Kontrolle: $a_2'-z'=1.6125-0.0006$ ✓)` }
    ]}},
    { h3: "Erdkrümmung und RVVR" },
    { formula: R`k_E=\frac{d^2}{2R}\ \Rightarrow\ \Delta h_{soll}=\Delta h_{ist}+\frac{d_V^2-d_R^2}{2R}`, vars: ["$R=6371$ km; bei d = 50 m: $k_E=0.20$ mm", "fällt bei $d_R=d_V$ weg"] },
    { formula: R`\Delta h = \frac{R_I+R_{II}}{2}-\frac{V_I+V_{II}}{2}\qquad(\text{RVVR})`, vars: ["eliminiert gleichmäßiges Einsinken von Instrument und Latten"] },
    { formula: R`k_S = a'(1-\cos\varepsilon)`, vars: ["Lattenschiefe: a' = 2.5 m, ε = 1 gon ⇒ $k_S=0.31$ mm (Ablesung immer zu groß)"] },
    { quiz: [
      { type: "mc", q: "Welche Maßnahme eliminiert die Nullpunktabweichung der Latten?", options: ["Gerade Anzahl Instrumentenaufstellungen", "RVVR", "Gleiche Zielweiten", "Hin- und Rückmessung"], answer: 0, explain: "Dann steht auf An- und Abschlusspunkt immer dieselbe Latte." },
      { type: "mc", q: "Wozu dient das „Verfahren rote Hose“?", options: ["Horizontschräge bei Kompensatornivellieren ausschalten", "Lattennull bestimmen", "Refraktion messen", "Einsinken kompensieren"], answer: 0, explain: "Dosenlibelle immer zur selben (gedachten roten) Latte einspielen." },
      { type: "gap", q: "Zielweite 40 m nur im Vorblick, Rückblick 20 m. Erdkrümmungseinfluss auf Δh in mm?", answer: 0.094, tol: 0.003, explain: "$(40^2-20^2)/(2\\cdot6371000)$ m = 0.094 mm." },
      { type: "order", q: "RVVR – Reihenfolge an einem Standpunkt:", steps: ["Rückblick I", "Vorblick I", "Vorblick II", "Rückblick II"] }
    ]}
  ]
});

C.push({
  id: "trig", title: "Trigonometrische Höhenbestimmung",
  intro: "Mit Zenitwinkel und Distanz überbrückt man große Entfernungen und schwieriges Gelände. Das Problem ist die Refraktion. Die gegenseitig-gleichzeitige Zenitwinkelmessung lässt Erdkrümmung und Refraktion herausfallen und liefert sogar den Refraktionskoeffizienten.",
  sources: ["Skript AV Kap. 2 (S. 32–45) inkl. Rechenübung 2.6", "Folien Trigonometrische Höhenbestimmung", "eLearning: Auswertung Trigonometrische Höhenbestimmung, Musterdatei Trig"],
  blocks: [
    { h3: "Grundformel" },
    { formula: R`H_B = H_A + d_s\cos z + I - S + k_E - k_R = H_A + d_{hor}\cot z + I - S + \frac{d_{hor}^2}{2R}(1-k)`, vars: ["$z$ – Zenitwinkel [gon]; $d_s$ Schräg-, $d_{hor}$ Horizontaldistanz [m]", "$I$ – Instrumentenhöhe, $S$ – Reflektor-/Zielhöhe [m]", "$k_E=d^2/2R$ – Erdkrümmung; $k_R=k\\,d^2/2R$ – Refraktion", "$k=R/R_{Licht}$ – Refraktionskoeffizient (Lichtstrahl ≈ Kreisbogen, $R_{Licht}\\approx8R$)"] },
    { callout: "trap", title: "k = 0.13 ist kein Naturgesetz", body: "Der „Standardwert“ 0.13 stammt aus Hochgebirgsmessungen. In Bodennähe schwankt k stark (in der Skript-Rechenübung: <b>k = 1.08</b>). Das Skript sagt deshalb: <b>Keine einseitigen trigonometrischen Höhenübertragungen über längere Distanzen ohne Bestimmung des tatsächlichen Refraktionskoeffizienten!</b>" },
    { h3: "Gegenseitig-gleichzeitig" },
    { formula: R`\Delta h_{AB}=\tfrac12\left[d_{hor}(\cot z_A-\cot z_B)+(I_A-I_B)+(S_A-S_B)\right]`, vars: ["mit $I_A=S_A$, $I_B=S_B$: $\\Delta h=\\tfrac12 d_{hor}(\\cot z_A-\\cot z_B)+(I_A-I_B)$", "Erdkrümmung und Refraktion fallen heraus, wenn $k_A=k_B$"] },
    { formula: R`k = 1-(z_A+z_B-200\,\text{gon})\cdot\frac{\pi}{200}\cdot\frac{R}{d_{hor}}`, vars: ["$R=6\\,371\\,000$ m"] },
    { list: [
      "<b>Aufgesetzter Reflektor</b> auf dem Tachymeter: Distanz und Zenitwinkel gleichzeitig, ATR nutzbar; Abstand Reflektor–Kippachse berücksichtigen.",
      "<b>Reflektor und Tachymeter auf gemeinsamer Basis</b>: ebenso, Höhenversatz berücksichtigen.",
      "<b>Zenitwinkel zum Objektivmittelpunkt</b> der Gegenstation (Übung): keine Adapter, aber keine ATR; Genauigkeit hängt an der Anzielung.",
      "<b>Quasi-simultan</b>: zeitversetzt, Refraktion nur teilweise reduziert."
    ]},
    { h3: "Höhenanschluss über eine Nivellierlatte" },
    { formula: R`d=\frac{I_1-I_4}{\cot z_1-\cot z_4}\ \ (\text{Kontrolle: }\tfrac{I_2-I_3}{\cot z_2-\cot z_3}),\qquad I_A=I_i-d\cot z_i`, vars: ["$I_i$ – angezielte Lattenablesungen", "$I_A$ – Höhe der Kippachse über dem Festpunkt"] },
    { steps: { title: "Rechenübung aus dem Skript (komplett)", task: "$d_{s,1\\to2}=290.916$ m, $d_{s,2\\to1}=290.914$ m; Zenitwinkel in zwei Lagen und Lattenablesungen laut Skript Tab. 2.1–2.4.", steps: [
      { t: "Zenitwinkel reduzieren", b: R`$z=(z_I-z_{II}+400)/2$: $z_{1\to2}=79.54486$ gon, $z_{2\to1}=120.45492$ gon` },
      { t: "Horizontaldistanz", b: R`$290.916\sin z_{12}=276.0278$, $290.914\sin z_{21}=276.0262$ ⇒ $\bar d=276.0270$ m` },
      { t: "Höhenanschluss A", b: R`$d_{1,A}=(1.1-0.3)/(\cot z_1-\cot z_4)=15.106$ (Kontrolle 15.091) ⇒ $I_A=0.7873$ m` },
      { t: "Höhenanschluss B", b: R`$d_{2,B}=5.243$ (Kontrolle 5.241) ⇒ $I_B=1.2856$ m` },
      { t: "Höhenunterschied", b: R`$\Delta h_{AB}=\tfrac12\cdot276.027(\cot79.54486-\cot120.45492)+(0.7873-1.2856)=91.375$ m` },
      { t: "Refraktionskoeffizient", b: R`$k=1-(79.54486+120.45492-200)\frac{\pi}{200}\frac{6371000}{276.027}=1.08$` },
      { t: "Einseitig mit k = 0.13", b: R`$\Delta h_{hin}=276.027\cot z_{12}+\frac{276.027^2}{2R}(1-0.13)+0.7873-1.2856=91.380$ m – 5 mm daneben` }
    ]}},
    { callout: "info", title: "Größenordnung", body: "Bei 276 m: $k_E=5.98$ mm, mit k = 0.13 bleibt $(1-k)d^2/2R=5.20$ mm. Ein Fehler von Δk = 0.1 wirkt mit 0.6 mm; bei 1 km schon mit 7.8 mm." },
    { recipe: { title: "Ausarbeitung Trig. Höhenübertragung (Steinburg, Punkte 1, 2, 9, 10, 11)", steps: [
      "Höhenübertragung auf die Festpunkte über Lattenablesungen in zwei Lagen",
      "Satzmessungen auswerten (3 Vollsätze), Strecken hin/rück mitteln",
      "Einseitige Δh mit k = 0.13",
      "Gegenseitig-gleichzeitige Δh",
      "k je Verbindung berechnen",
      "Dreiecksschlüsse; Vergleich mit Präzisionsnivellement",
      "Diskussion: Genauigkeitseinflüsse, Herkunft und Modell von k = 0.13, Eignung für Präzisionshöhen, Wirtschaftlichkeit vs. Nivellement"
    ]}},
    { quiz: [
      { type: "gap", q: "Zenitwinkel 1. Lage 98.4521 gon, 2. Lage 301.5463 gon. Reduzierter Zenitwinkel in gon?", answer: 98.4529, tol: 0.00005, explain: "$(98.4521-301.5463+400)/2=98.4529$ gon." },
      { type: "mc", q: "Warum fallen Erdkrümmung und Refraktion bei gegenseitig-gleichzeitiger Messung heraus?", options: ["Sie wirken in Hin- und Rückrichtung gleich groß mit umgekehrtem Effekt auf Δh", "Weil die Distanz kurz ist", "Weil k = 0 gesetzt wird", "Wegen der Zweilagenmessung"], answer: 0, explain: "Bei Mittelung von hin und (vorzeichengedrehtem) rück heben sich die gleichen Korrekturterme auf – Voraussetzung $k_A=k_B$." },
      { type: "gap", q: "$z_A+z_B=200.0025$ gon, $d=300$ m. Refraktionskoeffizient k?", answer: 0.166, tol: 0.003, explain: "$k=1-0.0025\\cdot\\frac{\\pi}{200}\\cdot\\frac{6371000}{300}=1-0.834=0.166$." }
    ]}
  ]
});

C.push({
  id: "massstab", title: "Streckenmaßstab",
  intro: "Eine gemessene Strecke ist nicht die Strecke in UTM-Koordinaten. Dazwischen liegen physikalische, geometrische und Netzspannungs-Maßstäbe. Wer sie kennt, weiß, welche Einstellung am Tachymeter welche Wirkung hat.",
  sources: ["Folien „Streckenmaßstab und Freie Stationierung“ und „Maßstabsfaktoren bei tachymetrischen Messungen“ (Knoblach)", "Skript AV Kap. 4.1.2 (Einstellungen Leica Viva)", "eLearning: UTM Koord Rechenbeispiel"],
  blocks: [
    { formula: R`M = M_{Phys}\cdot M_{Geom}\cdot M_{NS}`, vars: ["$M_{Phys}$ – instrumentell (Modulationsfrequenz) und meteorologisch (t, p, e)", "$M_{Geom}$ – Höhenlage (Reduktion aufs Ellipsoid) und Abbildung (GK/UTM)", "$M_{NS}$ – Netzspannungen im amtlichen Festpunktfeld", "Angabe meist in ppm = mm/km"] },
    { h3: "Physikalischer Maßstab" },
    { list: [
      "<b>Instrumentell</b>: Ist- weicht von Soll-Modulationsfrequenz ab (Alterung, Oszillatortemperatur). Maßstab der Strecke = Maßstab der Frequenz. Kalibrierung im Labor (Frequenzzähler) oder auf einer Kalibrierbasis.",
      "<b>Phasenvergleich</b>: Nur der Rest Δλ wird über die Phasendifferenz gemessen. Mehrere Frequenzen: Feinmaßstab (hohe f, Genauigkeit) und Grobmaßstab (niedrige f, Eindeutigkeit).",
      "<b>Meteorologisch</b>: Ausbreitungsgeschwindigkeit hängt vom Brechungsindex ab. Bezugsatmosphäre Leica: 12 °C, 1013.25 hPa, 60 % Feuchte."
    ]},
    { table: { head: ["Änderung", "Korrektion"], rows: [["+1 °C", "≈ +1 ppm"], ["+3.5 hPa (≈ 30 m Höhe)", "≈ −1 ppm"], ["0 → 100 % Feuchte (20 °C)", "≈ +0.9 ppm"]] } },
    { callout: "merke", body: "Temperatur und Luftdruck vor Ort messen und eingeben. 10 °C Fehler ≈ 10 ppm ≈ 1 mm auf 100 m. Die Feuchte darf auf dem Standardwert bleiben." },
    { h3: "Geometrischer Maßstab" },
    { formula: R`\delta s_{H\ddot ohe}=-S_H\cdot\frac{h_m}{R}`, vars: ["$h_m$ – mittlere <b>ellipsoidische</b> Höhe $h=H+\\zeta$", "$\\zeta$ – Höhenanomalie (GCG2016), in Deutschland ca. 34–50 m", "Röntgenring: H ≈ 173 m, ζ = 48.01 m ⇒ h ≈ 221 m ⇒ −35 ppm (nur mit H: −27 ppm)"] },
    { formula: R`\text{GK: }\ \frac{s-S}{S}=\frac{y_m^2}{2R^2}\qquad\qquad \text{UTM: }\ \frac{s-S}{S}=\frac{y_m^2}{2R^2}+(m_H-1),\ \ m_H=0.9996`, vars: ["$y_m$ – mittlerer Abstand zum Hauptmeridian (Ostwert − 500 km)", "GK: Hauptmeridian längentreu, Bayern 12° (4. Streifen)", "UTM: Hauptmeridian −400 ppm, längentreu bei ca. ±180 km; Würzburg Zone 32 (9°)"] },
    { steps: { title: "Maßstab am Campus Röntgenring", task: "UTM E ≈ 32 567 030, h ≈ 221 m; GK R ≈ 4 351 190.", steps: [
      { t: "UTM-Abstand", b: R`$y_m=567.03-500=67.03$ km` },
      { t: "UTM-Abbildung", b: R`$\frac{67030^2}{2\cdot6371000^2}=+55$ ppm; $+55-400=-345$ ppm` },
      { t: "Höhenlage", b: R`$-221/6371000=-35$ ppm` },
      { t: "Gesamt $M_{Geom}$", b: R`$-345-35=-380$ ppm ⇒ 38 mm auf 100 m – <b>muss</b> eingestellt werden` },
      { t: "Zum Vergleich GK", b: R`$y_m=4351-4500=-149$ km ⇒ $+273$ ppm (Abbildungsstrecken länger)` }
    ]}},
    { callout: "info", title: "Instrument (Leica)", body: "Geometrischer ppm = Kartenprojektions-ppm + Bezugshorizont-ppm + individueller ppm. „Projektion & Höhe“: Maßstab ZM 0.9996 (UTM; GK 1.0), Abstand zum ZM = Ost − 500 km (ohne Zonenkennziffer!), Höhe ü. BezHor. Beispiel Skript: Ost 569 000, h 250 m ⇒ ≈ −380 ppm." },
    { h3: "Netzspannungen und was man tut" },
    { table: { head: ["Aufgabe", "M_Geom", "M_Phys", "M_NS"], rows: [
      ["Verdichtung amtliches Festpunktfeld (Neupunkte ins Landessystem)", "berücksichtigen", "anbringen", "beseitigen"],
      ["Absteckung Ingenieurbauwerk (Naturmaß, „Maßstab 1“)", "$:=1$ setzen", "anbringen", "beseitigen"]
    ]}},
    { quiz: [
      { type: "gap", q: "UTM-Punkt mit Ostwert 32 545 000, h = 300 m. Gesamter geometrischer Maßstab in ppm (gerundet)?", answer: -422, tol: 2, explain: "$45000^2/(2R^2)=+25$ ppm; $25-400=-375$ ppm; Höhe $-300/6371000=-47$ ppm ⇒ −422 ppm." },
      { type: "mc", q: "Welche Höhe gehört in die Höhenreduktion?", options: ["ellipsoidische Höhe h = H + ζ", "Gebrauchshöhe H über NHN", "Instrumentenhöhe", "Höhe des Zielpunkts"], answer: 0, explain: "Reduktion auf das Ellipsoid ⇒ ellipsoidische Höhe." },
      { type: "mc", q: "Um wie viel ändert sich die Strecke bei +1 °C Temperaturfehler etwa?", options: ["1 ppm", "10 ppm", "0.1 ppm", "35 ppm"], answer: 0, explain: "Faustregel: 1 °C ≈ 1 ppm." }
    ]}
  ]
});

C.push({
  id: "fs", title: "Freie Stationierung",
  intro: "Bei der freien Stationierung wird der Standpunkt aus Messungen zu bekannten Anschlusspunkten bestimmt. Die Übung vergleicht zwei Rechenansätze und die Wirkung eines freien Maßstabs. Entscheidend ist, was im Instrument eingestellt war.",
  sources: ["Folien „Freie Stationierung“ / „Streckenmaßstab und Freie Stationierung“ (Knoblach)", "Skript AV Kap. 4.1 (Testmessung Hochschulnetz, Einstellungen, Ergebnisse)", "eLearning: Messungen für Rechenbeispiele, UTM Koord Rechenbeispiel"],
  blocks: [
    { p: "Unbekannte: Standpunktkoordinaten (Rw, Hw, ggf. H), Orientierungsunbekannte o, optional ein Maßstab m. Mit 4 Anschlusspunkten (Richtung + Strecke) gibt es 8 Beobachtungen für 3–4 Unbekannte." },
    { table: { head: ["", "ohne Maßstab", "mit Maßstab"], rows: [
      ["Helmert-Transformation", "3 Parameter: $X_0, Y_0, \\varphi$", "4 Parameter: $X_0, Y_0, \\varphi, m$"],
      ["Ausgleichung (Richtungs-/Streckennetz)", "$y_S, x_S, o_S$", "$y_S, x_S, o_S, m$"]
    ]}},
    { h3: "Ausgleichungsansatz" },
    { formula: R`r_{S,i}+v_r=\arctan\frac{y_i-\hat y_S}{x_i-\hat x_S}-\hat o_S,\qquad s_{S,i}+v_s=\hat m\sqrt{(y_i-\hat y_S)^2+(x_i-\hat x_S)^2}`, vars: ["Richtungsgleichung bleibt unverändert – m wirkt nur auf Strecken", "Stochastisches Modell aus σ_r, σ_s (CREMER)", "Restklaffen = Verbesserungen quer/längs"] },
    { h3: "Transformationsansatz" },
    { p: "Aus den Messungen werden lokale Koordinaten (x, y) der Anschlusspunkte im Instrumentensystem (x‑Achse = Teilkreisnull) berechnet. Eine Helmert-Transformation bildet sie auf die gegebenen Koordinaten (X, Y) ab; der Standpunkt ist der transformierte Ursprung." },
    { formula: R`X_i+v_X=x_i\,\hat m\cos\hat t-y_i\,\hat m\sin\hat t+\hat X_0,\qquad Y_i+v_Y=x_i\,\hat m\sin\hat t+y_i\,\hat m\cos\hat t+\hat Y_0` },
    { h3: "Die vier Stationierungen der Übung" },
    { table: { head: ["Nr.", "M_Geom eingestellt", "Maßstab berechnen", "Ansatz", "Erwartung"], rows: [
      ["1", "ja", "nein", "Ausgleichung", "kleine Restklaffen – Strecken passen zu UTM"],
      ["2", "ja", "ja", "Transformation", "berechneter Maßstab ≈ 1 (Rest: M_Phys, M_NS)"],
      ["3", "nein", "ja", "Transformation", "Maßstab ≈ 0.99962 – er „schluckt“ M_Geom"],
      ["4", "nein", "nein", "Ausgleichung", "Strecken 380 ppm zu lang ⇒ größere Restklaffen, verfälschtes Ergebnis"]
    ]}},
    { callout: "merke", body: "<b>Im Landessystem $M_{Geom}$ immer anbringen.</b> Ein freier Maßstab dient dann nur als Kontrolle und sollte nahe 1 liegen. Ein freier Maßstab „schluckt“ alles: nicht angebrachtes M_Geom, Reste von M_Phys, Netzspannungen – und auch Fehler und schlechte Geometrie." },
    { callout: "trap", title: "Leica-Fallen", body: "Ist „Standpkt & Koord.sys“ gewählt, kann kein Maßstab der Anschlusspunkte berechnet werden. Bei UTM die Ost-Koordinate ohne Zonenkennziffer eingeben. „Freie Stationierung nach Helmert“ (Reiter Erweitert) = Transformationsansatz, sonst Ausgleichungsansatz." },
    { recipe: { title: "Ausarbeitung Streckenmaßstab", steps: [
      "Mind. 4 Anschlussziele mit großem Abstand, ein Vollsatz je Einstellung, ohne Anschlusshöhen",
      "Je Variante dokumentieren: Einstellungen, Standpunkt mit σ, Maßstäbe, Restklaffen",
      "Z-Datei und Stationierungsbericht exportieren",
      "Varianten vergleichen: Koordinatendifferenzen, Maßstäbe, Restklaffen",
      "Erklären, warum Variante 3 ≈ 0.99962 und Variante 4 größere Restklaffen liefert"
    ]}},
    { quiz: [
      { type: "mc", q: "Variante 3 (M_Geom nicht eingestellt, Maßstab berechnet) liefert m ≈ 0.99962. Warum?", options: ["Der freie Maßstab enthält jetzt den geometrischen Maßstab (−380 ppm)", "Das Instrument ist defekt", "Wegen der Refraktion", "Die Transformation hat einen Fehler"], answer: 0, explain: "$1-0.000380=0.99962$." },
      { type: "mc", q: "Wie viele Unbekannte hat eine 2D-Stationierung im Ausgleichungsansatz mit freiem Maßstab?", options: ["4", "3", "2", "5"], answer: 0, explain: "$y_S, x_S, o_S, m$." },
      { type: "gap", q: "4 Anschlusspunkte mit Richtung und Strecke, Ausgleichung ohne Maßstab. Redundanz?", answer: 5, tol: 0, explain: "n = 8, u = 3 ⇒ f = 5." }
    ]}
  ]
});

C.push({
  id: "kamera", title: "Kameratachymeter",
  intro: "Leica-Nova-Totalstationen (MS50, TS50, MS60) haben eine Weitwinkel- und eine Koaxialkamera. In der Übung wird eine Hochschulfassade von drei Standpunkten aus gemessen, im Bild ausgewertet und mit direkten Messungen verglichen.",
  sources: ["Skript AV Kap. 5 (S. 66–85)", "eLearning: Download Leica Infinity"],
  blocks: [
    { table: { head: ["Kamera", "Eigenschaft", "Einsatz"], rows: [
      ["Übersichtskamera (Weitwinkel)", "großes Sichtfeld, geringe Auflösung", "Orientierung, Panorama, Dokumentation, Zielauswahl am Controller"],
      ["Koaxialkamera", "durch das Fernrohr, mit Fernrohrvergrößerung", "präzises Anzielen und Messen im Live-Bild, steile Ziele, Bildmessung"]
    ]}},
    { h3: "Ablauf" },
    { olist: [
      "Projekt auf SD-Karte anlegen, Temperatur und Druck einstellen; Kameraeinstellungen prüfen (Fadenkreuz nicht ins Bild).",
      "<b>Standpunkt 1 (9001)</b>: Orientierung setzen mit lokalen Koordinaten (Ost 1000, Nord 2000, H 100, Instrumentenhöhe 0), Hz parallel zur Fassade – Achsen dann längs/quer zur Fassade.",
      "Panoramaaufnahme (Methode Polygon), bei starken Helligkeitsunterschieden „jedes Bild individuell“.",
      "Fassadenpunkte und mind. zwei Verknüpfungspunkte messen, auch im Live-Bild (steile Ziele) und mit Koaxialkamera-Bildern.",
      "Weitere Standpunkte per freier Stationierung über die Verknüpfungspunkte.",
      "In <b>Leica Infinity</b>: Projekt anlegen, Daten importieren, Bildauswertung (Bildgruppen, neue Punkte im Bild, Linien und Längen), Export über Formatvorlage."
    ]},
    { recipe: { title: "Ausarbeitung Kameratachymeter – Diskussionsfragen", steps: [
      "Abweichungen der Koordinaten- und Streckenvergleiche je Verfahren beurteilen",
      "Erreichte Genauigkeit der Bildauswertung vs. Anforderungen einer Fassadenaufnahme",
      "Einsatzmöglichkeiten Weitwinkel- vs. Koaxialkamera",
      "Kosten-Nutzen aus Sicht eines Vermessungsbüros",
      "Steuerung über den Controller: wofür besonders geeignet?"
    ]}},
    { callout: "info", body: "Die Genauigkeit einer Bildmessung hängt von Pixelgröße im Objekt (Entfernung, Zoom), Schnittgeometrie der Bildstrahlen von mehreren Standpunkten und der Stationierung ab. Quer zur Fassade (Tiefe) ist sie bei Einzelbildern am schwächsten – deshalb die fassadenparallele Achsausrichtung." },
    { quiz: [
      { type: "mc", q: "Warum wird die Hz-Richtung am Standpunkt 9001 parallel zur Fassade gesetzt?", options: ["Damit Abweichungen direkt längs bzw. quer zur Fassade interpretierbar sind", "Weil Leica es verlangt", "Damit die Kamera scharf stellt", "Um den Maßstab zu bestimmen"], answer: 0, explain: "Koordinatenachsen ∥ und ⟂ zur Fassade." }
    ]}
  ]
});

C.push({
  id: "strasse", title: "Straßenbestandsaufnahme",
  intro: "Die komplette Vermessung eines Straßenkörpers in einem Zug, hier in der Straße „Am Stein“ in Grombühl. Lage über Katasterpunkte, Höhe über nivellierte Anschlusspunkte, Ergebnis ist ein Bestandsplan 1:250.",
  sources: ["Skript AV Kap. 6 (S. 86–90)", "Folien Straßenbestandsaufnahme", "eLearning: Liegenschaftskarte, ALKIS-DXF"],
  blocks: [
    { h3: "Zu erfassen" },
    { list: [
      "Asphaltgrenze bzw. Einzeiler (Bordstein unten), Bordstein oben; Hoch- und Tiefbordbereiche",
      "Gehweggrenze (grundstücksseitig), Zugänge und Zufahrten",
      "Kanalschächte, Sinkkästen, Schaltkästen, Laternen, Verkehrsschilder",
      "Hydranten, Wasser- und Gasschieber"
    ]},
    { h3: "Einstellungen am Instrument" },
    { table: { head: ["Parameter", "Wert"], rows: [
      ["Koordinatensystem", "ETRS89/UTM32, keine Transformation, Zone 32 Nord"],
      ["Streckenmaßstab", "Projektion & Höhe: ZM 0.9996, Abstand ZM aus Ostwert, Höhe = mittlere Gebietshöhe <b>+ 49 m</b> (Höhenanomalie)"],
      ["Freie Stationierung", "Ausgleichungsansatz, <b>kein</b> Maßstab der Anschlusspunkte"]
    ]}},
    { callout: "merke", body: "Hier gilt alles aus dem Kapitel Streckenmaßstab: M_Geom einstellen (+ 49 m = ζ, damit die ellipsoidische Höhe in die Reduktion geht) und keinen freien Maßstab rechnen – der Lagebezug ist das Kataster." },
    { recipe: { title: "Vorbereitung und Durchführung", steps: [
      "Gebiet und Standpunkte erkunden, Katasterpunkte und Höhenfestpunkte prüfen, ggf. verdichten",
      "Mind. ein (besser zwei) höhenmäßig bekannte Anschlusspunkte je Gruppe per Nivellement",
      "Codeliste (Punkt- und Liniencodes), Standpunktprotokolle, Auszug Liegenschaftskarte vorbereiten",
      "Freie Stationierung in Lage und Höhe, Protokoll sichern",
      "Aufnahme mit Codes; Export und Import in Civil 3D",
      "Plan 1:250 mit Layerstruktur (Liegenschaftskarte, Begrenzungslinien, Objekte)"
    ]}},
    { quiz: [
      { type: "mc", q: "Warum wird bei der Höhe über Bezugshorizont „+ 49 m“ eingegeben?", options: ["Für die ellipsoidische Höhe h = H + ζ (Höhenanomalie in Würzburg ≈ 48–49 m)", "Als Instrumentenhöhe", "Wegen des Zonenzuschlags", "Für den Kanal unter der Straße"], answer: 0, explain: "Die Höhenreduktion braucht die ellipsoidische Höhe." }
    ]}
  ]
});

C.push({
  id: "hsnetz", title: "Neuvermessung Hochschulnetz: ATR, Satzmessung, Kalibrierung",
  intro: "Die letzte Übung verbindet alles: Satzmessung mit automatischer Zielerfassung, Instrumentenprüfung und die Ausgleichung des Hochschulnetzes in Lage und Höhe. Die Aufgabenstellung verweist auf das Skript; die Grundlagen zur Zielerfassung stammen aus dem eLearning.",
  sources: ["Terminplan_AV (10.12. ATR, Satzmessprogramm, Kalibrierung; Messung 17.12./07.01.; Auswertung 14./21.01.)", "eLearning: „Zielerfassung- und verfolgung“, Grimm/Kleemaier et al. 2015 und Grimm/Hornung 2015 (ATRplus), Leica-Videos Power Search, ATA, ATRplus, Automatic Target Look, Captivate Check & Adjust, Netzplan Beispiel, Vorlage Einmessungsskizze", "Ausgleichsrechnung (Netzausgleichung, Datum) – siehe Fach AGL"],
  blocks: [
    { callout: "info", title: "Stand", body: "Die PDF-Unterlagen zur Zielerfassung konnten nicht automatisch ausgelesen werden. Dieses Kapitel fasst die Begriffe aus Kursstruktur und Videotiteln zusammen. Für die Ausarbeitung die Originale im eLearning lesen." },
    { table: { head: ["Funktion", "Zweck"], rows: [
      ["Power Search", "Prisma im Umfeld automatisch suchen (Fächerstrahl, Drehung)"],
      ["ATR / ATRplus (Automatic Target Recognition)", "Feinanzielung des Prismas per Bildsensor; misst die Ablage zum Fadenkreuz und korrigiert sie rechnerisch bzw. per Motor"],
      ["Automatic Target Aiming (ATA)", "automatisches Anzielen im Messablauf"],
      ["Lock / Zielverfolgung", "bewegtem Prisma folgen (kinematische Messung)"],
      ["Automatic Target Look", "Weiterentwicklung zur Zielerkennung und -verfolgung"],
      ["Check & Adjust", "Bestimmung von Instrumentenfehlern (Ziel-, Kippachs-, Höhenindexfehler, ATR-Kollimation, Kompensator)"]
    ]}},
    { h3: "Satzmessung" },
    { list: [
      "Ein <b>Vollsatz</b> = alle Ziele in Lage I und Lage II. Mittel aus beiden Lagen eliminiert Ziel- und Kippachsfehler sowie Höhenindexfehler.",
      "Satzmessprogramm am Instrument: Ziele einmal lernen, dann Sätze automatisch mit ATR wiederholen.",
      "Reduktion: Richtungen auf das erste Ziel beziehen, Sätze mitteln, Streuung als Genauigkeitsmaß."
    ]},
    { formula: R`z=\frac{z_I-z_{II}+400\,\text{gon}}{2},\qquad Hz=\frac{Hz_I+Hz_{II}\pm200\,\text{gon}}{2}`, vars: ["Indexfehler $i=(z_I+z_{II}-400)/2$", "Zielachsfehler aus $Hz_I-Hz_{II}\\pm200$"] },
    { recipe: { title: "Auswertung Hochschulnetz", steps: [
      "Netzplan und Einmessungsskizzen (Vorlagen im eLearning)",
      "Instrumentenprüfung (Check & Adjust) dokumentieren",
      "Satzmessungen reduzieren und mitteln",
      "Lage: Netzausgleichung in CAPLAN (Datum, Globaltest, Ausreißertest, Ellipsen)",
      "Höhe: Nivellement- oder trig. Höhen ausgleichen",
      "Ergebnisse und Genauigkeiten beurteilen, Dokumentation"
    ]}},
    { quiz: [
      { type: "gap", q: "z_I = 101.2345 gon, z_II = 298.7681 gon. Höhenindexfehler i in mgon?", answer: 1.3, tol: 0.05, explain: "$i=(101.2345+298.7681-400)/2=0.0013$ gon = 1.3 mgon." }
    ]}
  ]
});

CONTENT.av.cheatsheet = {
  lead: "Formeln, Einstellungen und Diskussionspunkte für die fünf Ausarbeitungen – druckbar auf A4.",
  sections: [
    { title: "1 · Nivellement", blocks: [
      { formula: R`\Delta h=R-V;\quad \text{RVVR: }\Delta h=\tfrac{R_I+R_{II}}{2}-\tfrac{V_I+V_{II}}{2}` },
      { formula: R`v_i=w\,\tfrac{D_i}{\sum D},\quad w=\Delta H_{soll}-\Delta H_{ist}` },
      { formula: R`s_{1km}=\sqrt{\tfrac{\sum pdd}{2n}},\ \ s_0=\tfrac{s_{1km}}{\sqrt2},\ \ s_{\Delta H}=s_0\sqrt{\sum D}`, vars: ["$p=1/D_{km}$, d = Hin/Rück-Differenz [mm], n Teilstrecken"] },
      { list: ["Grenzwert Steinburg: 1.0 mm (7–8: 2.0 mm)", "Probe: $\\sum R-\\sum V=\\sum(R-V)$"] }
    ]},
    { title: "2 · Systematische Fehler → Gegenmaßnahme", blocks: [
      { table: { head: ["Fehler", "Gegenmaßnahme"], rows: [
        ["Ziellinie, Restneigung, Erdkrümmung", "gleiche Zielweiten"], ["Horizontschräge", "rote Hose + gerade Aufstellungszahl"], ["Einsinken", "RVVR; Hin/Rück mitteln"],
        ["Lattennull", "gerade Anzahl Aufstellungen"], ["Refraktion", "hohe, kurze Sichten, > 0.5 m"], ["Lattenschiefe", "$k_S=a'(1-\\cos\\varepsilon)$, Libelle"], ["Verdeckung", "≤ 30 %"], ["Lattenende", "> 30 cm Abstand"]
      ]}},
      { formula: R`\text{Förstner: } z'=(b_1'-a_1')-(b_2'-a_2'),\ \ a_2^{soll}=a_1'-b_1'+b_2'` },
      { formula: R`k_E=\tfrac{d^2}{2R},\ \ R=6371\text{ km}` }
    ]},
    { title: "3 · Trig. Höhe", blocks: [
      { formula: R`H_B=H_A+d\cot z+I-S+\tfrac{d^2}{2R}(1-k)` },
      { formula: R`\Delta h=\tfrac12 d(\cot z_A-\cot z_B)+(I_A-I_B)` },
      { formula: R`k=1-(z_A+z_B-200)\tfrac{\pi}{200}\tfrac{R}{d}` },
      { formula: R`z=\tfrac{z_I-z_{II}+400}{2};\quad d=\tfrac{I_1-I_4}{\cot z_1-\cot z_4};\ \ I_A=I_i-d\cot z_i` },
      { list: ["Skript-Beispiel: d = 276.027 m, Δh = 91.375 m, k = 1.08; einseitig k = 0.13: 91.380 m", "k = 0.13 nur Erfahrungswert (Hochgebirge)!"] }
    ]},
    { title: "4 · Maßstab", blocks: [
      { formula: R`M=M_{Phys}M_{Geom}M_{NS}` },
      { formula: R`\text{Höhe: }-\tfrac{h}{R},\ h=H+\zeta;\quad \text{GK: }+\tfrac{y_m^2}{2R^2};\quad \text{UTM: }+\tfrac{y_m^2}{2R^2}-400\text{ ppm}` },
      { table: { head: ["Röntgenring", "ppm"], rows: [["UTM ($y_m$ = 67 km)", "−345"], ["Höhe (h = 221 m)", "−35"], ["gesamt", "−380"], ["GK ($y_m$ = −149 km)", "+273"]] } },
      { list: ["Meteo: 1 °C ≈ 1 ppm, 3.5 hPa ≈ 1 ppm, Feuchte ≈ 1 ppm max.", "Landessystem: M_Geom berücksichtigen, M_Phys anbringen, M_NS beseitigen; Bauwerk: M_Geom := 1"] }
    ]},
    { title: "5 · Freie Stationierung", blocks: [
      { table: { head: ["Nr.", "M_Geom", "m frei", "Ansatz", "Erwartung"], rows: [["1", "ja", "nein", "AGL", "kleine Restklaffen"], ["2", "ja", "ja", "Helmert", "m ≈ 1"], ["3", "nein", "ja", "Helmert", "m ≈ 0.99962"], ["4", "nein", "nein", "AGL", "große Restklaffen"]] } },
      { list: ["Unbekannte: y, x, (H), o, (m)", "mind. 4 Anschlussziele, große Abstände", "Helmert = Option „Freie Stationierung nach Helmert“"] }
    ]},
    { title: "6 · Einstellungen Straßenbestand", blocks: [
      { list: ["ETRS89/UTM32, Projektion & Höhe: 0.9996, Abstand ZM = Ost − 500 km, Höhe + 49 m", "Ausgleichungsansatz, kein Maßstab", "Lage: Katasterpunkte, Höhe: nivellierte Anschlusspunkte", "Plan 1:250, Layer"] }
    ]},
    { title: "7 · Ausarbeitung – Checkliste", blocks: [
      { olist: ["Aufgabenstellung (gesamt + Gruppe)", "Instrumentarium mit Genauigkeitsangaben", "Durchführung, Prüfungen vor Ort", "Auswertung mit Rechenwegen", "Ergebnisse tabellarisch + alle Diskussionsfragen", "Anlagen: Protokolle, Berichte, Daten", "ein PDF, Vorlage „Geo – Dokumente für Studierende“"] }
    ]}
  ]
};
})();
