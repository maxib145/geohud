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
  version: "2026-11-26.1",

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
        { id: "lm1", title: "Landmanagement I", code: "6018008", icon: "▤", missions: [] }
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
