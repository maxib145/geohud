/* ==========================================================================
   studyData.js – Inhalte der Lern-App (datengetrieben)
   --------------------------------------------------------------------------
   Aufbau:
     STUDY_DATA.semesters[]          -> Semester-Gruppen (Filter im Dashboard)
       .modules[]                    -> Fächer
         .missions[]                 -> 5-Minuten-Missionen
           .tldr      (String, HTML) -> "TL;DR – Worum geht's?"
           .core      (Blöcke)       -> "Kernskript & Klausur-Fokus"
           .tips / .traps            -> aufklappbare Pro-Tipps / Klausurfallen
           .checks    (Aufgaben)     -> "Interaktiver Skill-Check"
   Block-Typen in .core:
     {h:"Überschrift"} {p:"HTML-Text"} {math:"LaTeX"} {list:["…","…"]}
     {code:"…", lang:"python|sql|plaintext"} {table:{head:[…], rows:[[…]]}}
     {note:"HTML-Text"}   (hervorgehobener Merksatz)
   Check-Typen:
     {type:"mc",    q, code?, options:[…], answer:i, explain}
     {type:"order", q, steps:[… in richtiger Reihenfolge], explain}
     {type:"bug",   q, lines:[…], answer:i, explain}   (fehlerhafte Zeile antippen)
   Mathe: $…$ inline, $$…$$ abgesetzt (KaTeX). Für Backslashes String.raw (R`…`) nutzen.
   IDs (module.id / mission.id) NIE ändern – daran hängt der gespeicherte Fortschritt.
   ========================================================================== */

const R = String.raw;

window.STUDY_DATA = {
  version: "2026-11-26.2",

  levels: [
    { xp: 0,    name: "Kadett" },
    { xp: 150,  name: "Fähnrich" },
    { xp: 400,  name: "Navigator" },
    { xp: 800,  name: "Leutnant" },
    { xp: 1400, name: "Commander" },
    { xp: 2200, name: "Captain" },
    { xp: 3200, name: "Admiral" },
    { xp: 4500, name: "System-Architekt" }
  ],

  dailyGoalXP: 100,

  semesters: [
    /* ------------------------------------------------------------------ */
    {
      id: "sem3",
      label: "3. Semester",
      modules: [
        {
          id: "agl",
          title: "Ausgleichsrechnung",
          code: "6018014",
          prof: "Prof. Dr.-Ing. Markus Müller",
          icon: "⌖",
          missions: [
            {
              id: "agl-01-mdkq",
              title: "Methode der kleinsten Quadrate – der Standardweg",
              minutes: 5,
              xp: 120,
              tldr: R`Du misst mehr, als du für die Unbekannten bräuchtest, und jede Messung widerspricht den anderen ein bisschen – wie fünf VAR-Kameraperspektiven, die alle einen minimal anderen Abseits-Zeitpunkt zeigen. Die <b>MdkQ</b> wählt die Unbekannten so, dass die Summe der quadrierten Verbesserungen $\Omega = v^TPv$ minimal wird. Dafür gibt es einen festen 12-Schritte-Algorithmus, und genau den will die Klausur sehen.`,
              core: [
                { h: "Grundbegriffe" },
                { table: { head: ["Symbol", "Bedeutung"], rows: [
                  [R`$n$`, "Anzahl Beobachtungen"],
                  [R`$u$`, "Anzahl Unbekannte"],
                  [R`$d$`, "Datumsdefekt (nur freie Netzausgleichung, sonst 0)"],
                  [R`$f = n - u + d$`, "Freiheitsgrade = Redundanz (Skript Gl. 2.1-77)"]
                ]}},
                { p: R`Jede Beobachtung bekommt eine Verbesserung: $\hat L_i = L_i + v_i$. Der „wahre" Wert bleibt unbekannt. Schätzprinzip nach <b>Gauß/Legendre</b>:` },
                { math: R`\Omega = v^T P\, v \;\rightarrow\; \min` },
                { h: "Vom Modell zur Lösung" },
                { p: R`<b>Funktionales Modell</b>: Jede Beobachtung als Funktion der Unbekannten, $\hat L = \varphi(\hat X)$. Nichtlinear → mit Näherungswerten $X^0$ linearisieren (Taylor, Abbruch nach dem 1. Glied):` },
                { math: R`l = L - \varphi(X^0) \qquad v = A\,\hat x - l \qquad A = \left.\frac{\partial \varphi}{\partial X}\right|_{X^0}` },
                { p: R`Zeile von $A$ = Beobachtung, Spalte = Unbekannte. Ableiten nach $\hat x$ und Nullsetzen liefert das <b>Normalgleichungssystem</b>:` },
                { math: R`N = A^T P A \qquad n = A^T P\, l \qquad Q = N^{-1} \qquad \hat x = Q\,n` },
                { math: R`\hat X = X^0 + \hat x \qquad v = A\hat x - l \qquad \hat L = L + v` },
                { h: "Gewichte & Genauigkeit" },
                { math: R`p_i = \frac{\sigma_0^2}{\sigma_i^2} \qquad s_0 = \sqrt{\frac{v^T P v}{f}} \qquad K_{xx} = s_0^2\,Q \qquad s_{x_i} = s_0\sqrt{Q_{ii}}` },
                { note: R`$s_0 \approx \sigma_0$ (bzw. $s_0/\sigma_0 \approx 1$) → stochastisches Modell plausibel. Bei wenig Redundanz lieber a priori rechnen: $\Sigma_{\hat x\hat x} = \sigma_0^2 Q$.` },
                { h: "Beispiel aus dem Skript: Höhennetz (Kap. 2.2.1)" },
                { p: R`8 Nivellements, 3 Neupunkte (N1–N3), 2 Festpunkte. $n=8$, $u=3$, $d=0$ → $f=5$. Genauigkeit $\sigma_{\Delta h} = \sigma_{km}\sqrt{S}$ → mit $\sigma_0=\sigma_{km}$ wird $p_i = 1/S_i$. Festpunkte bekommen <b>keine Spalte</b> in $A$, ihre Höhe geht nur in $l$ ein.` },
                { table: { head: ["Ergebnis", "Wert"], rows: [
                  ["H(N1) / H(N2) / H(N3)", "209.7835 / 230.4831 / 222.7685 m"],
                  [R`$s_0$ (1 km Doppelniv.)`, "2.0 mm"],
                  ["s(H) N1 / N2 / N3", "1.7 / 1.6 / 1.3 mm"]
                ]}},
                { p: "Nachgerechnet mit numpy, das Ergebnis passt zum Skript (s₀ = 2.0 mm)." }
              ],
              tips: [
                { title: "Excel-Kochrezept (wie in den Übungen)", body: R`<code>MTRANS</code> für $A^T$, <code>MMULT</code> für jede Matrixmultiplikation, <code>MINV</code> für $Q=N^{-1}$, <code>SUMMENPRODUKT</code> für $v^Tv$. Matrixformeln mit Strg+Shift+Enter abschließen (alte Excel-Versionen).` },
                { title: "Lineare Modelle sparen Arbeit", body: R`Höhennetz, Additionskonstante (UE01), Gerade/Polynom: $A$ ist konstant, Näherungswerte dürfen sogar $X^0 = 0$ sein, und es braucht keine Iteration. Nur Strecken- und Richtungsnetze müssen iteriert werden (Abbruch bei $\max|\hat x| < \varepsilon$).` },
                { title: "Schlussprobe", body: R`$v^TPv = l^TPl - \hat x^T N \hat x$: Beide Seiten müssen übereinstimmen, sonst steckt ein Rechenfehler in $N$, $n$ oder $\hat x$.` }
              ],
              traps: [
                { title: "Falle: „Σv = 0 muss immer gelten“", body: R`Falsch! Beim Höhennetz oben ist $\sum v = -0.4$ mm, und trotzdem ist alles richtig. Allgemein gilt die Orthogonalität $A^T P\, v = 0$. $\sum v = 0$ folgt daraus nur im Spezialfall (z. B. einfaches arithmetisches Mittel).` },
                { title: "Falle: Gewicht falsch herum", body: R`$p_i = \sigma_0^2/\sigma_i^2$, also genaue Messung → großes Gewicht. Wer $\sigma_i^2$ statt dem Kehrwert einsetzt, gewichtet die schlechten Messungen am stärksten.` },
                { title: "Falle: N ist singulär", body: R`<code>MINV</code> liefert #ZAHL! → Datumsdefekt (z. B. Höhennetz ohne Festpunkt: $d=1$; 2D-Netz mit Richtungen+Strecken: $d=3$; nur Richtungen: $d=4$).` },
                { title: "Falle: Excel-ATAN2", body: R`Excel: <code>ARCTAN2(Δx; Δy)</code>, also x zuerst! Danach mit $\rho = 200/\pi$ in gon umrechnen.` }
              ],
              checks: [
                {
                  type: "mc",
                  q: R`Höhennetz mit 8 Nivellementsbeobachtungen, 3 Neupunkten und 2 Festpunkten (Festpunkte werden nicht ausgeglichen). Wie groß ist die Redundanz $f$?`,
                  options: ["3", "5", "6", "10"],
                  answer: 1,
                  explain: R`$f = n - u + d = 8 - 3 + 0 = 5$. Festpunkte sind keine Unbekannten.`
                },
                {
                  type: "order",
                  q: "Bringe den MdkQ-Standardweg in die richtige Reihenfolge:",
                  steps: [
                    R`Funktionales Modell $\hat L = \varphi(\hat X)$ aufstellen`,
                    R`Näherungswerte $X^0$ festlegen`,
                    R`Konfigurationsmatrix $A$ und gekürzte Beobachtungen $l$`,
                    R`Gewichtsmatrix $P$ aufstellen`,
                    R`Normalgleichungen $N = A^TPA$, $n = A^TPl$`,
                    R`$Q = N^{-1}$, $\hat x = Q\,n$, $\hat X = X^0 + \hat x$`,
                    R`Verbesserungen $v = A\hat x - l$ und $s_0 = \sqrt{v^TPv/f}$`
                  ],
                  explain: "Modell → Näherung → Linearisierung → Gewichte → Normalgleichung → Lösung → Genauigkeit. Siehe Cheat Sheet „Standardweg der Ausgleichung“."
                },
                {
                  type: "mc",
                  q: R`Nivellementsstrecke $S = 2.5$ km, Genauigkeit $\sigma_{\Delta h} = \sigma_{km}\sqrt{S}$, und es gilt $\sigma_0 = \sigma_{km}$. Welches Gewicht $p$ bekommt die Beobachtung?`,
                  options: [R`$p = 2.5$`, R`$p = \sqrt{2.5} \approx 1.58$`, R`$p = 0.4$`, R`$p = 6.25$`],
                  answer: 2,
                  explain: R`$p = \sigma_0^2/\sigma_i^2 = \sigma_{km}^2 / (\sigma_{km}^2 \cdot S) = 1/S = 0.4$. Lange Linie → kleines Gewicht.`
                },
                {
                  type: "bug",
                  q: "Finde den Bug im Ausgleichungs-Code (tippe die fehlerhafte Zeile an):",
                  lines: [
                    "N  = A.T @ P @ A",
                    "n  = A.T @ P @ l",
                    "Q  = inv(N)",
                    "dx = Q @ n",
                    "X  = X0 - dx",
                    "v  = A @ dx - l",
                    "s0 = sqrt(v @ P @ v / f)"
                  ],
                  answer: 4,
                  explain: R`Der Zuschlag wird <b>addiert</b>: $\hat X = X^0 + \hat x$ (Skript Gl. 2.1-72).`
                },
                {
                  type: "mc",
                  q: R`Nach deiner Höhennetz-Ausgleichung ergibt sich $\sum v = -0.4$ mm. Was schließt du daraus?`,
                  options: [
                    "Rechenfehler – Σv muss exakt 0 sein",
                    R`Nichts Schlimmes. Entscheidend ist die Probe $A^TPv = 0$ (bzw. die Schlussprobe).`,
                    "Die Gewichte müssen alle auf 1 gesetzt werden",
                    "Ein Festpunkt muss als Unbekannte eingeführt werden"
                  ],
                  answer: 1,
                  explain: R`Σv = 0 gilt nur in Spezialfällen. Die echte Kontrolle ist $A^TPv = 0$ oder $v^TPv = l^TPl - \hat x^TN\hat x$.`
                },
                {
                  type: "mc",
                  q: R`Unbekannte $[H_{N1}, H_{N2}, H_{N3}]$. Beobachtung L2: Höhenunterschied von Festpunkt HFP1 nach N1. Wie sieht die Zeile in $A$ aus?`,
                  options: ["[ -1, 0, 0 ]", "[ +1, 0, 0 ]", "[ +1, -1, 0 ]", "[ 0, +1, 0 ]"],
                  answer: 1,
                  explain: R`$\Delta h_{i,k} = h_k - h_i$, also +1 beim Ziel (N1). Der Festpunkt HFP1 hat keine Spalte, seine Höhe wandert in $l$.`
                }
              ],
              sources: [
                "GoodNotes: 3. Semester/Ausgleichsrechnung/Vorlesungsfolien.pdf (Folien 01 Einleitung, 02 MdkQ)",
                "GoodNotes: 3. Semester/Ausgleichsrechnung/Skript.pdf – Kap. 1.2, 2.1, 2.2.1 (V 7.00)",
                "E-Learning: AGL Cheat Sheet v1.1 (HTML)",
                "E-Learning: Kursstruktur Block 1–4, Übungen UE01–UE05"
              ]
            }
          ]
        },
        { id: "photo", title: "Photogrammetrie und Fernerkundung", code: "6018013", icon: "◎", missions: [] },
        { id: "av",    title: "Angewandte Vermessung", code: "6018015", icon: "△", missions: [] },
        { id: "gisdb-anw", title: "GIS- und Datenbankanwendungen", code: "6018016", icon: "▦", missions: [] },
        { id: "gisdb", title: "Geoinformationssysteme und Datenbanken", code: "6018012", icon: "⬡", missions: [] },
        { id: "ai",    title: "Angewandte Informatik", code: "6018017", icon: "⌘", missions: [] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "nachhol",
      label: "Nachhol-Module",
      modules: [
        { id: "ma1", title: "Mathematik I", code: "6018001", icon: "∫", missions: [] },
        { id: "ma2", title: "Mathematik II", icon: "∑", missions: [] },
        {
          id: "oop",
          title: "Objektorientierte Programmierung",
          code: "6018007",
          prof: "Prof. Motzek (Folien/Skript)",
          icon: "{ }",
          missions: [
            {
              id: "oop-01-ausgabe-orakel",
              title: "Ausgabe-Orakel: Typen, Tupel, range & Slicing",
              minutes: 5,
              xp: 120,
              tldr: R`Klausur-Aufgabe 1 (SS 2024) ist ein Elfmeterschießen: 11 Mini-Ausdrücke, und du sagst voraus, was die IDLE-Shell ausgibt oder warum sie einen Fehler wirft. Jeder Treffer bringt schnelle Punkte, wenn du vier Regeln im Kopf hast: Operator-Typen, das Tupel-Komma, <code>range</code> ohne Endwert und Slicing mit negativer Schrittweite. Das trainierst du hier.`,
              core: [
                { h: "Regel 1 – Zahlen & Operatoren" },
                { list: [
                  R`<code>int</code> und <code>float</code> gemischt → <code>float</code>: <code>5 + (1.7)</code> → <code>6.7</code>`,
                  R`<code>//</code> Ganzzahldivision, <code>%</code> Rest, <code>**</code> Potenz (bindet am stärksten)`,
                  R`Gleicher Rang → von links nach rechts: <code>17 // 5 * 17 % 5</code> → <code>3*17 % 5</code> → <code>51 % 5</code> → <code>1</code>`
                ]},
                { h: "Regel 2 – Das Komma macht das Tupel" },
                { code: `(3)      # -> 3       (nur Klammer, int!)
(3,)     # -> (3,)    (Tupel mit 1 Element)
(3) + (1,2)   # TypeError: int + tuple
(3,) + (1,2)  # -> (3, 1, 2)   Verkettung
3 * (1,2)     # -> (1, 2, 1, 2, 1, 2)   Wiederholung
t = (1, 2); t[0] = 5   # TypeError: tuple ist unveränderbar`, lang: "python" },
                { h: "Regel 3 – range(start, stop, step): stop ist NIE dabei" },
                { code: `list(range(2, 14, 3))     # -> [2, 5, 8, 11]
tuple(range(24, 3, -5))   # -> (24, 19, 14, 9, 4)
list(range(5, 5))         # -> []`, lang: "python" },
                { h: "Regel 4 – Slicing [start:stop:step]" },
                { p: R`Gleiche Logik wie <code>range</code> über die Indizes. Negative Indizes zählen von hinten (<code>-1</code> = letztes Element). Bei negativer Schrittweite läuft man rückwärts, <code>stop</code> bleibt ausgeschlossen.` },
                { code: `L = [2, 5, 8, 11, 14, 17, 20, 23, 26]
#    0  1  2   3   4   5   6   7   8     (-1 = Index 8)
L[2:-1:3]   # Indizes 2, 5      -> [8, 17]

T = (4, 7, 10, 13, 16, 19, 22, 25, 28)
T[-3:1:-2]  # -3 = Index 6; 6, 4, 2 (1 nicht mehr) -> (22, 16, 10)`, lang: "python" },
                { note: R`Klausur-Technik: Indizes unter die Liste schreiben, dann wie bei <code>range(start, stop, step)</code> abzählen. Bei einer Fehlermeldung den <b>Fehlertyp</b> nennen (z. B. TypeError) und begründen.` },
                { h: "Bonus – Referenzen statt Kopien" },
                { code: `a = [1, 2]
b = a          # KEINE Kopie, b zeigt auf dieselbe Liste
b.append(3)
print(a)       # -> [1, 2, 3]`, lang: "python" }
              ],
              tips: [
                { title: "Schnelltest in der Shell", body: R`Jede Ausgabe lässt sich in Sekunden in IDLE testen. Tippe vor der Klausur alle Ausdrücke aus Aufgabe 1 selbst ein. Die Lösungen sind: 6.7 · 8.5 · TypeError · (1, 2, 1, 2, 1, 2) · (3, 1, 2) · 15 · 1016 · [2, 5, 8, 11] · (24, 19, 14, 9, 4) · [8, 17] · (22, 16, 10).` },
                { title: "Strings verhalten sich wie Tupel", body: R`<code>'1' + 3*'0'</code> → <code>'1000'</code>, und <code>"Geo"[::-1]</code> → <code>'oeG'</code>. Strings sind ebenfalls unveränderbare Sequenzen.` },
                { title: "Hinweis zu Folie 16 (zip)", body: R`Auf der Folie steht, dass <code>print(zip(...))</code> eine Liste ausgibt. Das stimmt nur in Python 2. In Python 3 kommt <code>&lt;zip object …&gt;</code>, für die Liste brauchst du <code>list(zip(...))</code>.` }
              ],
              traps: [
                { title: "Falle: (3) ist kein Tupel", body: R`Erst das Komma macht ein Tupel: <code>(3,)</code>. <code>(3) + (1,2)</code> ist deshalb <code>int + tuple</code> → TypeError.` },
                { title: "Falle: Endwert mitgezählt", body: R`<code>range(2,14,3)</code> endet bei 11, nicht bei 14. Das gleiche gilt beim Slicing: Der stop-Index gehört nie dazu.` },
                { title: "Falle: Tupel-Elemente zuweisen", body: R`<code>t[0] = 5</code> oder <code>t.append(…)</code> bei Tupeln → TypeError bzw. AttributeError.` }
              ],
              checks: [
                { type: "mc", q: "Was gibt die Shell aus?", code: "(7,) * 2", options: ["14", "(14,)", "(7, 7)", "TypeError"], answer: 2, explain: "Das Komma macht ein Tupel, und * wiederholt es: (7, 7)." },
                { type: "mc", q: "Und jetzt ohne Komma?", code: "(7) * 2", options: ["14", "(7, 7)", "(14,)", "TypeError"], answer: 0, explain: "(7) ist nur ein geklammerter int → 14." },
                { type: "mc", q: "Was gibt die Shell aus?", code: "list(range(10, 0, -3))", options: ["[10, 7, 4, 1]", "[10, 7, 4, 1, -2]", "[10, 7, 4]", "[]"], answer: 0, explain: "Start 10, Schritt −3, Stop 0 ausgeschlossen: 10, 7, 4, 1." },
                { type: "mc", q: "Was gibt die Shell aus?", code: "[1, 2, 3, 4, 5, 6, 7, 8][1:-2:2]", options: ["[2, 4, 6, 8]", "[2, 4, 6]", "[1, 3, 5]", "[2, 4]"], answer: 1, explain: "Index 1 bis (ausschließlich) Index 6 (−2), Schritt 2 → Indizes 1, 3, 5 → [2, 4, 6]." },
                { type: "mc", q: "Was gibt die Shell aus?", code: "(4, 7, 10, 13, 16)[-1:0:-2]", options: ["(16, 10, 4)", "(16, 10)", "(4, 10, 16)", "()"], answer: 1, explain: "Start Index 4 (16), rückwärts in 2er-Schritten, Index 0 ist ausgeschlossen → (16, 10)." },
                { type: "mc", q: "Was gibt die Shell aus?", code: "17 // 5 * 17 % 5", options: ["0", "1", "3", "51"], answer: 1, explain: "Gleicher Rang, von links: 17//5 = 3 → 3*17 = 51 → 51 % 5 = 1." },
                {
                  type: "order",
                  q: R`Sortiere die Auswertungsschritte von <code>2**4 + int('1' + 3*'0')</code>:`,
                  steps: ["2**4 → 16", "3*'0' → '000'", "'1' + '000' → '1000'", "int('1000') → 1000", "16 + 1000 → 1016"],
                  explain: "Python wertet den linken Operanden von + zuerst aus, dann rechts von innen nach außen."
                },
                {
                  type: "bug",
                  q: "Welche Zeile wirft einen Fehler?",
                  lines: ["punkte = (101, 102, 103)", "anzahl = len(punkte)", "erster = punkte[0]", "punkte.append(104)", "print(anzahl, erster)"],
                  answer: 3,
                  explain: "Tupel sind unveränderbar und haben keine append-Methode → AttributeError. Lösung: Liste verwenden oder punkte + (104,)."
                },
                { type: "mc", q: "Was gibt print(a) aus?", code: "a = [1, 2]\nb = a\nb.append(3)\nprint(a)", options: ["[1, 2]", "[1, 2, 3]", "[3]", "NameError"], answer: 1, explain: "b = a kopiert nicht, beide Namen zeigen auf dieselbe Liste." }
              ],
              sources: [
                "iCloud Uni: Semester_2/Objektorientierte Informatik/OOP Klausur SS 2024.pdf (Aufgabe 1–7)",
                "GoodNotes: 2. Semester/OOP/Folien Motzek – slides_11 (Listen, range), slides_16 (Tupel, zip)",
                "GoodNotes: 2. Semester/OOP/Folien Motzek – slides_12–14 (gesichtet für Mission 2: Klassen)",
                "E-Learning: Kurs 33117 – Skript Motzek, Folien, Übungsblätter 01–13 + Lösungen"
              ]
            }
          ]
        },
        {
          id: "lm1",
          title: "Landmanagement I",
          code: "6018008",
          prof: "Prof. Dr. Daniela Wenzel",
          icon: "▤",
          missions: [
            /* ---------------------------------------------------------- */
            {
              id: "lm1-01-eingriff",
              weak: true,
              title: "Eingriffsregelung & Ausgleichsbedarf rechnen",
              minutes: 6,
              xp: 120,
              tldr: R`Ein Baugebiet ist ein Foul an der Natur, und die Eingriffsregelung ist der Strafstoß, den die Gemeinde ausgleichen muss. Du bewertest die Fläche in Wertpunkten (WP), multiplizierst mit Fläche und Beeinträchtigungsfaktor (= GRZ) und ziehst ggf. bis zu 20 % Planungsfaktor ab. Dann prüfst du, ob die Ausgleichsflächen genug WP „zurückholen“. Laut deinen Folien ist das <b>ganze Thema klausurrelevant</b>, und die Übersichtstabelle bekommst du in der Klausur.`,
              core: [
                { h: "Rechtsgrundlagen" },
                { list: [
                  R`§ 1a BauGB (sparsamer Umgang mit Grund und Boden, Vermeidung + Ausgleich von Eingriffen)`,
                  R`§§ 12 ff. BNatSchG · Art. 6 Abs. 1 BayNatSchG · BayKompV`,
                  R`Leitfaden „Bauen im Einklang mit Natur und Landschaft“ (StMB)`,
                  R`In Bayern seit <b>01.01.2001</b> in jeder Bauleitplanung verpflichtend zu prüfen und abzuwägen`
                ]},
                { h: "Was ist ein Eingriff?" },
                { p: R`Veränderung der Gestalt oder Nutzung von Grundflächen (oder des Grundwasserspiegels), die den Naturhaushalt oder das Landschaftsbild <b>erheblich</b> beeinträchtigen kann. Reihenfolge: <b>vermeiden → ausgleichen</b>. Nicht ausgleichbare Beeinträchtigungen (z. B. streng geschützte Arten) machen den Eingriff unzulässig.` },
                { note: R`<b>Landwirtschaftsklausel:</b> Land-, forst- und fischereiwirtschaftliche Nutzung ist kein Eingriff, wenn die Ziele des Naturschutzes berücksichtigt werden.` },
                { h: "4 Modelle für den Ausgleich" },
                { table: { head: ["Modell", "Wo?"], rows: [
                  ["A", "auf dem Baugrundstück selbst"],
                  ["B", "im sonstigen Geltungsbereich des B-Plans (z. B. grüner Ortsrand)"],
                  ["C", "auf einer anderen Fläche (z. B. intensive Wiese → Obst-/Magerwiese), oft über 2. B-Plan"],
                  ["D", "zeitlich vorgezogen: <b>Ökokonto</b> (§ 135a Abs. 2 BauGB), später dem B-Plan zugeordnet"]
                ]}},
                { p: R`Das Ökokonto steht nur Gemeinden offen (in Abstimmung mit der Unteren Naturschutzbehörde). Vorteile: größere zusammenhängende Flächen, kein Zeitdruck beim Erwerb und eine „Verzinsung“ von ca. 3 % pro Jahr bis zur Abbuchung.` },
                { h: "Vereinfachtes Verfahren oder Regelverfahren?" },
                { p: R`Das <b>vereinfachte Verfahren</b> geht nur, wenn alles zutrifft: B-Plan mit integriertem Grünordnungsplan, WR/WA, <b>GRZ ≤ 0,3</b>, Geltungsbereich <b>≤ 2 ha</b>, <b>nicht im Hang- oder Auenbereich</b>, an bestehende Bebauung angrenzend, nur Flächen geringer Bedeutung, kein Grundwassereingriff. Sonst gilt das <b>Regelverfahren</b>.` },
                { h: "Regelverfahren – die 5 Schritte" },
                { table: { head: ["Bedeutung BNT", "WP", "Beeinträchtigungsfaktor", "Planungsfaktor"], rows: [
                  ["gering (Biotopwert 1–5)", "3", "GRZ", "bis −20 %"],
                  ["mittel (Biotopwert 6–10)", "8", "GRZ", "bis −20 %"],
                  ["hoch (Biotopwert 11–15)", "11–15 (tatsächlicher Wert)", "1", "bis −20 %"]
                ]}},
                { math: R`\begin{aligned}\text{Bedarf} &= \text{Fläche} \times \text{WP} \\ &\quad \times \text{Beeinträchtigungsfaktor} \\ &\quad \times (1 - \text{Planungsfaktor})\end{aligned}` },
                { p: R`Der Beeinträchtigungsfaktor liegt zwischen 0,3 und 1. Bei unterschiedlichen GRZ rechnest du für jede Teilfläche einzeln und summierst. Der Planungsfaktor (max. 20 %) gibt es nur für <b>konkrete Vermeidungsmaßnahmen</b>.` },
                { math: R`\text{Ausgleichsumfang [WP]} = \text{Fläche} \times (\text{WP}_{\text{Prognose}} - \text{WP}_{\text{Ausgang}})` },
                { p: R`<b>Bilanz</b> = Ausgleichsumfang − Ausgleichsbedarf. Ist sie negativ, muss mehr ausgeglichen werden (Ökokonto oder Flächen außerhalb des Geltungsbereichs). Zum Schluss werden die Flächen ans Ökoflächenkataster des LfU gemeldet.` },
                { p: R`<b>Timelag</b> (Entwicklungszeit bis zum Zielbiotop): 26–49 J. → −1 WP, 50–79 J. → −2 WP, ≥ 80 J. → −3 WP. <b>Entsiegelung</b>: Aufwertung × 1,5 (ungebundene Befestigung) bzw. × 3 (Asphalt/Beton).` },
                { h: "Musterlösung aus der Übung (Hanglage, BNT mittel)" },
                { table: { head: ["", "Rechnung", "WP"], rows: [
                  ["Bedarf", "47.000 m² (WR 1–4) × 8 × 0,4", "150.400"],
                  ["Umfang", "29.000 m² × (12 − 8)", "116.000"],
                  ["Bilanz", "116.000 − 150.400", "−34.400"]
                ]}},
                { p: R`Die Bundesstraße (1,3 ha) bleibt draußen, weil sie nur wegen der Einmündung im Geltungsbereich liegt. Ergebnis: Der Ausgleich reicht nicht, die Gemeinde gleicht über das <b>Ökokonto</b> oder Flächen <b>außerhalb</b> des Geltungsbereichs aus.` }
              ],
              tips: [
                { title: "Klausur-Schema in 4 Zeilen", body: R`1) Eingriffsfläche bestimmen (was wird wirklich neu bebaut?) · 2) BNT → WP und GRZ ablesen · 3) Bedarf = Fläche × WP × GRZ (× (1−PF)) · 4) Umfang = Ausgleichsfläche × Aufwertung, dann Bilanz + Satz zur Alternative.` },
                { title: "Teilflächen mit verschiedenen GRZ", body: R`Übung 13: WR1 auf BNT hoch → Faktor 1, nicht die GRZ! 6.000 × 12 × 1 + 7.500 × 3 × 0,3 + 7.500 × 3 × 0,4 + 6.000 × 3 × 0,3 = <b>93.150 WP</b>.` }
              ],
              traps: [
                { title: "Falle: Bei BNT hoch die GRZ nehmen", body: R`Bei hoher Bedeutung ist der Beeinträchtigungsfaktor immer <b>1</b>.` },
                { title: "Falle: Ausgleichsfläche mit vollem WP rechnen", body: R`Angerechnet wird nur die <b>Aufwertung</b> (Prognose − Ausgang), z. B. 12 − 8 = 4 WP/m², nicht 12.` },
                { title: "Falle: Bestandsflächen als Eingriff zählen", body: R`Bestehende Straßen oder Flächen, die nicht verändert werden, sind kein Eingriff, auch wenn sie im Geltungsbereich liegen.` }
              ],
              checks: [
                { type: "mc", q: R`Eingriffsfläche 10.000 m², BNT mittlerer Bedeutung, GRZ 0,35, konkrete Vermeidungsmaßnahmen → Planungsfaktor 10 %. Wie groß ist der Ausgleichsbedarf?`, options: ["28.000 WP", "25.200 WP", "80.000 WP", "35.000 WP"], answer: 1, explain: R`10.000 × 8 × 0,35 = 28.000 WP, abzüglich 10 % → <b>25.200 WP</b>.` },
                { type: "mc", q: R`Die Ausgleichsfläche (heute BNT mittel, 8 WP) wird zu einem Biotop mit 12 WP entwickelt. Wie viel m² brauchst du für 25.200 WP?`, options: ["2.100 m²", "3.150 m²", "6.300 m²", "25.200 m²"], answer: 2, explain: R`Aufwertung 12 − 8 = 4 WP/m² → 25.200 / 4 = <b>6.300 m²</b>.` },
                { type: "mc", q: "Welcher Beeinträchtigungsfaktor gilt für eine Teilfläche mit BNT hoher Bedeutung im WR mit GRZ 0,3?", options: ["0,3", "0,8", "1", "Planungsfaktor"], answer: 2, explain: "BNT hoch → immer Faktor 1, die GRZ zählt nur bei geringer/mittlerer Bedeutung." },
                { type: "mc", q: "Ein Baugebiet (WA, GRZ 0,3, 1,8 ha) liegt in Hanglage. Welches Verfahren?", options: ["Vereinfachtes Verfahren", "Regelverfahren", "Keine Eingriffsregelung nötig", "Landwirtschaftsklausel"], answer: 1, explain: "Hang- oder Auenbereich schließt das vereinfachte Verfahren aus → Regelverfahren." },
                { type: "order", q: "Bringe das Regelverfahren in die richtige Reihenfolge:", steps: ["Bestandserfassung: BNT bewerten, WP × Fläche", "Eingriffsschwere: Beeinträchtigungsfaktor (GRZ bzw. 1)", "Ausgleichsbedarf ermitteln (ggf. − Planungsfaktor)", "Geeignete Ausgleichsmaßnahmen und Ausgangszustand bestimmen", "Ausgleichsumfang berechnen und bilanzieren"], explain: "Schritte 1–5 aus dem Leitfaden (Folien 16–21)." },
                { type: "mc", q: "Die Bilanz ist negativ (−34.400 WP). Was kann die Gemeinde tun?", options: ["Nichts, der B-Plan ist trotzdem fertig", "Ausgleich über Ökokonto oder Flächen außerhalb des Geltungsbereichs", "Den Planungsfaktor auf 50 % erhöhen", "Die Landwirtschaftsklausel anwenden"], answer: 1, explain: "Genau so steht es in der Musterlösung: Ökokonto oder andere Flächen außerhalb des Geltungsbereichs (Modell C/D)." }
              ],
              sources: [
                "GoodNotes: 2. Semester/Landmanagement/1. Städtebauliche Planung.pdf – Kap. Eingriffsregelung (Folien 3–23)",
                "iCloud: Übungsaufgabe_Eingriff.pdf + Lösung_Übungsaufgabe.pdf",
                "iCloud: 2_Übungsaufgaben_Lösung.pdf (Aufgaben 12, 13)",
                "E-Learning Kurs 33000: 7. Eingriffsregelung, Übung + Lösung Eingriffsregelung",
                "Deine Klausureinsicht-Notizen: Eingriffsregelung (!), Ausgleichsbedarf rechnen (!), Planungsfaktor"
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-02-flurneuordnung",
              weak: true,
              title: "Flurneuordnung: Verfahren, TG & Aufbau der Ländlichen Entwicklung",
              minutes: 5,
              xp: 120,
              tldr: R`Flurneuordnung ist ein Transferfenster für Äcker: Viele kleine, verstreute Flurstücke werden zu großen, gut erschlossenen Schlägen getauscht, und keiner darf dabei Wert verlieren. Die Mannschaft sind alle Eigentümer als <b>Teilnehmergemeinschaft (TG)</b>, der Schiedsrichter ist das <b>Amt für Ländliche Entwicklung (ALE)</b>. Du musst wissen, wer was macht und in welcher Reihenfolge das Verfahren läuft.`,
              core: [
                { h: "Legaldefinition § 1 FlurbG" },
                { p: R`Zur Verbesserung der Produktions- und Arbeitsbedingungen in der Land- und Forstwirtschaft sowie zur Förderung der allgemeinen Landeskultur und der Landentwicklung kann ländlicher Grundbesitz neu geordnet werden.` },
                { h: "Instrumente der Ländlichen Entwicklung" },
                { list: [
                  R`<b>Flurneuordnung</b> (Regelverfahren): Erschließung + Zusammenlegung, Biotopvernetzung`,
                  R`<b>Unternehmensverfahren</b>: Land für Großprojekte (Autobahn, Flughafen) bereitstellen, Enteignung vermeiden, Abzug nach § 88 FlurbG`,
                  R`<b>Beschleunigte Zusammenlegung</b>: kaum Wegebau, möglichst über Vereinbarungen`,
                  R`<b>Freiwilliger Landtausch</b> (Eigentum) / <b>Freiwilliger Nutzungstausch</b> (nur Pacht/Bewirtschaftung)`,
                  R`<b>Dorferneuerung</b>: Ortsbild, Innenentwicklung, Nahversorgung`
                ]},
                { h: "Aufbau der Verwaltung (Bayern)" },
                { table: { head: ["Ebene", "Behörde"], rows: [
                  ["Oberste Flurbereinigungsbehörde", "Bayer. Staatsministerium für Ernährung, Landwirtschaft, Forsten und Tourismus (StMELF)"],
                  ["Obere Flurbereinigungsbehörde", "Ämter für Ländliche Entwicklung (ALE)"],
                  ["Flurbereinigungsbehörde", "ALE + Teilnehmergemeinschaften (für übertragene Aufgaben)"]
                ]}},
                { p: R`7 ALE: Unterfranken (Würzburg), <b>Oberfranken (Bamberg)</b>, Mittelfranken (Ansbach), Oberpfalz (Tirschenreuth), Niederbayern (Landau), Schwaben (Krumbach), Oberbayern (München). Der <b>Verband für Ländliche Entwicklung</b> (KdöR) ist der Zusammenschluss der TGen im Dienstbezirk.` },
                { h: "Beteiligte (§ 10 FlurbG)" },
                { p: R`<b>Teilnehmer</b>: Eigentümer und Erbbauberechtigte, aktiv, wählen den Vorstand. <b>Nebenbeteiligte</b>: Gemeinden, Körperschaften, die Land erhalten, Wasser- und Bodenverbände, Inhaber von Rechten (Pacht, Nießbrauch, Leitungsrecht …). Ihre Rechte werden gewahrt, sie wirken aber nicht direkt mit.` },
                { h: "Teilnehmergemeinschaft (TG)" },
                { list: [
                  R`Alle Teilnehmer (§ 16), <b>Körperschaft des öffentlichen Rechts</b>`,
                  R`Entsteht mit dem <b>Flurbereinigungsbeschluss</b> (§ 6), steht unter Aufsicht des ALE (§ 17)`,
                  R`Organe: Teilnehmerversammlung (wählt) + Vorstand (führt Geschäfte). Vorsitz bestimmt das Amt.`,
                  R`Eigene Aufgaben (§ 18 (1)): gemeinschaftliche Anlagen herstellen, unterhalten, Kosten verteilen`,
                  R`Übertragene Aufgaben (§ 18 (2), Art. 2 AGFlurbG): Planung der Anlagen, <b>Wertermittlung</b>, <b>Neuverteilung</b>, Flurbereinigungsplan`,
                  R`Erlischt mit der <b>Schlussfeststellung</b> (§ 149), besteht fort, wenn noch Aufgaben offen sind (§§ 151–153)`
                ]},
                { h: "Verfahrensablauf (Semesterfahrplan)" },
                { p: R`Startphase/Anordnung → TG → Wege- und Gewässerplan (§ 41) → Wertermittlung → Neuverteilung (Wunschtermin § 57) → Vorläufige Besitzeinweisung (§ 65) → Flurbereinigungsplan (§ 58) → Ausführungsanordnung, Berichtigung der öffentlichen Bücher → Schlussfeststellung.` },
                { note: R`<b>Vorläufige Besitzeinweisung</b>: Voraussetzung sind abgemarkte und vorgewiesene Grenzen sowie <b>festgestellte</b> (nicht unanfechtbare!) Wertermittlungsergebnisse. Widerspruchsfrist 1 Monat.` }
              ],
              tips: [
                { title: "Merksatz TG", body: R`„Entsteht mit dem Beschluss, stirbt mit der Schlussfeststellung, außer sie hat noch Schulden oder Anlagen.“` },
                { title: "Fall aus der Übung", body: R`Ein Teilnehmer reißt nach der Abmarkung die Pflöcke raus. Die Besitzeinweisung bleibt rechtmäßig. Der neue Besitzer beantragt eine Grenzanzeige beim TG-Vorsitzenden, die Kosten trägt der Verursacher (§ 107 (2) FlurbG).` }
              ],
              traps: [
                { title: "Falle: ALE ≠ ADBV", body: R`Das <b>ALE</b> (Landwirtschaftsministerium) macht die Flurneuordnung. Das <b>ADBV</b> (Finanzministerium) führt das Liegenschaftskataster. Nicht verwechseln!` },
                { title: "Falle: Pächter als Teilnehmer", body: R`Pächter sind <b>Nebenbeteiligte</b>, nicht Teilnehmer.` }
              ],
              checks: [
                { type: "mc", q: "Wer ist in Bayern die Obere Flurbereinigungsbehörde?", options: ["Landesamt für Digitalisierung, Breitband und Vermessung", "Amt für Ländliche Entwicklung", "Landratsamt", "Teilnehmergemeinschaft"], answer: 1, explain: "Obere Flurbereinigungsbehörde und Flurbereinigungsbehörde sind die ALE, oberste ist das StMELF." },
                { type: "mc", q: "Wann entsteht die Teilnehmergemeinschaft?", options: ["Mit dem Antrag der Gemeinde", "Mit dem Flurbereinigungsbeschluss (§ 6 FlurbG)", "Mit der vorläufigen Besitzeinweisung", "Mit der Schlussfeststellung"], answer: 1, explain: "Die TG entsteht mit dem Flurbereinigungsbeschluss und erlischt mit der Schlussfeststellung." },
                { type: "mc", q: "Ein Pächter bewirtschaftet Flächen im Verfahrensgebiet. Welche Rolle hat er?", options: ["Teilnehmer", "Nebenbeteiligter", "Vorstand der TG", "Gar keine"], answer: 1, explain: R`Inhaber von Rechten (Pacht, Nießbrauch …) sind Nebenbeteiligte nach § 10 Nr. 2 FlurbG.` },
                { type: "order", q: "Bringe die Verfahrensphasen in die richtige Reihenfolge:", steps: ["Startphase, Anordnung des Verfahrens", "Teilnehmergemeinschaft bildet sich, Vorstandswahl", "Wege- und Gewässerplan (§ 41)", "Wertermittlung", "Neuverteilung", "Vorläufige Besitzeinweisung", "Flurbereinigungsplan, Schlussfeststellung"], explain: "Genau die Reihenfolge des Semesterfahrplans Ländliche Neuordnung." },
                { type: "mc", q: "Welche Aufgabe ist eine EIGENE Aufgabe der TG (§ 18 (1))?", options: ["Wertermittlung", "Neuverteilung", "Herstellung und Unterhaltung der gemeinschaftlichen Anlagen", "Aufstellung des Flurbereinigungsplans"], answer: 2, explain: "Wertermittlung, Neuverteilung und Plan sind übertragene Aufgaben (§ 18 (2) + Art. 2 AGFlurbG)." },
                { type: "mc", q: "Eine Eigentümerin hat gegen die Feststellung der Wertermittlung Widerspruch eingelegt, der noch läuft. Muss die vorläufige Besitzeinweisung aufgehoben werden?", options: ["Ja, die Ergebnisse müssen unanfechtbar sein", "Nein, sie müssen nur festgestellt sein", "Ja, immer bei jedem Widerspruch", "Nur wenn die Gemeinde zustimmt"], answer: 1, explain: "Übung Fall 2: festgestellt reicht, unanfechtbar ist nicht nötig." }
              ],
              sources: [
                "GoodNotes: 2. Semester/Landmanagement/3. Ländliche Neuordnung.pdf – Einführung, TG, Besitzeinweisung",
                "iCloud: Ablauf.pdf, Lösung_Aufgaben.pdf (Fälle 1–4 Besitzeinweisung)",
                "GoodNotes: Übungen.pdf – Übungsaufgaben LN",
                "E-Learning Kurs 33000: Block Ländliche Neuordnung 1–8",
                "Deine Klausureinsicht-Notizen: Flurneuordnung/Flurbereinigungsverfahren (!), Aufbau ländl. Entw."
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-03-wertermittlung",
              weak: true,
              title: "Wertermittlung, Bodenschätzung & Forderung berechnen",
              minutes: 5,
              xp: 120,
              tldr: R`Beim Ackertausch zählt nicht die Fläche, sondern der Wert. Wie bei Kickbase der Marktwert und nicht die Trikotnummer. Die Bodenschätzung von 1934 (oft „Reichsbodenschätzung“ genannt) war für das Finanzamt gemacht, deshalb schätzt die TG im Verfahren neu: Wertzahlen → <b>Wertverhältniszahl (WVZ)</b> → Einlage → minus Abzug = <b>Forderung</b>.`,
              core: [
                { h: "Bodenschätzung vs. Wertermittlung" },
                { table: { head: ["", "Bodenschätzung (1934)", "Wertermittlung (§§ 27–33 FlurbG)"], rows: [
                  ["Ziel", "gerechte Besteuerung, Beleihung, Planung", "Wertverhältnis Einlage ↔ Zuteilung, wertgleicher Tausch"],
                  ["Gebiet", "ganz Deutschland (grobmaschig)", "Verfahrensgebiet (feinmaschig)"],
                  ["Wer", "Sachverständige im Finanzamt", "Erweiterter Vorstand der TG"],
                  ["Wertsystem", "Acker-/Grünlandschätzungsrahmen", "lokales Netz von Mustergründen"]
                ]}},
                { p: R`Ackerland: Bodenzahl → Ackerzahl. Grünland: Grünlandgrundzahl → Grünlandzahl (Abschläge für Klima/Gelände, Basis 8 °C und 600 mm/Jahr).` },
                { p: R`<b>Warum nicht direkt verwenden?</b> Die heutige Technik und Wirtschaft ist nicht berücksichtigt, die Wertverhältnisse leichter/schwerer Böden haben sich verschoben, die Wasserverhältnisse haben sich geändert (Dränung), und die Schätzung ist zu ungenau.` },
                { h: "Wer schätzt? Wie läuft es?" },
                { list: [
                  R`<b>Erweiterter Vorstand</b> der TG = gewählter Vorstand + 2–4 landwirtschaftliche Sachverständige (nominiert vom Bauernverband, stimmberechtigt)`,
                  R`Ablauf: Mustergründe + Wertermittlungsrahmen → Grundsätze für Zu-/Abschläge → Einzelschätzung (Raster 20–30 m, Bohrstock) → Wertermittlungskarte`,
                  R`Abschläge in Wertzahlen: Hang (H), Nässe (N, bis 4–6), Waldrand (W, je nach Lage des Waldes), Steine (S, bis 3), Leitungen (L), Masten. Zuschlag: Abbauland`,
                  R`Verfahren: 2 Wochen Auslegung → Einwendungen → <b>Feststellung</b> (Vorstandsbeschluss) → Bekanntmachung → 1 Monat Widerspruch`
                ]},
                { h: "Rechnen: WVZ, Einlage, Forderung" },
                { math: R`\text{WVZ} = \frac{\text{Fläche [m}^2]}{10\ \text{m}^2} \times \text{Wertzahl}` },
                { math: R`\text{Forderung} = \text{Einlage} - \text{Abzug}_{\S 47} - \text{Abzug}_{\S 88}` },
                { table: { head: ["Klasse", "Fläche", "Wertzahl", "WVZ"], rows: [
                  ["1", "583 m²", "23", "1.340,9"],
                  ["2", "1.342 m²", "20", "2.684,0"],
                  ["3", "624 m²", "17", "1.060,8"],
                  ["<b>Einlage</b>", "", "", "<b>5.086 WVZ</b>"],
                  ["Forderung bei 6,3 % Abzug", "", "", "<b>4.766 WVZ</b>"]
                ]}},
                { p: R`<b>Landabzug § 47</b>: Land für gemeinschaftliche und öffentliche Anlagen (neue Wege, Landschaftspflege, Wasserwirtschaft) minus Fläche der alten Wege, plus Neumessungsdifferenz und Rundung auf 0,1 %. Alle tragen ihn im Verhältnis des Werts ihrer alten Grundstücke. <b>§ 88</b> ist der Abzug für Unternehmen (z. B. Bundesstraße), dafür gibt es eine Entschädigung.` },
                { h: "Abfindungsgrundsätze (§§ 44, 45 FlurbG)" },
                { list: ["1. Wertgleichheit (§ 44 (1))", "2. Abwägungsgebot (§ 44 (2))", "3. Entsprechungsgebot: Nutzungsart, Beschaffenheit, Bodengüte, Entfernung zum Hof (§ 44 (4))", "4. Gestaltungsrichtlinien: große, erschlossene Grundstücke (§ 44 (3))", "5. Privilegierte Grundstücke: Hofflächen, Gärtnereien, Friedhöfe … (§ 45)"] }
              ],
              tips: [
                { title: "Rechenweg sauber hinschreiben", body: R`(583·23 + 1342·20 + 624·17) / 10 = 50.857 / 10 ≈ <b>5.086 WVZ</b>. Dann × (1 − 0,063) ≈ <b>4.766 WVZ</b>. Die Formel immer zuerst allgemein hinschreiben, dafür gibt es Teilpunkte.` },
                { title: "Wertbezogener Tausch", body: R`Gleicher Wert ≠ gleiche Fläche: 1 ha mit Wertzahl 20 entspricht 0,8 ha mit WZ 25 (−20 %) oder 1,333 ha mit WZ 15 (+33 %).` }
              ],
              traps: [
                { title: "Falle: Bodenschätzung = Wertermittlung", body: R`Die Bodenschätzung macht das Finanzamt für Steuern, die Wertermittlung macht die TG für den Tausch. Das wird gerne als Vergleich gefragt.` },
                { title: "Falle: Abzug in m² statt in WVZ", body: R`Die Forderung wird in <b>Wert</b> (WVZ) gerechnet, nicht in Fläche.` }
              ],
              checks: [
                { type: "mc", q: "Ein Flurstück hat 1.200 m² mit Wertzahl 18 und 800 m² mit Wertzahl 12. Wie groß ist die Einlage?", options: ["3.000 WVZ", "3.120 WVZ", "31.200 WVZ", "2.000 WVZ"], answer: 1, explain: R`(1.200/10)·18 + (800/10)·12 = 2.160 + 960 = <b>3.120 WVZ</b>.` },
                { type: "mc", q: "Wie hoch ist die Forderung aus 3.120 WVZ bei 5 % Landabzug nach § 47?", options: ["3.276 WVZ", "2.964 WVZ", "3.115 WVZ", "2.808 WVZ"], answer: 1, explain: R`3.120 × 0,95 = <b>2.964 WVZ</b>. Forderung = Einlage − Abzug.` },
                { type: "mc", q: "Wer führt in Bayern die Wertermittlung im Flurbereinigungsverfahren durch?", options: ["Sachverständige des Finanzamts", "Das ADBV", "Der erweiterte Vorstand der TG", "Die Gemeinde"], answer: 2, explain: "Gewählter Vorstand + 2–4 landwirtschaftliche Sachverständige = erweiterter Vorstand." },
                { type: "mc", q: "Warum reicht die Bodenschätzung für die Flurbereinigung NICHT aus?", options: ["Sie ist nur für Wald gemacht", "Sie ist zu grob und veraltet (Technik, Wasserverhältnisse, Wertverhältnisse)", "Sie ist geheim", "Sie gibt Werte in Euro an"], answer: 1, explain: "Die vier Gründe von Folie 14: Entwicklung, Wertverhältnisse, Wasserverhältnisse, zu ungenau." },
                { type: "mc", q: "Was gehört NICHT zum Landabzug nach § 47 FlurbG?", options: ["Neue Wege", "Flächen für Landschaftspflege (Hecken)", "Land für eine Bundesstraße (Unternehmensverfahren)", "Neumessungsdifferenz"], answer: 2, explain: R`Das Land für ein Unternehmen fällt unter den Abzug nach <b>§ 88</b> und wird entschädigt.` },
                { type: "bug", q: "Finde den Fehler in der Forderungsberechnung:", lines: ["Einlage = Σ (Fläche_i / 10 m²) × Wertzahl_i", "Einlage = 5.086 WVZ", "Abzug § 47 = 6,3 %", "Forderung = Einlage + Abzug", "Forderung = 4.766 WVZ"], answer: 3, explain: R`Der Abzug wird <b>abgezogen</b>: Forderung = Einlage − Abzug.` }
              ],
              sources: [
                "GoodNotes: 3. Ländliche Neuordnung.pdf – Kap. 5 Wertermittlung, Kap. 6 Neuverteilung",
                "GoodNotes: Übungen.pdf – Übungsaufgaben LN, Aufgaben 6/7 (Müller, Grundstück 699) + Lösung",
                "E-Learning Kurs 33000: 5. Wertermittlung, 6. Neuverteilung",
                "Deine Klausureinsicht-Notizen: Wertermittlung, Forderung errechnet Eigentümer, (Reichs-)Bodenschätzung"
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-04-bplan",
              weak: true,
              title: "Bebauungsplan: Nutzungsschablone, GRZ/GFZ & Arten",
              minutes: 5,
              xp: 120,
              tldr: R`Der B-Plan ist das Regelbuch für ein Baugebiet: Er legt fest, was wo wie groß gebaut werden darf. Die <b>Nutzungsschablone</b> ist der Spielerpass, auf dem Art, Maß und Bauweise stehen. Die Klausur-Klassiker: GRZ/GFZ ausrechnen, prüfen, ob ein Haus zulässig ist, und die B-Plan-Arten unterscheiden.`,
              core: [
                { h: "FNP vs. B-Plan" },
                { table: { head: ["", "Flächennutzungsplan", "Bebauungsplan"], rows: [
                  ["Typ", "vorbereitender Bauleitplan", "verbindlicher Bauleitplan"],
                  ["Rechtscharakter", "Gemeindebeschluss (behördenverbindlich)", "<b>Satzung</b> (Gesetz auf kommunaler Ebene)"],
                  ["Umfang", "ganzes Gemeindegebiet", "Teile des Gemeindegebiets"],
                  ["Inhalt", "Darstellungen (Bauflächen W, M, G, S)", "Festsetzungen (Baugebiete WR, WA, MI …)"]
                ]}},
                { p: R`Träger der Bauleitplanung ist die <b>Gemeinde</b>. Rechtsgrundlagen: BauGB, BauNVO (gilt die Fassung zum Satzungsbeschluss), PlanZV, Art. 81 BayBO. Grundkarte meist 1:1000 / 1:500.` },
                { h: "Maß der baulichen Nutzung" },
                { math: R`\text{GRZ} = \frac{\text{Grundfläche}}{\text{Grundstücksfläche}} \qquad \text{GFZ} = \frac{\text{Geschossfläche (alle Vollgeschosse)}}{\text{Grundstücksfläche}}` },
                { p: R`BMZ = m³ Baumasse je m² Grundstück. Nach § 19 (4) BauNVO dürfen Nebenanlagen (Garage, Zufahrt) die GRZ um <b>50 %</b> überschreiten, Kappungsgrenze <b>0,8</b>.` },
                { table: { head: ["Gebiet (§ 17 BauNVO)", "GRZ", "GFZ", "BMZ"], rows: [
                  ["WS / Wochenendhaus", "0,2", "0,4 / 0,2", "–"],
                  ["WR, WA", "0,4", "1,2", "–"],
                  ["WB", "0,6", "1,6", "–"],
                  ["MD, MI, MDW", "0,6", "1,2", "–"],
                  ["MU", "0,8", "3,0", "–"],
                  ["MK", "1,0", "3,0", "–"],
                  ["GE, GI, SO", "0,8", "2,4", "10,0"]
                ]}},
                { h: "Überbaubare Fläche & Bauweise" },
                { list: [
                  R`<b>Baugrenze</b>: darf nicht überschritten werden, innerhalb ist man frei`,
                  R`<b>Baulinie</b>: <i>an</i> ihr muss gebaut werden (einheitliche Fassade)`,
                  R`Offene Bauweise: mit Grenzabstand, max. 50 m Länge (E, D, H). Geschlossene Bauweise: ohne Grenzabstand`
                ]},
                { h: "Arten von Bebauungsplänen" },
                { table: { head: ["Art", "§", "Merkmal"], rows: [
                  ["Qualifiziert", "§ 30 (1) BauGB", "Art + Maß + überbaubare Fläche + örtliche Verkehrsflächen"],
                  ["Einfach", "§ 30 (3) BauGB", "nicht alles festgesetzt → Rest nach §§ 34/35"],
                  ["Sektoral", "§ 9 (2d) BauGB", "Wohnraumversorgung im Innenbereich, befristet"],
                  ["Vorhabenbezogen", "§ 12 BauGB", "für ein konkretes Vorhaben eines Investors"]
                ]}},
                { h: "Zulässigkeit von Vorhaben" },
                { p: R`§ 30 rechtskräftiger B-Plan · § 33 B-Plan in Aufstellung · § 34 Innenbereich („Einfügen“) · § 35 Außenbereich (privilegiert / sonstige / teilprivilegiert). <b>Veränderungssperre</b> (§ 14): nach dem Aufstellungsbeschluss, max. 2 Jahre + 1 Jahr Verlängerung.` },
                { h: "Musterfall aus der Übung" },
                { p: R`Schablone: WA, ED, max. III Vollgeschosse, GRZ 0,3, GFZ 0,7. Grundstück 630 m², Einfamilienhaus mit 200 m² Grundfläche und 2 Vollgeschossen.` },
                { table: { head: ["Prüfung", "zulässig", "geplant", "ok?"], rows: [
                  ["Art", "WA, Einzel-/Doppelhaus", "EFH", "✓"],
                  ["Vollgeschosse", "max. III", "2", "✓"],
                  ["Grundfläche", "630 × 0,3 = 189 m²", "200 m²", "✗"],
                  ["Geschossfläche", "630 × 0,7 = 441 m²", "400 m²", "✓"]
                ]}},
                { p: R`→ <b>Nicht zulässig</b>, weil die GRZ überschritten ist.` }
              ],
              tips: [
                { title: "Nutzungsschablone lesen", body: R`Oben links die Art (WA), oben rechts die Vollgeschosse (römisch), Mitte GRZ/GFZ (Dezimal, GFZ oft im Kreis), unten Bauweise (o, g, E, D, ED) und Dachform/-neigung.` },
                { title: "Umsetzung eines B-Plans", body: R`Vor den ersten Häusern kommen <b>Baulandumlegung</b> (Bodenordnung + Vermessung) und <b>Erschließung</b> (Straße, Kanal, Wasser), danach Versorgungsleitungen, Widmung, Straßennamen und Hausnummern.` }
              ],
              traps: [
                { title: "Falle: GFZ nur mit Erdgeschoss rechnen", body: R`Die GFZ zählt die Fläche <b>aller Vollgeschosse</b>. Bei 2 Geschossen mit 200 m² sind das 400 m².` },
                { title: "Falle: Bauflächen im B-Plan", body: R`Bauflächen (W, M, G, S) gehören in den FNP, Baugebiete (WR, WA, MI …) in den B-Plan.` }
              ],
              checks: [
                { type: "mc", q: "Grundstück 500 m², WA mit GRZ 0,4. Wie groß darf die Grundfläche des Hauses sein (ohne Nebenanlagen)?", options: ["160 m²", "200 m²", "300 m²", "600 m²"], answer: 1, explain: R`500 × 0,4 = <b>200 m²</b>. Mit Nebenanlagen wären bis zu 300 m² möglich (+50 %, Kappung bei 0,8).` },
                { type: "mc", q: "Grundstück 630 m², GRZ 0,3, GFZ 0,7. Geplant: 200 m² Grundfläche, 2 Vollgeschosse. Zulässig?", options: ["Ja", "Nein, weil die GFZ überschritten ist", "Nein, weil die GRZ überschritten ist (200 > 189 m²)", "Nein, zu viele Vollgeschosse"], answer: 2, explain: "Die GFZ (400 ≤ 441) passt, aber die Grundfläche 200 m² liegt über 189 m²." },
                { type: "mc", q: "Welche Festsetzungen braucht ein QUALIFIZIERTER B-Plan (§ 30 (1) BauGB)?", options: ["Nur Art der Nutzung", "Art, Maß, überbaubare Grundstücksfläche, örtliche Verkehrsflächen", "Nur Grünordnung", "Art und Dachform"], answer: 1, explain: "Fehlt etwas davon, ist es ein einfacher B-Plan nach § 30 (3)." },
                { type: "mc", q: "Welchen Rechtscharakter hat ein B-Plan nach Inkrafttreten?", options: ["Verwaltungsakt", "Satzung", "Gemeindebeschluss ohne Außenwirkung", "Bundesgesetz"], answer: 1, explain: "Satzung = Gesetz auf kommunaler Ebene, für jeden verbindlich." },
                { type: "mc", q: "Was gilt an einer BAULINIE?", options: ["Sie darf nur unterschritten werden", "An ihr muss gebaut werden", "Sie gilt nur für Garagen", "Sie ist nur eine Empfehlung"], answer: 1, explain: "Baulinie = es muss genau dort gebaut werden. Baugrenze = darf nicht überschritten werden." },
                { type: "mc", q: "Wie lange gilt eine Veränderungssperre (§ 14 BauGB) maximal ohne Sonderfall?", options: ["6 Monate", "1 Jahr", "2 Jahre (+1 Jahr Verlängerung möglich)", "10 Jahre"], answer: 2, explain: "Max. 2 Jahre, bei materiell schwierigem Verfahren um ein Jahr verlängerbar." }
              ],
              sources: [
                "GoodNotes: 1. Städtebauliche Planung.pdf – Kap. Bebauungsplan, Zulässigkeit von Vorhaben",
                "iCloud: 2_Übungsaufgaben_Lösung.pdf (Aufgaben 1–11, Nutzungsschablone + Herr Schmidt)",
                "E-Learning Kurs 33000: 6a/6b Bebauungsplan, Arbeitsblatt FNP–BPlan, 8. Zulässigkeit",
                "Deine Klausureinsicht-Notizen: B-Plan"
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-05-urberechnung",
              weak: true,
              title: "Urberechnung: Tagwerk → Grundbuch & Flächenberichtigung",
              minutes: 5,
              xp: 120,
              tldr: R`Die Flächen im Grundbuch stammen oft noch aus der Uraufnahme Anfang des 19. Jahrhunderts, gemessen in <b>Tagwerk</b> und mehrmals gerundet. Wie ein uralter Highscore, der durch drei Rundungen gegangen ist. Wird heute neu gerechnet oder die Grenze festgestellt, ergibt sich eine Differenz. Du prüfst mit $df_2 = 2{,}0\sqrt{F}$, ob das Grundbuch berichtigt werden muss.`,
              core: [
                { h: "Geschichte in 4 Sätzen" },
                { list: [
                  R`Uraufnahme in Bayern Anfang des 19. Jh. für eine <b>gerechte und einheitliche Grundbesteuerung</b>`,
                  R`Messtischaufnahme, Flurkarten 1:5000 (Ortslagen/Franken 1:2500), Kennzeichnung der Grenzen durch die Eigentümer, Abmarkung nur freiwillig`,
                  R`<b>Graphische Flächenberechnung</b> in Flächenberechnungsakten (Teilflächen je Intersektionsquadrat summiert)`,
                  R`<b>1872</b>: Umrechnung ins metrische System (Hektar, auf 3 Dezimalstellen gerundet)`
                ]},
                { math: R`1\ \text{Tagwerk} = 200 \times 200\ \text{Fuß} = 40.000\ \text{Quadratfuß} = 3.407{,}2709\ \text{m}^2` },
                { h: "Die Rundungskette (Übung Aufgabe 13)" },
                { table: { head: ["Schritt", "Flst. 1992", "Flst. 1993"], rows: [
                  ["Berechnet (Uraufnahme)", "0,0825 Tgw", "0,1923 Tgw"],
                  ["Abgeglichen (3 Stellen)", "0,083 Tgw", "0,192 Tgw"],
                  ["Kataster (2 Stellen)", "0,08 Tgw", "0,19 Tgw"],
                  ["Umrechnung 1872 (ha, 3 Stellen)", "0,027 ha", "0,065 ha"],
                  ["<b>Grundbuch</b>", "<b>270 m²</b>", "<b>650 m²</b>"]
                ]}},
                { h: "Muss berichtigt werden?" },
                { math: R`df_2 = 2{,}0 \cdot \sqrt{F}` },
                { p: R`$F$ = <b>neue</b> Fläche in m² (aus Grenzfeststellung bzw. Digitalisierung).` },
                { table: { head: ["", "Flst. 1992", "Flst. 1993"], rows: [
                  ["Kataster neu", "293 m²", "720 m²"],
                  ["Differenz zum Grundbuch", "23 m²", "70 m²"],
                  [R`Fehlergrenze $2\sqrt{F}$`, "34 m²", "54 m²"],
                  ["Ergebnis", "Diff ≤ Grenze → <b>keine</b> Berichtigung", "Diff > Grenze → <b>Berichtigung</b>"]
                ]}},
                { note: R`Liegt die Differenz innerhalb der Fehlergrenze, erklärt sie sich durch die alte Messung und die Rundungen. Liegt sie darüber, ist die Grundbuchfläche falsch und wird berichtigt.` },
                { p: R`Bei der <b>Grenzermittlung</b> sind die Flächenangaben aus der Urberechnung, alte Fußmaße aus Brouillons und Messverzeichnissen sowie örtliche Grenzeinrichtungen wichtige Ermittlungsgrundlagen.` }
              ],
              tips: [
                { title: "Rechen-Kochrezept", body: R`1) Tagwerk auf 3, dann auf 2 Stellen runden · 2) × 3.407,2709 → m² · 3) in ha auf 3 Stellen runden → Grundbuch-m² · 4) Differenz zur neuen Fläche · 5) $2\sqrt{F}$ vergleichen · 6) Antwortsatz schreiben.` },
                { title: "Flurkartenbezeichnungen", body: R`NW 84-65 → 1:5000 · NW 84-65.11 → 1:1000 · NW 84-65d → 1:2500 (Übung Aufgabe 12).` }
              ],
              traps: [
                { title: "Falle: Direkt mit 0,0825 Tgw rechnen", body: R`Ins Grundbuch kam der <b>zweimal gerundete</b> Katasterwert (0,08 Tgw), umgerechnet und auf 3 ha-Stellen gerundet. Mit 0,0825 × 3.407 = 281 m² liegst du falsch.` },
                { title: "Falle: Fehlergrenze mit der alten Fläche", body: R`In $2\sqrt{F}$ setzt du die <b>neue</b> Fläche ein (293 bzw. 720 m²), so wie in der Musterlösung.` }
              ],
              checks: [
                { type: "mc", q: "Wie viele m² hat 1 bayerisches Tagwerk?", options: ["1.000 m²", "2.500 m²", "3.407,27 m²", "10.000 m²"], answer: 2, explain: "1 Tagwerk = 40.000 Quadratfuß = 3.407,2709 m²." },
                { type: "order", q: "Bringe die Kette von der Uraufnahme bis zur Grundbuchfläche in die richtige Reihenfolge:", steps: ["Graphisch berechnete Fläche in Tagwerk (z. B. 0,1318)", "Abgleichen auf 3 Stellen (0,132)", "Katasterwert auf 2 Stellen (0,13 Tgw)", "1872: Umrechnung in Hektar auf 3 Stellen (0,044 ha)", "Grundbuchfläche in m² (440 m²)"], explain: "Berechnet → abgeglichen → Kataster → Umrechnung → Grundbuch." },
                { type: "mc", q: R`Das Grundbuch sagt 440 m², nach einer Grenzfeststellung sind es 489 m². Muss berichtigt werden? ($df_2 = 2\sqrt{F}$)`, options: ["Nein, 49 m² liegen unter 44 m²", "Ja, 49 m² > 44 m² Fehlergrenze", "Nein, Grundbuchflächen werden nie berichtigt", "Ja, jede Differenz wird berichtigt"], answer: 1, explain: R`$2\sqrt{489} = 44{,}2$ m², Differenz 49 m² liegt darüber → Berichtigung.` },
                { type: "mc", q: R`Gleiches Grundbuch (440 m²), neue Fläche aber 470 m². Berichtigung?`, options: ["Ja", "Nein, 30 m² < 43 m²", "Nur wenn der Eigentümer zustimmt", "Nur bei Wald"], answer: 1, explain: R`$2\sqrt{470} = 43{,}4$ m², Differenz 30 m² liegt innerhalb → keine Berichtigung.` },
                { type: "mc", q: "Warum wurde in Bayern Anfang des 19. Jh. eine Uraufnahme durchgeführt?", options: ["Für den Postkutschenverkehr", "Für eine gerechte und einheitliche Grundbesteuerung", "Für die Flurbereinigung", "Für GNSS-Referenzstationen"], answer: 1, explain: "Ziel war die gerechte, einheitliche Grundsteuer (LIKA-Übung Aufgabe 3)." }
              ],
              sources: [
                "GoodNotes: 2. Landmanagement.pdf – Kap. 6 Geschichte des Katasters (Graphische Flächenberechnung, Tagwerk)",
                "iCloud: 09_Übungsaufgaben_neu.pdf + 09_Lösung.pdf (Aufgaben 12, 13)",
                "E-Learning Kurs 33000: 6. Geschichte des Katasters in Bayern, Übungsaufgaben LIKA + Lösung",
                "Deine Klausureinsicht-Notizen: Urberechnung (Diff. Fläche GB & Grenzfeststellung)"
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-06-katastervermessung",
              weak: true,
              title: "Katastervermessung: Wer, Akten, Abmarkung & freie Stationierung",
              minutes: 6,
              xp: 130,
              tldr: R`Katastervermessung ist dein künftiges Tagesgeschäft im Feld. Die Klausur will vier Dinge: <b>Wer</b> darf vermessen (Spielerlizenz), welche <b>Akten</b> brauchst du vorher (Taktikbesprechung), wann wird <b>abgemarkt</b> (Tor zählt oder nicht) und welche Regeln gelten für die <b>freie Stationierung</b> (VAR-Protokoll).`,
              core: [
                { h: "Wer darf in Bayern Katastervermessungen durchführen?" },
                { list: [
                  R`<b>ADBV</b> – 51 Ämter für Digitalisierung, Breitband und Vermessung mit 22 Außenstellen (Regelfall)`,
                  R`<b>Ämter für Ländliche Entwicklung</b> (Art. 12 (6) VermKatG)`,
                  R`<b>Städtisches Vermessungsamt München</b> (Art. 12 (7) VermKatG)`,
                  R`<b>Sachverständige für Vermessung im Bauwesen</b> – Stichwort <b>GÜVO</b> (Gebäudeeinmessung, Art. 8 (9) VermKatG)`
                ]},
                { note: R`<b>Öffentlich bestellte Vermessungsingenieure (ÖbVI) gibt es in Bayern nicht!</b> Grundsatz der Subsidiarität: Die Verwaltung macht nur die hoheitlichen Aufgaben.` },
                { p: R`Aufbau der Vermessungsverwaltung: Bayer. Staatsministerium der Finanzen und für Heimat (Abt. VII) → Landesamt für Digitalisierung, Breitband und Vermessung (<b>LDBV</b>) → 51 <b>ADBV</b> (Führung des Liegenschaftskatasters, Fortführungsmessungen).` },
                { h: "Arten der Katastervermessung" },
                { list: [
                  R`<b>Zerlegung</b> („Teilung“): neue Grenze nach Wunsch der Beteiligten (§ 19 BauGB beachten)`,
                  R`<b>Grenzfeststellung</b>: Grenzwiederherstellung oder Grenzermittlung`,
                  R`<b>Katasterneuvermessung</b> (Art. 8 (7) VermKatG): alle Grenzen eines Gebiets, 120 €/Flurstück, mindestens 3.000 €`,
                  R`<b>Gebäudeeinmessung</b>: Pflicht ab 13 m² (geschlossene Gebäude), 5 m² (Anbau), 35 m² (sonstige)`
                ]},
                { h: "Grenzwiederherstellung vs. Grenzermittlung" },
                { table: { head: ["", "Grenzwiederherstellung", "Grenzermittlung"], rows: [
                  ["Kataster", "technisch (±3 cm, kontrolliert) <b>und</b> rechtlich (anerkannt) einwandfrei", "technisch und/oder rechtlich <b>nicht</b> einwandfrei (graphisch, widersprüchlich)"],
                  ["Grundlage", "Zahlennachweis (Risse, Koordinaten), Einpassung ins Kleinpunktfeld", "Kartenmaße, Brouillons, Urberechnung, örtliche Grenzeinrichtungen, Auffassung der Beteiligten"],
                  ["Abmarkung", "auch <b>gegen den Willen</b> der Beteiligten", "nur mit <b>Grenzfeststellungsvertrag</b> (Einigung)"],
                  ["Keine Einigung?", "–", "keine Abmarkung, „strittige Grenze“, Zivilrechtsweg"]
                ]}},
                { p: R`Der Grenzfeststellungsvertrag ist <b>formfrei</b> und privatrechtlich und wird im <b>Abmarkungsprotokoll</b> beurkundet. Die Abmarkung vollzieht die Einigung öffentlich-rechtlich (Abmarkungsgesetz AbmG). Steine setzen die <b>Feldgeschworenen</b>.` },
                { h: "Akten: Messungsvorbereitung" },
                { list: [
                  "Frühere Risse (Fortführungsrisse)",
                  "Katasterfestpunkt-Übersicht",
                  "Kartenauszüge",
                  "Koordinatenbereitstellung für das Messungsobjekt",
                  "ggf. alte Karten (Brouillons, Deckeldrucke, Messverzeichnisse) und alte Abmarkungsprotokolle (Grenzermittlung)",
                  "Vordruck des Abmarkungsprotokolls"
                ]},
                { p: R`<b>Geladen werden</b>: Antragsteller, Eigentümer, angrenzende Eigentümer, Feldgeschworene, evtl. Erwerber. <b>Dokumentiert</b> wird im <b>Riss</b> (Passpunkte, Maße, Nutzungs- und Abmarkungsarten, Grenzeinrichtungen) und im <b>Rechenprotokoll</b>.` },
                { h: "Freie Stationierung – die Regeln" },
                { list: [
                  R`Überbestimmte <b>2D-Helmert-Transformation</b> lokal → Landessystem, Prinzip der Nachbarschaft`,
                  R`<b>Mind. 5 identische Punkte</b>, gleichmäßig um das Messgebiet verteilt, keine Extrapolation, keine Cluster`,
                  R`Lineare Abweichung der identischen Punkte <b>≤ 4 cm</b>, Maßstabsabweichung <b>≤ 10 cm/hm</b>`,
                  R`Kontrolle: Doppelaufnahme oder vollständige Spannmaßkontrolle nach der Abmarkung, Abweichung <b>≤ 3 cm</b>, dazu eine Kontrollrichtung`
                ]},
                { p: R`<b>GNSS</b> im Kataster: Kontrollpunkte (max. 3 cm), zwei Messungen im Abstand von <b>≥ 2 h</b> (neue Satellitenkonstellation), SAPOS.` }
              ],
              tips: [
                { title: "Antwort-Muster „Wer darf?“", body: R`Immer 3 Benennungen + Paragraph: ALE (Art. 12 (6)), Städt. Vermessungsamt München (Art. 12 (7)), Sachverständige GÜVO (Art. 8 (9) VermKatG). Und den Satz „keine ÖbVI in Bayern“ dazuschreiben.` },
                { title: "Für den Kaufvertrag", body: R`Wer eine Teilfläche kaufen will, beantragt eine <b>Zerlegung</b>, nicht Grenzermittlung oder Verschmelzung (LIKA-Übung 1d).` }
              ],
              traps: [
                { title: "Falle: ÖbVI nennen", body: R`In Bayern gibt es keine ÖbVI. Wer das als „Wer darf?“-Antwort schreibt, verliert den Punkt.` },
                { title: "Falle: Bei Grenzermittlung ohne Einigung abmarken", body: R`Ohne Grenzfeststellungsvertrag wird <b>nicht</b> abgemarkt. Bereits gesetzte Steine werden wieder entfernt.` },
                { title: "Falle: 3 identische Punkte reichen", body: R`Laut Vorlesung sind es <b>mindestens 5</b>, gleichmäßig verteilt.` }
              ],
              checks: [
                { type: "mc", q: "Wer darf in Bayern NICHT Katastervermessungen durchführen?", options: ["Ämter für Ländliche Entwicklung", "Städtisches Vermessungsamt München", "Öffentlich bestellte Vermessungsingenieure (ÖbVI)", "ADBV"], answer: 2, explain: "ÖbVI gibt es in Bayern nicht. Erlaubt sind ADBV, ALE, Vermessungsamt München und (für Gebäude) Sachverständige nach GÜVO." },
                { type: "mc", q: "Bei einer Grenzermittlung einigen sich die Nachbarn nicht. Was passiert?", options: ["Der Vermessungsbeamte entscheidet und lässt abmarken", "Keine Abmarkung, die Grenze wird „strittig“, Verweis auf den Zivilrechtsweg", "Es wird trotzdem nach Koordinaten abgemarkt", "Das ALE entscheidet"], answer: 1, explain: "Ohne Grenzfeststellungsvertrag gibt es keine Abmarkung. Bereits gesetzte Grenzzeichen werden ggf. entfernt." },
                { type: "mc", q: "Wann darf auch GEGEN den Willen der Beteiligten abgemarkt werden?", options: ["Bei der Grenzermittlung", "Bei der Grenzwiederherstellung (Kataster technisch und rechtlich einwandfrei)", "Nie", "Bei der Gebäudeeinmessung"], answer: 1, explain: "Ist die Grenze im Kataster einwandfrei nachgewiesen, kann sie nicht bestritten werden." },
                { type: "mc", q: "Wie viele identische Punkte braucht eine freie Stationierung im Kataster mindestens?", options: ["2", "3", "5", "10"], answer: 2, explain: "Mind. 5 identische Punkte, gleichmäßig verteilt, keine Extrapolation, keine Cluster." },
                { type: "mc", q: "Welche Unterlage gehört NICHT zur Messungsvorbereitung?", options: ["Frühere Risse", "Katasterfestpunkt-Übersicht", "Vordruck des Abmarkungsprotokolls", "Der Bebauungsplan in Aufstellung"], answer: 3, explain: "Die Messungsunterlagen sind Risse, KFP-Übersicht, Kartenauszüge, Koordinaten, alte Karten/Protokolle und der Protokollvordruck." },
                { type: "bug", q: "Ein Protokoll zur freien Stationierung, aber eine Regel ist verletzt. Welche?", lines: ["7 identische Punkte rund um das Messgebiet", "Lineare Abweichungen max. 2,8 cm", "Maßstabsabweichung 6 cm/hm", "Neupunkte liegen 300 m außerhalb der Passpunkte", "Kontrolle durch Spannmaße, Abweichung 1,5 cm"], answer: 3, explain: "Keine Extrapolation! Die Neupunkte müssen innerhalb des von den identischen Punkten umschlossenen Gebiets liegen." },
                { type: "mc", q: "Ab welcher Größe besteht für ein geschlossenes Gebäude Einmessungspflicht?", options: ["5 m²", "13 m²", "35 m²", "50 m²"], answer: 1, explain: "13 m² für geschlossene Gebäude, 5 m² für Anbauten, 35 m² für sonstige Gebäude." }
              ],
              sources: [
                "GoodNotes: 2. Landmanagement.pdf – Kap. 4 Aufbau der Vermessungsverwaltung, Kap. 8 Katastervermessungen",
                "iCloud: 09_Lösung.pdf (LIKA-Übung Aufgaben 1, 2, 7)",
                "GoodNotes: Mitschrift.pdf (Lernfragen VermKatG)",
                "E-Learning Kurs 33000: 4. Aufbau der Vermessungsverwaltung, 8. Katastervermessungen",
                "Deine Klausureinsicht-Notizen: Katastervermessung (!) → Akten, Abmarkung, Wer?, (freie) Stationierung"
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "future",
      label: "Zukünftige Semester",
      modules: []
    }
  ]
};
