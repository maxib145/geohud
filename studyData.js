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
  version: "2026-11-26.4",

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
        {
          id: "ma1",
          title: "Mathematik I",
          code: "6018001",
          prof: "Trigonometrie: Dr. R. Küstner · Analysis",
          icon: "∫",
          missions: [
            /* ===================== TRIGONOMETRIE ===================== */
            {
              id: "ma1-t1-sinussatz",
              exam: "Trigo Aufgabe 1 · 8–9 P.",
              title: "Ebenes Dreieck SSW: Sinussatz & Eindeutigkeit",
              minutes: 5, xp: 120,
              tldr: R`Aufgabe 1 kommt jedes Mal: zwei Seiten und ein Winkel, der <b>nicht</b> zwischen ihnen liegt (SSW). Wie beim Elfmeter gibt es einen sauberen Ablauf: Prüfen, ob die Lösung eindeutig ist, dann Sinussatz für den fehlenden Winkel, dann Winkelsumme, dann nochmal Sinussatz für die letzte Seite. 2019: b = 8, c = 6, β = 40°. Letztes Mal: b = 5, c = 4, β = 36°.`,
              core: [
                { h: "Der Ablauf (4 Zeilen)" },
                { math: R`\sin\gamma = \frac{c \cdot \sin\beta}{b} \quad\Rightarrow\quad \alpha = 180^\circ - \beta - \gamma \quad\Rightarrow\quad a = \frac{b \cdot \sin\alpha}{\sin\beta}` },
                { h: "Eindeutig oder nicht? (immer hinschreiben!)" },
                { table: { head: ["Fall", "Bedeutung", "Lösungen"], rows: [
                  [R`$b \ge c$`, "β liegt der größeren bekannten Seite gegenüber", "<b>genau eine</b> (γ spitz)"],
                  [R`$b < c$, $\sin\gamma < 1$`, "β liegt der kleineren Seite gegenüber", "<b>zwei</b>: γ₁ und γ₂ = 180° − γ₁"],
                  [R`$b < c$, $\sin\gamma = 1$`, "", "eine (γ = 90°)"],
                  [R`$\sin\gamma > 1$`, "", "<b>keine</b>"]
                ]}},
                { h: "Musterlösung Klausur (b = 5, c = 4, β = 36°)" },
                { table: { head: ["Schritt", "Rechnung", "Ergebnis"], rows: [
                  ["Fall", "b = 5 > c = 4", "eindeutig"],
                  ["γ", R`$\sin\gamma = 4\cdot\sin 36^\circ/5 = 0{,}4702$`, "γ = 28,05°"],
                  ["α", "180° − 36° − 28,05°", "α = 115,95°"],
                  ["a", R`$5\cdot\sin 115{,}95^\circ/\sin 36^\circ$`, "a = 7,65"]
                ]}},
                { p: R`<b>Version 2019</b> (b = 8, c = 6, β = 40°): γ = 28,82°, α = 111,18°, a = 11,61 m.` },
                { note: R`Zwischenergebnisse auf <b>4</b>, Endergebnisse auf <b>2</b> Nachkommastellen runden (steht im Deckblatt). Taschenrechner im <b>DEG</b>-Modus!` }
              ],
              tips: [
                { title: "Zweideutiger Fall durchgerechnet", body: R`b = 4, c = 6, β = 30°: sin γ = 0,75 → γ₁ = 48,59° (α = 101,41°, a = 7,84) <b>und</b> γ₂ = 131,41° (α = 18,59°, a = 2,55). Beide Dreiecke angeben!` },
                { title: "Alternative für a: Kosinussatz", body: R`$b^2 = a^2 + c^2 - 2ac\cos\beta$ ist eine quadratische Gleichung in a und liefert die Mehrdeutigkeit automatisch, ist aber mehr Rechenarbeit.` }
              ],
              traps: [
                { title: "Falle: Begründung vergessen", body: R`Der Satz „b > c, also liegt β der größeren Seite gegenüber → eindeutig“ bringt Punkte. Ohne ihn fehlt ein Teil der Lösung.` },
                { title: "Falle: RAD-Modus", body: R`sin(36) im Bogenmaß ergibt −0,99. Wer negative Sinuswerte bei Dreieckswinkeln bekommt, hat den falschen Modus.` }
              ],
              checks: [
                { type: "mc", q: R`Version 2019: b = 8 m, c = 6 m, β = 40°. Wie groß ist γ?`, options: ["28,82°", "40,00°", "59,00°", "151,18°"], answer: 0, explain: R`$\sin\gamma = 6\cdot\sin 40^\circ/8 = 0{,}4821$ → γ = 28,82°. Eindeutig, weil b > c.` },
                { type: "mc", q: R`Weiter mit b = 8, β = 40°, γ = 28,82°: Wie lang ist a?`, options: ["6,00 m", "11,61 m", "9,47 m", "7,65 m"], answer: 1, explain: R`α = 111,18°, a = 8 · sin 111,18° / sin 40° = 11,61 m.` },
                { type: "mc", q: R`b = 4, c = 6, β = 30°. Wie viele Dreiecke gibt es?`, options: ["keins", "genau eins", "zwei", "unendlich viele"], answer: 2, explain: R`b < c und sin γ = 0,75 < 1 → zwei Lösungen: γ₁ = 48,59° und γ₂ = 131,41°.` },
                { type: "mc", q: R`b = 3, c = 7, β = 40°. Wie viele Dreiecke gibt es?`, options: ["keins (sin γ > 1)", "genau eins", "zwei", "unendlich viele"], answer: 0, explain: R`sin γ = 7 · sin 40° / 3 = 1,50 > 1 → kein Dreieck.` },
                { type: "order", q: "Bringe den Lösungsweg in die richtige Reihenfolge:", steps: ["Fallunterscheidung: b ≥ c → eindeutig", "Sinussatz: sin γ = c · sin β / b", "γ mit sin⁻¹ bestimmen", "α = 180° − β − γ", "a = b · sin α / sin β"], explain: "Fall → γ → α → a." }
              ],
              sources: ["Foto: Trigonometrie-Klausur 06.02.2019 (A1) und letzte Klausur (A1)", "Lösungen_Trigonometrie_Klausur2.pdf (A1)", "GoodNotes: 1. Semester/Mathe/Trigonometrie/Trigonometrie_Skript-Notizen.pdf – Kap. 1"]
            },
            {
              id: "ma1-t2-gleichungen",
              exam: "Trigo Aufgabe 2 · 4–6 P.",
              title: "Trigonometrische Gleichungen in (0°, 180°)",
              minutes: 4, xp: 100,
              tldr: R`Schnelle Punkte: sin(α) = 2/3, tan(α) = −3/4, cot(α) = 4/5, immer mit 0° < α < 180°. Der Trick ist zu wissen, wie viele Lösungen es im Bereich gibt. <b>Sinus ist der einzige mit zwei Lösungen.</b> Tangens, Kotangens und Kosinus sind dort eindeutig.`,
              core: [
                { table: { head: ["Gleichung", "Lösungen in (0°,180°)", "Formel"], rows: [
                  [R`$\sin\alpha = k$, $0 \lt k \lt 1$`, "<b>zwei</b>", R`$\alpha_1 = \sin^{-1}k$, $\alpha_2 = 180^\circ - \alpha_1$`],
                  [R`$\cos\alpha = k$`, "eine", R`$\alpha = \cos^{-1}k$ (direkt)`],
                  [R`$\tan\alpha = k > 0$`, "eine", R`$\alpha = \tan^{-1}k$`],
                  [R`$\tan\alpha = k < 0$`, "eine (zwischen 90° und 180°)", R`$\alpha = 180^\circ + \tan^{-1}k$`],
                  [R`$\cot\alpha = k$`, "eine", R`$\alpha = 90^\circ - \tan^{-1}k$`]
                ]}},
                { h: "Musterlösung Klausur" },
                { table: { head: ["", "Rechnung", "Lösung"], rows: [
                  ["(a) sin α = 2/3", "sin⁻¹(2/3) = 41,81°", "α₁ = 41,81°, α₂ = 138,19°"],
                  ["(b) tan α = −3/4", "180° − tan⁻¹(3/4) = 180° − 36,87°", "α = 143,13°"],
                  ["(c) cot α = 4/5", "90° − tan⁻¹(4/5) = 90° − 38,66°", "α = 51,34°"]
                ]}},
                { note: R`Warum $\cot\alpha = k \Rightarrow \alpha = 90^\circ - \tan^{-1}k$? Weil $\cot\alpha = \tan(90^\circ - \alpha)$. Das funktioniert auch für negative k, z. B. cot α = −4/5 → α = 90° + 38,66° = 128,66°.` }
              ],
              tips: [ { title: "Begründung für die Anzahl", body: R`Schreib einen Satz dazu: „sin ist auf (0°,180°) nicht monoton, daher zwei Lösungen“ bzw. „tan/cot ist auf (0°,180°) streng monoton, daher eine Lösung“. Das bringt in der Musterlösung die Punkte.` } ],
              traps: [
                { title: "Falle: Nur 41,81° angeben", body: R`Bei sin(α) = 2/3 fehlt dann die zweite Lösung 138,19°, und damit die Hälfte der Punkte.` },
                { title: "Falle: tan⁻¹(−3/4) = −36,87° als Lösung", body: R`−36,87° liegt nicht im Bereich. Die richtige Lösung ist +180° → 143,13°.` }
              ],
              checks: [
                { type: "mc", q: R`Alle Lösungen von $\sin\alpha = 0{,}3$ mit 0° < α < 180°?`, options: ["17,46°", "17,46° und 162,54°", "17,46° und 197,46°", "72,54°"], answer: 1, explain: "α₂ = 180° − 17,46° = 162,54°." },
                { type: "mc", q: R`Lösung von $\cot\alpha = -4/5$ mit 0° < α < 180°?`, options: ["−38,66°", "51,34°", "128,66°", "141,34°"], answer: 2, explain: "α = 90° − tan⁻¹(−0,8) = 90° + 38,66° = 128,66°." },
                { type: "mc", q: R`Wie viele Lösungen hat $\cos\alpha = -1/2$ in (0°, 180°)?`, options: ["keine", "eine: 120°", "zwei: 120° und 240°", "zwei: 60° und 120°"], answer: 1, explain: "Kosinus ist auf (0°,180°) streng fallend → genau eine Lösung, α = 120°." },
                { type: "mc", q: R`$\tan\alpha = -3/4$: Welche Lösung?`, options: ["−36,87°", "36,87°", "143,13°", "126,87°"], answer: 2, explain: "Negativer Tangens nur zwischen 90° und 180°: 180° − 36,87° = 143,13°." }
              ],
              sources: ["Foto: Trigo-Klausuren (A2)", "Lösungen_Trigonometrie_Klausur2.pdf (A2)", "Trigonometrie-Skript: Umkehrfunktionen von sin, cos, tan, cot"]
            },
            {
              id: "ma1-t3-kugelkoordinaten",
              exam: "Trigo Aufgabe 3 · 7 P.",
              title: "Kartesisch → Kugelkoordinaten r, λ, φ",
              minutes: 4, xp: 100,
              tldr: R`Aus x, y, z werden Radius r, Länge λ und Breite φ, genau wie GPS-Koordinaten. r und φ sind Formel einsetzen. <b>Die Punkte liegen bei λ</b>: Der Taschenrechner kennt nur tan⁻¹ zwischen −90° und 90°, also musst du je nach Quadrant ±180° rechnen.`,
              core: [
                { math: R`r = \sqrt{x^2+y^2+z^2} \qquad s = \sqrt{x^2+y^2} \qquad \varphi = \sin^{-1}\!\left(\frac{z}{r}\right)` },
                { table: { head: ["Fall", "λ"], rows: [
                  ["x > 0", R`$\tan^{-1}(y/x)$`],
                  ["x = 0", R`$\mathrm{sgn}(y)\cdot 90^\circ$`],
                  ["x < 0, y ≠ 0", R`$\tan^{-1}(y/x) + \mathrm{sgn}(y)\cdot 180^\circ$`],
                  ["x < 0, y = 0", "180°"]
                ]}},
                { h: "Musterlösung P(−3 | 2 | −6)" },
                { list: [
                  R`r = √(9 + 4 + 36) = √49 = <b>7</b>`,
                  R`x < 0, y > 0 → λ = tan⁻¹(2/−3) + 180° = −33,69° + 180° = <b>146,31°</b>`,
                  R`φ = sin⁻¹(−6/7) = <b>−59,00°</b>`
                ]},
                { p: R`<b>Version 2019</b> P(16 | 12 | −15): r = 25, λ = 36,87°, φ = −36,87°.` }
              ],
              tips: [ { title: "Plausibilitäts-Check", body: R`x < 0, y > 0 heißt 2. Quadrant → λ muss zwischen 90° und 180° liegen. x < 0, y < 0 → zwischen −180° und −90°. Kurz eine Skizze machen.` } ],
              traps: [ { title: "Falle: λ = −33,69° hinschreiben", body: R`Das ist der Taschenrechnerwert, aber der Punkt liegt im 2. Quadranten. Es fehlt +180°.` } ],
              checks: [
                { type: "mc", q: "P(4 | −3 | 12): Wie groß sind r, λ, φ?", options: ["r = 13, λ = −36,87°, φ = 67,38°", "r = 13, λ = 143,13°, φ = 67,38°", "r = 5, λ = −36,87°, φ = 22,62°", "r = 13, λ = 36,87°, φ = −67,38°"], answer: 0, explain: "x > 0 → λ = tan⁻¹(−3/4) = −36,87° ohne Korrektur. r = 13, φ = sin⁻¹(12/13) = 67,38°." },
                { type: "mc", q: "P(−4 | −4 | 2): Wie groß ist λ?", options: ["45°", "−45°", "135°", "−135°"], answer: 3, explain: "x < 0, y < 0 → tan⁻¹(1) − 180° = 45° − 180° = −135°." },
                { type: "mc", q: "P(−4 | −4 | 2): Wie groß ist φ? (r = 6)", options: ["19,47°", "−19,47°", "70,53°", "30,00°"], answer: 0, explain: "φ = sin⁻¹(2/6) = 19,47°." },
                { type: "mc", q: "P(−6 | 8 | 0): Wie groß ist λ?", options: ["−53,13°", "53,13°", "126,87°", "−126,87°"], answer: 2, explain: "tan⁻¹(8/−6) = −53,13°, + 180° (y > 0) = 126,87°." }
              ],
              sources: ["Foto: Trigo-Klausuren (A3)", "Lösungen_Trigonometrie_Klausur2.pdf (A3)", "Trigonometrie-Skript Kap. 2.2.2, Formeln (2.18)–(2.20)"]
            },
            {
              id: "ma1-t4-wahrfalsch",
              exam: "Trigo Aufgabe 4 · 3–4 P.",
              title: "Wahr/Falsch: Großkreise, Orthodromen & Eulersche Dreiecke",
              minutes: 5, xp: 110,
              tldr: R`Die Ankreuzaufgabe ist gefährlich, weil sie wie geschenkte Punkte aussieht. 2019 gab es hier nur 1 von 3 Punkten. Du brauchst nur zwei Dinge: den <b>Äquator als Sonderfall</b> (Breitenkreis UND Großkreis) und die <b>Eigenschaften E1–E8</b> Eulerscher Dreiecke.`,
              core: [
                { h: "Kreise auf der Kugel" },
                { list: [
                  R`<b>Großkreis</b>: Mittelpunkt = Kugelmittelpunkt (Äquator, alle Meridiane mit Gegenmeridian)`,
                  R`<b>Kleinkreis</b>: alle anderen, z. B. jeder Breitenkreis <b>außer dem Äquator</b> (Radius R·cos φ)`,
                  R`<b>Orthodrome</b> = kürzester Großkreisbogen zwischen A und B (kürzer als ein halber Großkreis)`,
                  R`Orthodromen entlang eines Breitenkreises gibt es <b>nur auf dem Äquator</b>`
                ]},
                { h: "Eulersche Dreiecke: E1–E8 (Skript)" },
                { table: { head: ["", "Bedingung"], rows: [
                  ["E1", "0° < a, b, c < 180°"],
                  ["E2", "0° < α, β, γ < 180°"],
                  ["E3", "0° < a + b + c < 360°"],
                  ["E4", "<b>180° < α + β + γ < 540°</b>"],
                  ["E5", "a < b + c, b < c + a, c < a + b"],
                  ["E6", "<b>α + β < γ + 180°</b>, β + γ < α + 180°, γ + α < β + 180°"],
                  ["E7", "größte Seite gegenüber größtem Winkel"],
                  ["E8", "a + b ⋚ 180° ⇔ α + β ⋚ 180° (gleiche Beziehung)"]
                ]}},
                { p: R`<b>Rechtwinklig</b> (γ = 90°): $\cos c = \cos a \cos b$ (sphärischer Pythagoras). a und α sind gleichartig, b und β ebenso. Ein Eulersches Dreieck kann <b>bis zu drei rechte Winkel</b> haben (Kugeloktant, „halbes Zweieck“).` },
                { h: "Musterlösung letzte Klausur" },
                { table: { head: ["Aussage", "Antwort", "Warum"], rows: [
                  ["Ebenes rechtwinkliges Dreieck a=10, b=8, c=6", "wahr", "6² + 8² = 100 = 10²"],
                  ["Orthodromen verlaufen nie entlang von Breitenkreisen", "falsch", "Äquator"],
                  ["Eulersches Dreieck α=50°, β=90°, γ=130°", "wahr", "Summe 270° ✓, alle E6 ✓"],
                  ["Eulersches Dreieck b=45°, c=135°, γ=90°", "falsch", "cos a = cos 135°/cos 45° = −1 → a = 180°, verletzt E1"]
                ]}},
                { table: { head: ["Aussage 2019", "Antwort", "Warum"], rows: [
                  ["Alle Breitenkreise sind Kleinkreise", "<b>falsch</b>", "Der Äquator ist ein Großkreis"],
                  ["Alle Orthodromen sind Bogenstücke von Großkreisen", "<b>wahr</b>", "Definition"],
                  ["Alle Eulerschen Dreiecke haben höchstens einen rechten Winkel", "<b>falsch</b>", "Oktant: drei rechte Winkel"]
                ]}}
              ],
              tips: [ { title: "Prüf-Reihenfolge bei Winkeln", body: R`1) Summe zwischen 180° und 540° (E4)? 2) Alle drei E6-Ungleichungen? Bei rechtwinkligen Dreiecken zusätzlich mit $\cos c = \cos a\cos b$ prüfen, ob ein Wert außerhalb (0°, 180°) herauskommt.` } ],
              traps: [
                { title: "Falle: „Alle“ und „niemals“", body: R`Solche Wörter sind fast immer ein Hinweis auf einen Sonderfall (Äquator, Oktant). Ein einziges Gegenbeispiel macht die Aussage falsch.` },
                { title: "Falle: Winkelsumme 180° wie in der Ebene", body: R`Auf der Kugel ist die Winkelsumme <b>immer größer</b> als 180°.` }
              ],
              checks: [
                { type: "mc", q: "„Alle Breitenkreise sind Kleinkreise.“", options: ["wahr", "falsch"], answer: 1, explain: "Der Äquator ist ein Breitenkreis und zugleich ein Großkreis." },
                { type: "mc", q: "„Alle Orthodromen sind Bogenstücke von Großkreisen.“", options: ["wahr", "falsch"], answer: 0, explain: "Die Orthodrome ist per Definition der kürzere Großkreisbogen." },
                { type: "mc", q: "„Alle Eulerschen Dreiecke haben höchstens einen rechten Winkel.“", options: ["wahr", "falsch"], answer: 1, explain: "Der Kugeloktant (z. B. Nordpol, 0°/0°, 0°/90°E) hat drei rechte Winkel." },
                { type: "mc", q: "„Es gibt Eulersche Dreiecke mit α = 50°, β = 90°, γ = 130°.“", options: ["wahr", "falsch"], answer: 0, explain: "Summe 270° liegt in (180°, 540°), und 140° < 310°, 220° < 230°, 180° < 270° erfüllen E6." },
                { type: "mc", q: "„Es gibt Eulersche Dreiecke mit α = 20°, β = 30°, γ = 40°.“", options: ["wahr", "falsch"], answer: 1, explain: "Winkelsumme 90° < 180° verletzt E4." },
                { type: "mc", q: "„Es gibt Eulersche Dreiecke mit α = 30°, β = 40°, γ = 170°.“", options: ["wahr", "falsch"], answer: 1, explain: "Summe 240° passt, aber E6: β + γ = 210° ist nicht < α + 180° = 210° → kein Dreieck." },
                { type: "mc", q: "„Es gibt Eulersche Dreiecke mit b = 45°, c = 135°, γ = 90°.“", options: ["wahr", "falsch"], answer: 1, explain: "cos a = cos 135°/cos 45° = −1 → a = 180°, verletzt E1." }
              ],
              sources: ["Foto: Trigo-Klausuren (A4), Klausur 2019 mit Korrektur (1/3 P.)", "Lösungen_Trigonometrie_Klausur2.pdf (A4)", "Trigonometrie-Skript Kap. 3.1 (E1–E8), 3.2 (rechtwinklige Eulersche Dreiecke)"]
            },
            {
              id: "ma1-t5-orthodrome",
              exam: "Trigo Aufgabe 5 · 9 P.",
              title: "Orthodrome, Kurswinkel & Strecke entlang eines Breitenkreises",
              minutes: 6, xp: 130,
              tldr: R`Die 9-Punkte-Aufgabe mit Flugzeug und echten Städten (Athen → Beirut, Quito → Frankfurt). Du rechnest im <b>Poldreieck</b> Nordpol–A–B: Länge der kürzesten Strecke mit dem Seitenkosinussatz, Kurswinkel mit dem Kotangenssatz, und für Strecken entlang eines Breitenkreises einfach $R\cos\varphi$ als Radius.`,
              core: [
                { h: "Kürzeste Strecke (Orthodrome)" },
                { math: R`\cos\mu = \sin\varphi_A\sin\varphi_B + \cos\varphi_A\cos\varphi_B\cos\Delta\lambda \qquad AB = \frac{\mu}{180^\circ}\cdot\pi\cdot R` },
                { h: "Kurswinkel beim Start in A" },
                { math: R`\tan\alpha = \frac{\sin\Delta\lambda}{\cos\varphi_A\tan\varphi_B - \sin\varphi_A\cos\Delta\lambda}` },
                { p: R`Kurswinkel = Richtung, gemessen von Norden im Uhrzeigersinn. Ist der Nenner negativ, liegt α zwischen 90° und 180° (Musterlösung: α = 90° − tan⁻¹(Nenner/Zähler)).` },
                { h: "Entlang von Meridian und Breitenkreis" },
                { math: R`\text{Meridian: } s = \frac{\Delta\varphi}{180^\circ}\pi R \qquad \text{Breitenkreis: } s = \frac{\Delta\lambda}{180^\circ}\pi R\cos\varphi` },
                { h: "Musterlösung letzte Klausur: Athen → Beirut" },
                { table: { head: ["", "Rechnung", "Ergebnis"], rows: [
                  ["Δλ", "35,49° − 23,94°", "11,55°"],
                  ["cos μ", "sin 37,94° sin 33,82° + cos 37,94° cos 33,82° cos 11,55°", "0,9841 → μ = 10,22°"],
                  ["Strecke", "10,22/180 · π · 6378", "<b>1137,15 km</b>"],
                  ["Kurswinkel", "Nenner = cos 37,94° tan 33,82° − sin 37,94° cos 11,55° < 0", "<b>110,29°</b>"]
                ]}},
                { h: "Version 2019: Quito → Frankfurt (R = 6378 km)" },
                { table: { head: ["Teil", "Rechnung", "Ergebnis"], rows: [
                  ["a i) Quito (0°) nach Norden bis 50°", "50/180 · π · 6378", "<b>5565,85 km</b>"],
                  ["a ii) entlang 50° N, Δλ = 78,4° + 8,6° = 87°", "87/180 · π · 6378 · cos 50°", "<b>6225,13 km</b>"],
                  ["b) Orthodrome", "μ = 88,07°", "<b>9803,94 km</b>"]
                ]}},
                { note: R`Westliche Länge ist <b>negativ</b>: Quito λ = −78,4°. Damit Δλ = 8,6° − (−78,4°) = 87°.` }
              ],
              tips: [
                { title: "Kontrolle", body: R`Umweg über Meridian + Breitenkreis (11.791 km) muss länger sein als die Orthodrome (9.804 km). Sonst stimmt etwas nicht.` },
                { title: "Erdumfang als Gefühl", body: R`1° Großkreisbogen ≈ 111,3 km (bei R = 6378 km). 10,22° ≈ 1137 km passt.` }
              ],
              traps: [
                { title: "Falle: cos φ vergessen", body: R`Auf dem 50. Breitenkreis ist der Radius nur R · cos 50°. Ohne cos kommst du auf 9.684 statt 6.225 km.` },
                { title: "Falle: Vorzeichen bei West", body: R`78,4° W als +78,4° einzusetzen liefert Δλ = 69,8° statt 87°.` }
              ],
              checks: [
                { type: "mc", q: "Quito liegt auf dem Äquator. Wie lang ist der Flug genau nach Norden bis zum 50. Breitengrad? (R = 6378 km)", options: ["5565,85 km", "4100,02 km", "6225,13 km", "3577,64 km"], answer: 0, explain: "Meridianbogen: 50/180 · π · 6378 = 5565,85 km." },
                { type: "mc", q: "Entlang des 50. Breitenkreises von 78,4° W nach 8,6° O. Wie lang ist die Strecke?", options: ["9684,58 km", "6225,13 km", "4991,73 km", "7413,00 km"], answer: 1, explain: "Δλ = 87°: 87/180 · π · 6378 · cos 50° = 6225,13 km." },
                { type: "mc", q: "Athen (37,94° N, 23,94° O) → Beirut (33,82° N, 35,49° O). Wie lang ist die Orthodrome?", options: ["1137,15 km", "1285,70 km", "10,22 km", "983,40 km"], answer: 0, explain: "μ = 10,22° → 10,22/180 · π · 6378 = 1137,15 km." },
                { type: "mc", q: "Unter welchem Kurswinkel startet das Flugzeug in Athen?", options: ["20,29°", "69,71°", "110,29°", "159,71°"], answer: 2, explain: "Der Nenner ist negativ → Kurs zwischen 90° und 180°: 110,29° (Ost-Südost)." },
                { type: "mc", q: "Zwei Punkte liegen auf dem Äquator bei λ = 0° und λ = 90°. Wie lang ist die Orthodrome?", options: ["0 km", "5009,25 km", "10018,50 km", "20037,00 km"], answer: 2, explain: "Auf dem Äquator ist die Orthodrome der Äquator selbst: 90/180 · π · 6378 = 10018,5 km." }
              ],
              sources: ["Foto: Trigo-Klausur 2019 (A5 Quito/Frankfurt) und letzte Klausur (A5 Athen/Beirut)", "Lösungen_Trigonometrie_Klausur2.pdf (A5)", "Trigonometrie-Skript Kap. 2.3 Orthodrome"]
            },
            {
              id: "ma1-t6-neper",
              exam: "Trigo Aufgabe 6 · 8 P.",
              title: "Rechtwinkliges Eulersches Dreieck: Nepersche Regel",
              minutes: 5, xp: 120,
              tldr: R`Ein rechter Winkel + zwei weitere Elemente → mit der <b>Neperschen Regel</b> berechnen. Das Nepersche Fünfeck ist ein Spickzettel, aus dem du jede Formel ablesen kannst, statt sie auswendig zu lernen. Wichtig ist am Ende, die Quadranten über „gleichartig“ und das Vorzeichen von tan richtig zu wählen.`,
              core: [
                { h: "Nepersches Fünfeck (γ = 90°)" },
                { p: R`Reihenfolge im Kreis: a, γ, b, α, c, β. Die Nachbarn des rechten Winkels (a und b) durch ihre Komplemente ersetzen, γ streichen → Fünfeck: <b>90° − b, α, c, β, 90° − a</b>.` },
                { note: R`<b>Nepersche Regel:</b> cos(Mitte) = Produkt der <b>cot</b> der beiden <b>Nachbarn</b> = Produkt der <b>sin</b> der beiden <b>Gegenüber</b>.` },
                { table: { head: ["Formel", "Herkunft"], rows: [
                  [R`$\cos c = \cos a\cos b$`, "Pythagoras"],
                  [R`$\sin a = \sin c\sin\alpha$`, ""],
                  [R`$\cos\alpha = \cos a\sin\beta$`, ""],
                  [R`$\cos\beta = \cos b\sin\alpha$`, "Klausur"],
                  [R`$\cos c = \cot\alpha\cot\beta$`, ""],
                  [R`$\tan b = \tan c\cos\alpha$`, "Klausur (umgestellt nach tan c)"],
                  [R`$\tan a = \sin b\tan\alpha$`, ""]
                ]}},
                { p: R`Gleichartig (beide < 90°, = 90° oder > 90°): <b>a und α</b> sowie <b>b und β</b>.` },
                { h: "Musterlösung Klausur: b = 65°, α = 115°, γ = 90°" },
                { list: [
                  R`$\cos\beta = \cos 65^\circ\cdot\sin 115^\circ = 0{,}3830$ → β = <b>67,48°</b> (b spitz → β spitz ✓)`,
                  R`$\tan c = \tan 65^\circ / \cos 115^\circ = -5{,}0743$ → tan c < 0 → c in (90°, 180°): c = 180° − 78,85° = <b>101,15°</b>`
                ]}
              ],
              tips: [ { title: "Warum nicht sin verwenden?", body: R`Mit sin⁻¹ bekommst du immer einen Winkel < 90° und musst raten. cos⁻¹ und tan (mit Vorzeichen-Regel) sind in (0°, 180°) eindeutig. Darum steht in der Aufgabe „direkt aus den bekannten Elementen“.` } ],
              traps: [
                { title: "Falle: c = −78,85°", body: R`tan⁻¹ liefert einen negativen Wert. Seiten liegen zwischen 0° und 180°, also +180°.` },
                { title: "Falle: Komplemente vergessen", body: R`Im Fünfeck stehen 90° − a und 90° − b, nicht a und b. Daher z. B. cos(90° − a) = sin a.` }
              ],
              checks: [
                { type: "mc", q: R`γ = 90°, b = 40°, α = 70°. Wie groß ist β? ($\cos\beta = \cos b\sin\alpha$)`, options: ["43,96°", "46,04°", "136,04°", "70,00°"], answer: 0, explain: "cos β = cos 40° · sin 70° = 0,7198 → β = 43,96°. b spitz → β spitz ✓." },
                { type: "mc", q: R`Gleiches Dreieck: Wie groß ist c? ($\tan c = \tan b/\cos\alpha$)`, options: ["22,18°", "67,82°", "112,18°", "157,82°"], answer: 1, explain: "tan c = tan 40°/cos 70° = 2,4533 > 0 → c = 67,82°." },
                { type: "mc", q: "Welche Elemente sind bei γ = 90° gleichartig?", options: ["a und b", "a und α sowie b und β", "α und β", "c und γ"], answer: 1, explain: "Aus E7/E8 folgt: a ~ α und b ~ β." },
                { type: "mc", q: "Nepersche Regel: Der Kosinus eines Elements ist gleich …", options: ["dem Produkt der Sinus der Nachbarn", "dem Produkt der Kotangens der Nachbarn bzw. der Sinus der Gegenüber", "der Summe der Kosinus der Gegenüber", "dem Tangens des Gegenüber"], answer: 1, explain: "cos(Mitte) = cot · cot (Nachbarn) = sin · sin (Gegenüber)." }
              ],
              sources: ["Foto: letzte Trigo-Klausur (A6)", "Lösungen_Trigonometrie_Klausur2.pdf (A6)", "Trigonometrie-Skript Kap. 3.2, Formeln (3.1)–(3.10)"]
            },
            {
              id: "ma1-t7-kosinussaetze",
              exam: "Trigo Aufgabe 6/7 · 8 P.",
              title: "Allgemeines Eulersches Dreieck: Kosinus- & Kotangenssatz",
              minutes: 5, xp: 120,
              tldr: R`Ohne rechten Winkel helfen nur die großen Sätze. Merke dir die Fälle wie Formationen: <b>SWS</b> (zwei Seiten + Zwischenwinkel) → Seitenkosinussatz, <b>WSW</b> (zwei Winkel + Zwischenseite) → Winkelkosinussatz, und für das letzte Element der <b>Kotangenssatz</b>, der direkt eindeutig ist.`,
              core: [
                { h: "Die drei Sätze" },
                { math: R`\textbf{Seitenkosinussatz: } \cos c = \cos a\cos b + \sin a\sin b\cos\gamma` },
                { math: R`\textbf{Winkelkosinussatz: } \cos\gamma = -\cos\alpha\cos\beta + \sin\alpha\sin\beta\cos c` },
                { math: R`\textbf{Kotangenssatz: } \cos c\cos\beta = \cot a\sin c - \cot\alpha\sin\beta` },
                { p: R`Der Kotangenssatz verbindet vier aufeinanderfolgende Elemente, hier α, c, β, a. Nach dem gesuchten cot umstellen, dann mit $x = 90^\circ - \tan^{-1}(\cot x)$ eindeutig lösen.` },
                { h: "Musterlösung letzte Klausur: α = 72°, β = 128°, c = 100° (WSW)" },
                { list: [
                  R`$\cos\gamma = -\cos 72^\circ\cos 128^\circ + \sin 72^\circ\sin 128^\circ\cos 100^\circ = 0{,}0601$ → γ = <b>86,55°</b>`,
                  R`$\cot a = \frac{\cos 100^\circ\cos 128^\circ + \sin 128^\circ\cot 72^\circ}{\sin 100^\circ} = 0{,}3685$ → a = 90° − 20,23° = <b>69,77°</b>`
                ]},
                { h: "Version 2019: a = 60°, b = 120°, γ = 105° (SWS)" },
                { list: [
                  R`$\cos c = \cos 60^\circ\cos 120^\circ + \sin 60^\circ\sin 120^\circ\cos 105^\circ$ → c = <b>116,37°</b>`,
                  R`Kotangenssatz: $\cot\alpha = \frac{\cot a\sin b - \cos b\cos\gamma}{\sin\gamma}$ → α = <b>69,01°</b>`
                ]}
              ],
              tips: [ { title: "Probe", body: R`α = 69,01° kannst du mit dem Seitenkosinussatz für a gegenprüfen: $\cos\alpha = (\cos a - \cos b\cos c)/(\sin b\sin c)$ ergibt denselben Wert.` } ],
              traps: [
                { title: "Falle: Sinussatz für den zweiten Winkel", body: R`sin⁻¹ liefert nur Werte < 90°. Bei 2019 hätte das zufällig gepasst, aber bei stumpfen Winkeln ist es falsch. „Direkt aus den bekannten Elementen“ heißt: Kotangenssatz oder Kosinussatz.` },
                { title: "Falle: Vorzeichen im Winkelkosinussatz", body: R`Vorne steht ein <b>Minus</b>: −cos α cos β.` }
              ],
              checks: [
                { type: "mc", q: "Gegeben a = 50°, b = 70°, γ = 80°. Welcher Satz liefert direkt c?", options: ["Winkelkosinussatz", "Seitenkosinussatz", "Nepersche Regel", "ebener Sinussatz"], answer: 1, explain: "SWS → Seitenkosinussatz." },
                { type: "mc", q: "Gegeben a = 50°, b = 70°, γ = 80°. Wie groß ist c?", options: ["50,00°", "69,83°", "80,00°", "110,17°"], answer: 1, explain: "cos c = cos 50° cos 70° + sin 50° sin 70° cos 80° = 0,3448 → c = 69,83°." },
                { type: "mc", q: "Gegeben α, β und die Seite c dazwischen. Welcher Satz liefert γ?", options: ["Seitenkosinussatz", "Winkelkosinussatz", "Kotangenssatz", "Satz des Pythagoras"], answer: 1, explain: "WSW → Winkelkosinussatz: cos γ = −cos α cos β + sin α sin β cos c." },
                { type: "bug", q: "Finde den Fehler in diesem Lösungsweg (letzte Klausur):", lines: ["cos γ = −cos 72° cos 128° + sin 72° sin 128° cos 100°", "cos γ = 0,0601 → γ = 86,55°", "cot a = (cos 100° cos 128° + sin 128° cot 72°) / sin 100°", "cot a = 0,3685", "a = tan⁻¹(0,3685) = 20,23°"], answer: 4, explain: "Aus cot a folgt a = 90° − tan⁻¹(cot a) = 90° − 20,23° = 69,77°." }
              ],
              sources: ["Foto: Trigo-Klausur 2019 (A6) und letzte Klausur (A7)", "Lösungen_Trigonometrie_Klausur2.pdf (A7)", "Trigonometrie-Skript Kap. 3.3 (Seiten-/Winkelkosinussatz, Kotangenssatz)"]
            },
            /* ======================== ANALYSIS ======================== */
            {
              id: "ma1-a1-ungleichung",
              exam: "Analysis Aufgabe 1 · 8 P.",
              title: "Bruchungleichung: D und L mit Fallunterscheidung",
              minutes: 5, xp: 110,
              tldr: R`(2x+1)/(4x+5) ≥ 1/3. Du darfst mit dem Nenner multiplizieren, aber nur wenn du weißt, ob er positiv oder negativ ist. Bei negativ dreht sich das Zeichen um, wie bei einem Elfmeter, bei dem der Torwart die Ecke wechselt. Also <b>zwei Fälle</b>, dann vereinigen.`,
              core: [
                { h: "Schema" },
                { list: [
                  R`<b>D</b>: Nenner ≠ 0 → $4x + 5 \neq 0$ → $D = \mathbb{R}\setminus\{-\tfrac{5}{4}\}$`,
                  R`<b>Fall 1</b>: Nenner > 0 (x > −5/4): Zeichen bleibt → $6x+3 \ge 4x+5$ → x ≥ 1 → $L_1 = [1, \infty)$`,
                  R`<b>Fall 2</b>: Nenner < 0 (x < −5/4): Zeichen dreht → $6x+3 \le 4x+5$ → x ≤ 1, Schnitt mit x < −5/4 → $L_2 = (-\infty, -\tfrac{5}{4})$`,
                  R`$L = L_1 \cup L_2 = (-\infty, -\tfrac{5}{4}) \cup [1, \infty)$`
                ]},
                { note: R`Jedes Fall-Ergebnis mit der <b>Fallbedingung schneiden</b>. Das ist der Schritt, der am häufigsten fehlt.` }
              ],
              tips: [ { title: "Alternative: alles auf eine Seite", body: R`$\frac{2x+1}{4x+5} - \frac13 \ge 0 \Leftrightarrow \frac{2x-2}{3(4x+5)} \ge 0$. Dann Vorzeichentabelle mit den Stellen x = 1 und x = −5/4. Gleiches Ergebnis, weniger Fallstricke.` } ],
              traps: [
                { title: "Falle: −5/4 mit eckiger Klammer", body: R`−5/4 ist nicht in D, daher immer runde Klammer. x = 1 ist erlaubt (≥), daher [1, ∞).` },
                { title: "Falle: Zeichen nicht umgedreht", body: R`Wer in Fall 2 ≥ stehen lässt, bekommt x ≥ 1 und x < −5/4, also die leere Menge, und verliert die halbe Lösung.` }
              ],
              checks: [
                { type: "mc", q: R`Definitionsmenge von $\frac{2x+1}{4x+5} \ge \frac13$?`, options: ["ℝ", "ℝ \\ {−5/4}", "ℝ \\ {−1/2}", "[−5/4, ∞)"], answer: 1, explain: "Nenner 4x + 5 = 0 bei x = −5/4." },
                { type: "mc", q: R`Lösungsmenge von $\frac{x+2}{x-1} \ge 2$?`, options: ["(1, 4]", "[1, 4]", "(−∞, 1) ∪ [4, ∞)", "(4, ∞)"], answer: 0, explain: "Fall x > 1: x + 2 ≥ 2x − 2 → x ≤ 4 → (1, 4]. Fall x < 1: x + 2 ≤ 2x − 2 → x ≥ 4, Widerspruch → ∅." },
                { type: "mc", q: R`Lösungsmenge von $\frac{3x-1}{x+2} < 1$?`, options: ["(−2, 3/2)", "(−∞, −2) ∪ (3/2, ∞)", "(3/2, ∞)", "[−2, 3/2]"], answer: 0, explain: "Fall x > −2: 3x − 1 < x + 2 → x < 3/2. Fall x < −2: 3x − 1 > x + 2 → x > 3/2, Widerspruch." },
                { type: "order", q: "Bringe den Lösungsweg in die richtige Reihenfolge:", steps: ["Definitionsmenge D bestimmen", "Fall 1: Nenner > 0, Zeichen bleibt", "Ergebnis mit Fallbedingung schneiden → L₁", "Fall 2: Nenner < 0, Zeichen dreht sich", "Ergebnis mit Fallbedingung schneiden → L₂", "L = L₁ ∪ L₂"], explain: "D → Fall 1 → Schnitt → Fall 2 → Schnitt → Vereinigung." }
              ],
              sources: ["Foto: Analysis-Klausur (A1)", "Lösungen_Analysis_Klausur2.pdf (A1)", "GoodNotes: 1. Semester/Mathe/Analysis/Skript.pdf"]
            },
            {
              id: "ma1-a2-grenzwerte",
              exam: "Analysis Aufgabe 2 · 16 P.",
              title: "Grenzwerte: Folge, Polynomdivision & Wurzel",
              minutes: 6, xp: 130,
              tldr: R`16 Punkte, die größte Analysis-Aufgabe. Drei Typen kommen immer: <b>(a)</b> Bruch für n → ∞ (Leitkoeffizienten vergleichen), <b>(b)</b> 0/0 bei einem Polynom (Polynomdivision, dann kürzen), <b>(c)</b> Wurzel im Zähler. Erste Regel bei jedem Grenzwert: <b>erst einsetzen</b>, dann entscheiden.`,
              core: [
                { h: "(a) n → ∞: Grad vergleichen" },
                { table: { head: ["Grad Zähler vs. Nenner", "Grenzwert"], rows: [
                  ["Zähler < Nenner", "0"],
                  ["gleich", "Verhältnis der Leitkoeffizienten"],
                  ["Zähler > Nenner", "existiert nicht (±∞)"]
                ]}},
                { p: R`Klausur: $\frac{4-5n^2}{(1+3n)^2} = \frac{-5n^2+4}{9n^2+6n+1}$ → gleicher Grad → <b>−5/9</b>. Begründung durch Ausklammern von n² hinschreiben.` },
                { h: "(b) 0/0 → Polynomdivision" },
                { p: R`x → −1: Zähler $x^3+2x^2+4x+3$ und Nenner $x^2-1$ sind beide 0. Also steckt in beiden der Faktor (x + 1):` },
                { math: R`\frac{(x+1)(x^2+x+3)}{(x+1)(x-1)} = \frac{x^2+x+3}{x-1} \xrightarrow{x\to-1} \frac{3}{-2} = -\frac32` },
                { h: "(c) Wurzel: erst einsetzen!" },
                { p: R`Klausur: $\lim_{x\to2}\frac{\sqrt x - 2}{x-4}$. Einsetzen: Zähler √2 − 2 ≠ 0, Nenner −2 ≠ 0 → <b>keine</b> unbestimmte Form → direkt: $\frac{\sqrt2-2}{-2} = \frac{2-\sqrt2}{2} \approx 0{,}293$.` },
                { p: R`<b>Wahrscheinliche Variante x → 4</b> (dann 0/0): mit $\sqrt x + 2$ erweitern bzw. $x - 4 = (\sqrt x-2)(\sqrt x+2)$:` },
                { math: R`\frac{\sqrt x - 2}{(\sqrt x - 2)(\sqrt x+2)} = \frac{1}{\sqrt x + 2} \xrightarrow{x\to4} \frac14` }
              ],
              tips: [
                { title: "Polynomdivision prüfen", body: R`Ausmultiplizieren: (x + 1)(x² + x + 3) = x³ + 2x² + 4x + 3 ✓. Diese Probe kostet 20 Sekunden und gibt Sicherheit.` },
                { title: "Antwortsatz", body: R`„Der Grenzwert existiert und ist gleich …“ Die Aufgabe fragt ausdrücklich, ob er existiert.` }
              ],
              traps: [
                { title: "Falle: Bei x → 2 erweitern", body: R`Viele erweitern automatisch mit √x + 2 und rechnen sich fest. Erst einsetzen: Wenn kein 0/0 rauskommt, bist du fertig.` },
                { title: "Falle: (1+3n)² = 1 + 9n²", body: R`Binomische Formel: 1 + 6n + 9n². Für den Grenzwert zählt nur 9n², aber falsch ausmultipliziert gibt Punktabzug.` }
              ],
              checks: [
                { type: "mc", q: R`$\lim_{n\to\infty}\frac{2n^3-n}{4n^3+5}$`, options: ["0", "1/2", "2", "existiert nicht"], answer: 1, explain: "Gleicher Grad → 2/4 = 1/2." },
                { type: "mc", q: R`$\lim_{n\to\infty}\frac{3n^2+1}{n^3-2}$`, options: ["0", "3", "∞", "−1/2"], answer: 0, explain: "Zählergrad 2 < Nennergrad 3 → 0." },
                { type: "mc", q: R`$\lim_{x\to2}\frac{x^2+x-6}{x^2-4}$`, options: ["0", "5/4", "1", "existiert nicht"], answer: 1, explain: "0/0 → (x − 2)(x + 3) / ((x − 2)(x + 2)) = (x + 3)/(x + 2) → 5/4." },
                { type: "mc", q: R`$\lim_{x\to9}\frac{\sqrt x - 3}{x-9}$`, options: ["0", "1/6", "1/3", "existiert nicht"], answer: 1, explain: "0/0 → 1/(√x + 3) → 1/6." },
                { type: "mc", q: R`$\lim_{x\to4}\frac{\sqrt x - 3}{x-9}$ (Achtung!)`, options: ["1/6", "1/5", "0", "existiert nicht"], answer: 1, explain: "Kein 0/0! Direkt einsetzen: (2 − 3)/(4 − 9) = 1/5." },
                { type: "mc", q: R`$\lim_{x\to-1}\frac{x^3+2x^2+4x+3}{x^2-1}$`, options: ["0", "3/2", "−3/2", "existiert nicht"], answer: 2, explain: "Kürzen mit (x + 1) → (x² + x + 3)/(x − 1) → 3/(−2)." }
              ],
              sources: ["Foto: Analysis-Klausur (A2)", "Lösungen_Analysis_Klausur2.pdf (A2)", "GoodNotes: 1. Semester/Mathe/Analysis/Skript.pdf"]
            },
            {
              id: "ma1-a3-ableitungen",
              exam: "Analysis Aufgabe 3 · 9 P.",
              title: "Ableitungen: Quotient, Produkt, Kette, e und ln",
              minutes: 5, xp: 110,
              tldr: R`Drei Funktionen, drei Regeln, je 3 Punkte: <b>Quotientenregel</b> (x³/(1+x²)), <b>Produkt + Kette</b> (x⁶·cos(3x⁴)) und <b>e/ln mit Kette</b> (e^(1/x) − ln√x). Das ist reines Combo-Training, und genau dafür ist Wiederholung da.`,
              core: [
                { table: { head: ["Regel", "Formel"], rows: [
                  ["Produkt", R`$(uv)' = u'v + uv'$`],
                  ["Quotient", R`$\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ (NAZ − ZAN durch N²)`],
                  ["Kette", R`$f(g(x))' = f'(g(x))\cdot g'(x)$`],
                  ["e und ln", R`$(e^{g})' = e^{g}\cdot g'$, $\quad(\ln g)' = \frac{g'}{g}$`]
                ]}},
                { h: "Musterlösung Klausur" },
                { list: [
                  R`$f(x)=\frac{x^3}{1+x^2}$: $f'(x) = \frac{3x^2(1+x^2) - x^3\cdot 2x}{(1+x^2)^2} = \frac{x^2(x^2+3)}{(1+x^2)^2}$`,
                  R`$g(x)=x^6\cos(3x^4)$: $g'(x) = 6x^5\cos(3x^4) - 12x^9\sin(3x^4)$`,
                  R`$h(x)=e^{1/x} - \ln\sqrt x$: $\ln\sqrt x = \tfrac12\ln x$ → $h'(x) = -\frac{e^{1/x}}{x^2} - \frac{1}{2x}$`
                ]},
                { note: R`Erst vereinfachen, dann ableiten: $\ln\sqrt x = \frac12\ln x$ spart die Kettenregel.` }
              ],
              tips: [ { title: "Kettenregel bei cos(3x⁴)", body: R`Äußere Ableitung −sin(3x⁴), innere 12x³ → −12x³ sin(3x⁴). Dann mit x⁶ multiplizieren → −12x⁹ sin(3x⁴).` } ],
              traps: [
                { title: "Falle: Minus bei cos", body: R`(cos)' = <b>−</b>sin. Ein vergessenes Minus kostet in b) einen Punkt.` },
                { title: "Falle: (1/x)' = 1/x²", body: R`Richtig ist −1/x². Daher $(e^{1/x})' = -e^{1/x}/x^2$.` }
              ],
              checks: [
                { type: "mc", q: R`Ableitung von $\frac{x^2}{1+x}$?`, options: [R`$2x$`, R`$\frac{x^2+2x}{(1+x)^2}$`, R`$\frac{x^2-2x}{(1+x)^2}$`, R`$\frac{2x+3x^2}{(1+x)^2}$`], answer: 1, explain: "(2x(1 + x) − x²)/(1 + x)² = (x² + 2x)/(1 + x)²." },
                { type: "mc", q: R`Ableitung von $x^3\sin(2x^2)$?`, options: [R`$3x^2\sin(2x^2) + 4x^4\cos(2x^2)$`, R`$3x^2\cos(4x)$`, R`$3x^2\sin(2x^2) - 4x^4\cos(2x^2)$`, R`$3x^2\sin(2x^2) + 2x^3\cos(2x^2)$`], answer: 0, explain: "Produkt: 3x² sin(2x²) + x³ · cos(2x²) · 4x." },
                { type: "mc", q: R`Ableitung von $e^{2/x}$?`, options: [R`$e^{2/x}$`, R`$\frac{2}{x}e^{2/x}$`, R`$-\frac{2}{x^2}e^{2/x}$`, R`$\frac{2}{x^2}e^{2/x}$`], answer: 2, explain: "Innere Ableitung von 2/x ist −2/x²." },
                { type: "mc", q: R`Ableitung von $\ln(x^2+1)$?`, options: [R`$\frac{1}{x^2+1}$`, R`$\frac{2x}{x^2+1}$`, R`$2x\ln(x^2+1)$`, R`$\frac{2}{x}$`], answer: 1, explain: "(ln g)' = g'/g = 2x/(x² + 1)." },
                { type: "bug", q: "Finde den Fehler beim Ableiten von g(x) = x⁶ cos(3x⁴):", lines: ["u = x⁶, u' = 6x⁵", "v = cos(3x⁴)", "v' = sin(3x⁴) · 12x³", "g' = u'v + uv'", "g' = 6x⁵ cos(3x⁴) + 12x⁹ sin(3x⁴)"], answer: 2, explain: "(cos)' = −sin → v' = −12x³ sin(3x⁴). Dadurch ist auch die letzte Zeile falsch (Minus)." }
              ],
              sources: ["Foto: Analysis-Klausur (A3)", "Lösungen_Analysis_Klausur2.pdf (A3)"]
            },
            {
              id: "ma1-a4-zws",
              exam: "Analysis Aufgabe 4 · 7 P.",
              title: "Nullstellen: Zwischenwertsatz & Monotonie",
              minutes: 4, xp: 100,
              tldr: R`f(x) = eˣ − 3x auf [0, 1]. Teil a: <b>mindestens</b> eine Nullstelle → Zwischenwertsatz (stetig + Vorzeichenwechsel). Teil b: <b>höchstens</b> eine → streng monoton (f' hat festes Vorzeichen). Zusammen: genau eine. Das ist reine Argumentation, die Formulierung bringt die Punkte.`,
              core: [
                { h: "a) Zwischenwertsatz (ZWS)" },
                { list: [
                  R`f ist <b>stetig</b> auf [0, 1] (Summe stetiger Funktionen) ← unbedingt hinschreiben!`,
                  R`f(0) = 1 > 0, f(1) = e − 3 ≈ −0,2817 < 0`,
                  R`→ Vorzeichenwechsel → nach ZWS mindestens eine Nullstelle in (0, 1)`
                ]},
                { h: "b) Monotonie" },
                { list: [
                  R`f'(x) = eˣ − 3 = 0 ⇔ x = ln 3 ≈ 1,0986 → liegt <b>außerhalb</b> von [0, 1]`,
                  R`Für x ∈ [0, 1]: eˣ ≤ e < 3 → f'(x) < 0 → f streng monoton fallend`,
                  R`Streng monoton → höchstens eine Nullstelle. Mit a) → <b>genau eine</b>`
                ]}
              ],
              tips: [ { title: "Variante mit Polynom", body: R`f(x) = x³ + x − 1 auf [0, 1]: f(0) = −1, f(1) = 1 → ZWS. f'(x) = 3x² + 1 > 0 überall → streng steigend → genau eine Nullstelle.` } ],
              traps: [
                { title: "Falle: Stetigkeit nicht erwähnt", body: R`Der ZWS gilt nur für stetige Funktionen. Ohne diesen Satz fehlt die Voraussetzung, und damit ein Punkt.` },
                { title: "Falle: „Zwei Nullstellen, weil f' = 0 bei ln 3“", body: R`ln 3 liegt außerhalb von I. Auf I ändert f' sein Vorzeichen nicht.` }
              ],
              checks: [
                { type: "mc", q: "Welche Voraussetzung braucht der Zwischenwertsatz neben dem Vorzeichenwechsel?", options: ["Differenzierbarkeit", "Stetigkeit auf [a, b]", "Monotonie", "Beschränktheit"], answer: 1, explain: "Der ZWS setzt Stetigkeit auf dem abgeschlossenen Intervall voraus." },
                { type: "mc", q: "f(x) = eˣ − 4x auf I = [0, 1]: f(0) = 1, f(1) ≈ −1,28. Wie viele Nullstellen hat f in I?", options: ["keine", "genau eine", "genau zwei", "unendlich viele"], answer: 1, explain: "ZWS → mindestens eine. f'(x) = eˣ − 4 = 0 bei ln 4 ≈ 1,386 > 1 → auf I streng fallend → genau eine." },
                { type: "mc", q: "f(x) = x³ + x − 1 auf [0, 1]: Warum höchstens eine Nullstelle?", options: ["f(0) < 0", "f'(x) = 3x² + 1 > 0 → streng steigend", "f ist ein Polynom", "f(1) = 1"], answer: 1, explain: "Strenge Monotonie schließt eine zweite Nullstelle aus." },
                { type: "order", q: "Bringe die Argumentation für „genau eine Nullstelle“ in die richtige Reihenfolge:", steps: ["f ist stetig auf I", "f(a) und f(b) haben verschiedene Vorzeichen", "ZWS → mindestens eine Nullstelle", "f' hat auf I keine Nullstelle / festes Vorzeichen", "f streng monoton → höchstens eine → genau eine"], explain: "Erst Existenz (ZWS), dann Eindeutigkeit (Monotonie)." }
              ],
              sources: ["Foto: Analysis-Klausur (A4)", "Lösungen_Analysis_Klausur2.pdf (A4)"]
            },
            {
              id: "ma1-a5-kurvendiskussion",
              exam: "Analysis Aufgabe 5 · 10 P.",
              title: "Kurvendiskussion: D, Tangente, Extremum, Wendepunkt",
              minutes: 6, xp: 130,
              tldr: R`f(x) = (2x+4)√(x+3), und f' und f'' sind <b>schon gegeben</b>. Du musst also nichts ableiten, nur sauber argumentieren. Der Knackpunkt ist der Definitionsbereich: f gilt ab x ≥ −3, f' und f'' erst ab x > −3. Deshalb ist der Kandidat x = −10/3 für den Wendepunkt <b>ungültig</b>.`,
              core: [
                { p: R`$f(x) = (2x+4)\sqrt{x+3}$, $f'(x) = \frac{3x+8}{\sqrt{x+3}}$, $f''(x) = \frac{3x+10}{2(x+3)^{3/2}}$` },
                { h: "a) Definitionsmenge" },
                { p: R`Radikand ≥ 0: x + 3 ≥ 0 → $D_f = [-3, \infty)$. (f' und f'' nur für x > −3.)` },
                { h: "b) Tangente bei x = 1" },
                { math: R`t(x) = f(1) + f'(1)(x-1) = 12 + 5{,}5(x-1) = 5{,}5x + 6{,}5` },
                { h: "c) Extrempunkt" },
                { list: [
                  R`Notwendig: f'(x) = 0 → 3x + 8 = 0 → x₀ = −8/3 ≈ −2,667 (liegt in x > −3 ✓)`,
                  R`Hinreichend: f''(−8/3) = 2 / (2 · (1/3)^{3/2}) = 3√3 ≈ 5,196 <b>> 0</b> → <b>Minimum</b>`,
                  R`y-Wert: f(−8/3) = (−4/3) · √(1/3) = −4√3/9 ≈ −0,770 → Tiefpunkt (−2,667 | −0,770)`
                ]},
                { h: "d) Wendepunkt" },
                { list: [
                  R`f''(x) = 0 → 3x + 10 = 0 → x = −10/3 ≈ −3,333 → <b>nicht</b> im Bereich x > −3`,
                  R`Für x > −3 ist 3x + 10 > 1 > 0 und der Nenner > 0 → f'' > 0 überall`,
                  R`Kein Vorzeichenwechsel → <b>kein Wendepunkt</b>, f ist durchgehend linksgekrümmt`
                ]}
              ],
              tips: [ { title: "Tangentenformel auswendig", body: R`$t(x) = f(x_0) + f'(x_0)(x - x_0)$. Variante bei x₀ = 6: f(6) = 48, f'(6) = 26/3 → t(x) = 26/3 · (x − 6) + 48.` } ],
              traps: [
                { title: "Falle: x = −10/3 als Wendestelle", body: R`Der Kandidat liegt außerhalb von D. Wer das nicht prüft, „findet“ einen Wendepunkt, den es nicht gibt.` },
                { title: "Falle: −3 aus D ausschließen", body: R`f(−3) = (−2) · √0 = 0 ist definiert, also gehört −3 zu D_f (eckige Klammer).` }
              ],
              checks: [
                { type: "mc", q: "Was ist die maximale Definitionsmenge von f(x) = (2x+4)√(x+3)?", options: ["ℝ", "(−3, ∞)", "[−3, ∞)", "[−2, ∞)"], answer: 2, explain: "x + 3 ≥ 0. Bei x = −3 ist f(−3) = 0 definiert." },
                { type: "mc", q: "Tangente an den Graphen bei x = 1?", options: ["t(x) = 12x", "t(x) = 5,5x + 6,5", "t(x) = 5,5x + 12", "t(x) = 11x + 1"], answer: 1, explain: "f(1) = 12, f'(1) = 11/2 → 12 + 5,5(x − 1) = 5,5x + 6,5." },
                { type: "mc", q: "Tangente bei x = −2? (f(−2) = 0, f'(−2) = 2)", options: ["t(x) = 2x + 4", "t(x) = 2x − 4", "t(x) = −2x", "t(x) = 2x"], answer: 0, explain: "t(x) = 0 + 2(x + 2) = 2x + 4." },
                { type: "mc", q: "Was ist bei x₀ = −8/3?", options: ["Hochpunkt, weil f''(x₀) < 0", "Tiefpunkt, weil f''(x₀) = 3√3 > 0", "Wendepunkt", "Sattelpunkt"], answer: 1, explain: "f'(x₀) = 0 und f''(x₀) > 0 → lokales Minimum." },
                { type: "mc", q: "Hat der Graph einen Wendepunkt?", options: ["Ja, bei x = −10/3", "Ja, bei x = −8/3", "Nein, −10/3 liegt nicht in D und f'' > 0 überall", "Nein, weil f' keine Nullstelle hat"], answer: 2, explain: "Kein Vorzeichenwechsel von f'' im Definitionsbereich → kein Wendepunkt." }
              ],
              sources: ["Foto: Analysis-Klausur (A5)", "Lösungen_Analysis_Klausur2.pdf (A5)"]
            }
          ]
        },
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
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-07-grundbuch",
              title: "Grundbuch & dingliche Rechte: Abteilung I, II, III",
              minutes: 6,
              xp: 120,
              tldr: R`Das Liegenschaftskataster sagt dir, <b>wo</b> und <b>wie groß</b> ein Grundstück ist. Das Grundbuch sagt, <b>wem</b> es gehört und <b>wer noch Rechte daran hat</b>. Stell dir das Grundbuchblatt wie einen Spielerpass vor: Bestandsverzeichnis = Stammdaten, Abt. I = Besitzer, Abt. II = Lasten (Leitungsrecht, Nießbrauch …), Abt. III = die Bank (Grundschuld, Hypothek). In der LIKA-Übung kam immer wieder die Frage „Welches Recht, in welche Abteilung?“.`,
              core: [
                { h: "Öffentliches Recht vs. Privatrecht" },
                { table: { head: ["", "Öffentliches Recht", "Privatrecht"], rows: [
                  ["Verhältnis", "Über-/Unterordnung (Staat ↔ Bürger)", "Gleichordnung der Bürger"],
                  ["Handeln", "Verwaltungsakt", "Rechtsgeschäft (Vertrag)"],
                  ["Beispiele", "Bauantrag, Verwarnung, Abmarkung", "Baumaterialbestellung, Rechtsberatung, Grenzfeststellungsvertrag"]
                ]}},
                { p: R`<b>Verwaltungsakt</b> (Art. 35 BayVwVfG), 5 Merkmale: <b>Behörde</b> · <b>hoheitliche Maßnahme</b> auf dem Gebiet des öffentlichen Rechts · <b>Regelung</b> · eines <b>Einzelfalls</b> · mit <b>Außenwirkung</b>. Aufbau: Bescheid, Begründung, Rechtsbehelfsbelehrung. Gegen einen VA: Widerspruch innerhalb 1 Monat (in der Vermessungsverwaltung weggefallen → direkt Klage).` },
                { h: "Eigentum, Besitz & BGB" },
                { list: [
                  R`BGB in 5 Büchern: Allgemeiner Teil, Schuldrecht, <b>Sachenrecht</b>, Familienrecht, Erbrecht`,
                  R`<b>Eigentum</b> = rechtliche Herrschaft · <b>Besitz</b> = tatsächliche Herrschaft (der Mieter besitzt, der Vermieter ist Eigentümer)`,
                  R`<b>Wesentliche Bestandteile</b> (§§ 93 ff.: Gebäude, Pflanzen) teilen das Schicksal des Grundstücks. <b>Zubehör</b> (§ 97: z. B. Maschinen in der Mühle) ist beweglich und keine Bestandteile`,
                  R`<b>Wohnungseigentum</b> (WEG): Sondereigentum + Miteigentumsanteil, braucht Abgeschlossenheitsbescheinigung und Aufteilungsplan, eigenes Wohnungsgrundbuch`,
                  R`<b>Erbbaurecht</b>: Recht zu bauen auf fremdem Grund (meist 99 oder 75 Jahre), Erbbauzins, 1. Rang auf dem belasteten Blatt + eigenes Erbbaugrundbuch`
                ]},
                { h: "Beschränkt dingliche Rechte" },
                { table: { head: ["Recht", "subjektiv dinglich (hängt am Grundstück)", "subjektiv persönlich (hängt an Person)"], rows: [
                  ["Grunddienstbarkeit (z. B. Wegerecht)", "✓", ""],
                  ["Beschränkt persönliche Dienstbarkeit (z. B. Leitungsrecht für Stadtwerke)", "", "✓"],
                  ["Nießbrauch", "", "✓"],
                  ["Vorkaufsrecht", "✓", "✓"],
                  ["Reallast", "✓", "✓"],
                  ["Grundpfandrechte", "Hypothek: akzessorisch", "Grundschuld: nicht akzessorisch"]
                ]}},
                { p: R`Nach Inhalt: <b>Nutzungsrechte</b> (Dienstbarkeiten), <b>Verwertungsrechte</b> (Grundpfandrechte), <b>Erwerbsrechte</b> (Vorkaufsrecht). Öffentlich-rechtliche Lasten (Erschließungsbeiträge, gesetzliche Vorkaufsrechte der Gemeinde) stehen <b>nicht</b> im Grundbuch.` },
                { h: "Aufbau eines Grundbuchblatts" },
                { table: { head: ["Teil", "Inhalt"], rows: [
                  ["Aufschrift", "Amtsgericht, Gemarkung (Grundbuchbezirk), Blattnummer"],
                  ["Bestandsverzeichnis", "Gemarkung, Flurstücksnummer, Lage, Wirtschaftsart, Größe (aus dem Kataster), grundstücksgleiche Rechte"],
                  ["Abteilung I", "Eigentümer + Grundlage des Erwerbs (z. B. Auflassung)"],
                  ["Abteilung II", "Lasten und Beschränkungen: alle beschränkt dinglichen Rechte <b>außer</b> Grundpfandrechten"],
                  ["Abteilung III", "Grundpfandrechte: Hypothek, Grundschuld, Rentenschuld"]
                ]}},
                { list: [
                  R`Gleiche Abteilung → die <b>Reihenfolge der Eintragung</b> bestimmt den Rang`,
                  R`<b>Öffentlicher Glaube</b>: Vermutung der Richtigkeit des Grundbuchs`,
                  R`Einsicht nur bei <b>berechtigtem Interesse</b>`,
                  R`<b>Rötung ≠ Löschung</b>: maßgeblich ist der Löschungsvermerk`,
                  R`Realfolium (§ 3 GBO: ein Blatt je Grundstück, Regelfall) vs. Personalfolium (§ 4: mehrere Grundstücke eines Eigentümers)`,
                  R`Seit 01.10.1910 ist das Grundbuch für ganz Bayern angelegt`
                ]},
                { h: "Flurstück vs. Grundstück" },
                { table: { head: ["", "Liegenschaftskataster", "Grundbuch"], rows: [
                  ["Einheit", "Flurstück (eigene Nummer in der Flurkarte)", "Grundstück (eigene Nummer im Bestandsverzeichnis)"],
                  ["aus 1 mach 2", "<b>Zerlegung</b>", "<b>Teilung</b>"],
                  ["aus 2 mach 1", "<b>Verschmelzung</b>", "<b>Vereinigung</b>"],
                  ["Aufgabe", "örtlicher Bezug, amtliches Verzeichnis (§ 2 (2) GBO)", "Eigentum, Rechte Dritter, Rang"]
                ]}},
                { note: R`Ein Grundstück kann aus mehreren Flurstücken bestehen, aber ein Flurstück nie aus mehreren Grundstücken.` }
              ],
              tips: [
                { title: "Klausur-Muster aus der LIKA-Übung", body: R`Nachbar will seinen Abwasserkanal sichern → <b>Leitungsrecht</b> (Dienstbarkeit) in <b>Abt. II</b>. Bank will das Darlehen sichern → <b>Grundpfandrecht</b> in <b>Abt. III</b>.` },
                { title: "Hypothek vs. Grundschuld", body: R`Die Hypothek ist <b>akzessorisch</b>, sie existiert nur so lange wie die Forderung. Die Grundschuld ist davon unabhängig, deshalb nehmen Banken heute fast immer die Grundschuld.` }
              ],
              traps: [
                { title: "Falle: Grundschuld in Abt. II", body: R`Alle Grundpfandrechte stehen in Abt. III. Abt. II hat alles andere (Dienstbarkeiten, Nießbrauch, Vorkaufsrecht, Reallast, Auflassungsvormerkung …).` },
                { title: "Falle: Gerötet = gelöscht", body: R`Rötung hat keine rechtliche Wirkung. Ohne Löschungsvermerk besteht das Recht weiter.` },
                { title: "Falle: Zerlegung im Grundbuch", body: R`Zerlegung und Verschmelzung passieren im <b>Kataster</b>, Teilung und Vereinigung im <b>Grundbuch</b>.` }
              ],
              checks: [
                { type: "mc", q: "Der Nachbar möchte, dass sein Abwasserkanal unter deinem Grundstück dinglich gesichert wird. Was wird wo eingetragen?", options: ["Vorkaufsrecht in Abt. II", "Leitungsrecht (Dienstbarkeit) in Abt. II", "Grundschuld in Abt. III", "Leitungsrecht in Abt. III"], answer: 1, explain: "Dienstbarkeiten stehen in Abt. II. Abt. III ist nur für Grundpfandrechte." },
                { type: "mc", q: "Die Bank finanziert den Hallenbau und will sich absichern. Welches Recht, welche Abteilung?", options: ["Nießbrauch, Abt. II", "Grundpfandrecht, Abt. III", "Grundpfandrecht, Abt. I", "Reallast, Abt. II"], answer: 1, explain: "Grundschuld oder Hypothek → Abt. III." },
                { type: "mc", q: "Welches Recht ist IMMER subjektiv dinglich, hängt also am Grundstück und nicht an einer Person?", options: ["Nießbrauch", "Beschränkt persönliche Dienstbarkeit", "Grunddienstbarkeit", "Grundschuld"], answer: 2, explain: "Die Grunddienstbarkeit steht dem jeweiligen Eigentümer des herrschenden Grundstücks zu." },
                { type: "mc", q: "Ein Recht ist im Grundbuch rot unterstrichen, aber es gibt keinen Löschungsvermerk. Besteht es noch?", options: ["Nein, gerötet heißt gelöscht", "Ja, maßgeblich ist der Löschungsvermerk", "Nur wenn der Notar zustimmt", "Nur in Abt. III"], answer: 1, explain: "Die Rötung dient nur der Übersicht, sie hat keine rechtliche Wirkung." },
                { type: "mc", q: "Aus einem Flurstück werden zwei. Wie heißt das im Kataster?", options: ["Teilung", "Zerlegung", "Vereinigung", "Verschmelzung"], answer: 1, explain: "Kataster: Zerlegung/Verschmelzung. Grundbuch: Teilung/Vereinigung." },
                { type: "mc", q: "Was ist KEIN Merkmal eines Verwaltungsakts?", options: ["Regelung eines Einzelfalls", "Wirkung nach außen", "Gleichordnung der Beteiligten", "Handeln einer Behörde"], answer: 2, explain: "Gleichordnung ist typisch für das Privatrecht. Der VA ist hoheitlich (Über-/Unterordnung)." },
                { type: "order", q: "Ordne den Aufbau eines Grundbuchblatts von vorne nach hinten:", steps: ["Aufschrift (Amtsgericht, Gemarkung, Blatt)", "Bestandsverzeichnis (Flurstücke, Größe, Lage)", "Abteilung I (Eigentümer)", "Abteilung II (Lasten und Beschränkungen)", "Abteilung III (Grundpfandrechte)"], explain: "Aufschrift → Bestandsverzeichnis → Abt. I → II → III." }
              ],
              sources: [
                "GoodNotes: 2. Landmanagement.pdf (= Liegenschaftskataster) – Kap. 1 Öff. Recht/Privatrecht, Kap. 2 Dingliche Rechte (Zuordnungstabelle S. 29), Kap. 3 Grundbuch",
                "iCloud: 09_Lösung.pdf (LIKA-Übung Aufgabe 1e–i, 5)",
                "E-Learning Kurs 33000: LIKA 1–3"
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-08-raumplanung",
              title: "Raumplanung: LEP, Regionalplan, FNP & Aufstellungsverfahren",
              minutes: 6,
              xp: 120,
              tldr: R`Raumplanung funktioniert wie eine Liga-Pyramide: Der Bund gibt Leitbilder vor, Bayern das LEP, die 18 Regionen den Regionalplan, die Gemeinde FNP und B-Plan, und ganz unten baut der Bauherr. Jede Ebene muss sich an die darüber anpassen, und die unteren werden von oben angehört (<b>Gegenstromprinzip</b>). Zur Klausur gehört auch das Aufstellungsverfahren eines Bauleitplans in Schritten.`,
              core: [
                { h: "Planungsebenen" },
                { table: { head: ["Instrument", "Gebiet", "Träger"], rows: [
                  ["Raumordnung des Bundes (ROG, MKRO)", "Deutschland", "Bund (Leitbilder)"],
                  ["Landesentwicklungsprogramm (LEP)", "Bundesland", "Freistaat Bayern"],
                  ["Regionalplan", "Region (18 in Bayern)", "Regionaler Planungsverband"],
                  ["Flächennutzungsplan", "Gemeinde", "Kommune"],
                  ["Bebauungsplan", "Teil des Gemeindegebiets", "Kommune"],
                  ["Bauvorhaben", "Grundstück", "Bauherr/in"]
                ]}},
                { p: R`Die EU plant nicht rechtsverbindlich (zu heterogen), steuert aber über Fördermittel (EFRE, ESF+ …).` },
                { h: "Landesentwicklungsprogramm (LEP, aktuell LEP 2023)" },
                { list: [
                  R`Gesamtkonzept der Staatsregierung für ca. <b>10 Jahre</b>. Grundlage: ROG + Bayerisches Landesplanungsgesetz (BayLplG)`,
                  R`<b>Ziele</b> = Beachtenspflicht (verbindlich) · <b>Grundsätze</b> = Berücksichtigungspflicht (in der Abwägung)`,
                  R`Teil A überfachlich (Raumstruktur, <b>zentrale Orte</b>), Teil B fachlich (Verkehr, Wirtschaft, Energie …)`,
                  R`Zweck: Disparitäten Stadt/Land abbauen, Fachbereiche koordinieren, Rahmen für Regionalplanung setzen`
                ]},
                { table: { head: ["Landesplanungsbehörde", "Wer?"], rows: [
                  ["Oberste", "Staatsministerium für Wirtschaft, Landesentwicklung und Energie"],
                  ["Höhere", "Bezirksregierung (mit dem/der Regionsbeauftragten)"],
                  ["Untere", "Kreisverwaltungsbehörde (Landratsamt, kreisfreie Stadt)"]
                ]}},
                { h: "Regionalplan" },
                { p: R`Konkretisiert das LEP für eine von <b>18 Regionen</b> (Würzburg = Region 2). Träger ist der <b>Regionale Planungsverband</b> (alle Kommunen der Region: Verbandsversammlung, Planungsausschuss, Vorsitz). Die fachliche Arbeit macht der/die <b>Regionsbeauftragte</b> an der Bezirksregierung.` },
                { h: "Flächennutzungsplan (§ 5 BauGB)" },
                { list: [
                  R`Vorbereitender Bauleitplan, <b>ganzes Gemeindegebiet</b>, Zielhorizont <b>10–15 Jahre</b>`,
                  R`<b>Anpassungsgebot</b>: Bauleitpläne sind den Zielen der Raumordnung anzupassen`,
                  R`Inhalt nach § 5 (2) „insbesondere“ (<b>nicht</b> abschließend), der B-Plan nach § 9 (1) ist dagegen abschließend`,
                  R`<b>Nachrichtliche Übernahmen</b>: Wasserschutz-, Natur-/Landschaftsschutzgebiete, Biotopkartierung, Leitungen`,
                  R`Bestandteile: Planzeichnung + Legende, Begründung, Umweltbericht`
                ]},
                { h: "Aufstellungsverfahren eines Bauleitplans" },
                { p: R`1 Aufstellungsbeschluss (Gemeinderat, ortsüblich bekannt machen) → 2 Vorentwurf (mit Umweltbericht) → 3 frühzeitige Beteiligung von Öffentlichkeit und Behörden/TöB → 4 Abwägung → 5 Billigungs- und Auslegungsbeschluss → 6 öffentliche Auslegung (<b>1 Monat</b>) → 7 Behandlung der Stellungnahmen → 8 ggf. erneute Auslegung → 9 Feststellungsbeschluss (FNP) bzw. Satzungsbeschluss (B-Plan) → 10 Genehmigung, falls nötig (fiktiv nach <b>3 Monaten</b>) → 11 Ausfertigung und Bekanntmachung. Dauer etwa 1 Jahr.` },
                { table: { head: ["Sonderverfahren", "Wann?", "Erleichterung"], rows: [
                  ["Vereinfacht (§ 13)", "Grundzüge der Planung unberührt, Lückenschließung", "kein Umweltbericht, keine frühzeitige Beteiligung, verkürzte Auslegung"],
                  ["Beschleunigt (§ 13a)", "Innenentwicklung, < 20.000 m² Grundfläche (bis 70.000 m² mit Vorprüfung)", "wie § 13. Unter 20.000 m² <b>keine Eingriffsregelung</b>"]
                ]}},
                { h: "Entwicklungsstufen von Land" },
                { table: { head: ["Stufe", "Auslöser", "Wert (zu baureifem Land)"], rows: [
                  ["Agrarland", "–", "< 10 %"],
                  ["Bauerwartungsland", "FNP", "25–50 %"],
                  ["Rohbauland", "B-Plan", "50–80 %"],
                  ["Baureifes Land", "Umlegung + Erschließung", "100 %"]
                ]}}
              ],
              tips: [
                { title: "Ziele vs. Grundsätze", body: R`Merksatz: <b>Ziele</b> muss man <b>beachten</b> (keine Abwägung möglich), <b>Grundsätze</b> muss man <b>berücksichtigen</b> (in die Abwägung einstellen, können überwunden werden).` },
                { title: "Planungshoheit", body: R`Warum plant die Gemeinde? Wegen der kommunalen Selbstverwaltung (Art. 28 II GG, Art. 11 II BV) mit der <b>Planungshoheit</b>.` }
              ],
              traps: [
                { title: "Falle: Regionalplan macht der Bezirk", body: R`Träger ist der <b>Regionale Planungsverband</b>. Die Bezirksregierung stellt nur den/die Regionsbeauftragte/n (fachliche Vorarbeit).` },
                { title: "Falle: FNP ist eine Satzung", body: R`Der FNP wird per einfachem Gemeinderatsbeschluss festgestellt (behördenverbindlich). Satzung ist nur der B-Plan.` }
              ],
              checks: [
                { type: "mc", q: "Wer ist Träger des Regionalplans in Bayern?", options: ["Bezirksregierung", "Regionaler Planungsverband", "Landratsamt", "Staatsministerium für Wirtschaft"], answer: 1, explain: "Der Regionale Planungsverband (alle Kommunen der Region). Die Regionsbeauftragten sitzen an der Bezirksregierung." },
                { type: "mc", q: "Was unterscheidet ein ZIEL von einem GRUNDSATZ im LEP?", options: ["Ziele sind Empfehlungen", "Ziele haben Beachtenspflicht, Grundsätze Berücksichtigungspflicht", "Grundsätze sind verbindlicher als Ziele", "Es gibt keinen Unterschied"], answer: 1, explain: "Ziele sind verbindlich, Grundsätze gehen in die Abwägung ein." },
                { type: "mc", q: "Für welchen Zeitraum plant ein Flächennutzungsplan typischerweise?", options: ["2–3 Jahre", "10–15 Jahre", "50 Jahre", "unbegrenzt"], answer: 1, explain: "Der FNP ist ein Zielplan für die nächsten 10–15 Jahre." },
                { type: "order", q: "Bringe das Aufstellungsverfahren eines B-Plans in die richtige Reihenfolge:", steps: ["Aufstellungsbeschluss", "Vorentwurf mit Umweltbericht", "Frühzeitige Beteiligung", "Billigungs- und Auslegungsbeschluss", "Öffentliche Auslegung (1 Monat)", "Satzungsbeschluss", "Ausfertigung und Bekanntmachung"], explain: "Die Abwägung liegt zwischen der Beteiligung und dem Beschluss. Die Genehmigung kommt nur, falls sie nötig ist." },
                { type: "mc", q: "Ein B-Plan der Innenentwicklung mit 15.000 m² Grundfläche im beschleunigten Verfahren (§ 13a). Brauchst du die Eingriffsregelung?", options: ["Ja, immer", "Nein, unter 20.000 m² entfällt sie", "Nur bei GRZ > 0,3", "Nur im Außenbereich"], answer: 1, explain: "Unter 20.000 m² Grundfläche entfällt im § 13a-Verfahren die Eingriffsregelung." },
                { type: "mc", q: "Welche Behörde ist die OBERSTE Landesplanungsbehörde in Bayern?", options: ["StMELF", "Staatsministerium für Wirtschaft, Landesentwicklung und Energie", "LDBV", "Bezirksregierung"], answer: 1, explain: "Das Wirtschaftsministerium. Das StMELF ist für die Ländliche Entwicklung zuständig." }
              ],
              sources: [
                "GoodNotes: 1. Städtebauliche Planung.pdf – Einführung, Planungsebenen, LEP, Regionalplan, Bauleitplanung, FNP",
                "GoodNotes: Mitschrift.pdf (Lernskript Städtebauliche Planung)",
                "iCloud: 2_Übungsaufgaben_Lösung.pdf (Aufgaben 1–9)",
                "E-Learning Kurs 33000: SBP 1–5"
              ]
            },
            /* ---------------------------------------------------------- */
            {
              id: "lm1-09-plan41-abschluss",
              title: "Wege- und Gewässerplan (§ 41), Flurbereinigungsplan & Abschluss",
              minutes: 5,
              xp: 110,
              tldr: R`Das ist die zweite Halbzeit der Flurneuordnung. Erst wird mit dem <b>Plan nach § 41</b> festgelegt, wo Wege, Gräben und Hecken hinkommen (Spielfeld bauen). Am Ende fasst der <b>Flurbereinigungsplan</b> alles zusammen, die <b>Ausführungsanordnung</b> setzt den neuen Rechtszustand in Kraft (Abpfiff, das Ergebnis zählt), und die <b>Schlussfeststellung</b> beendet das Verfahren.`,
              core: [
                { h: "Wege- und Gewässerplan mit landschaftspflegerischem Begleitplan (§ 41 FlurbG)" },
                { list: [
                  R`Plan über die <b>gemeinschaftlichen</b> (Wege, Gräben, Wasserrückhaltung, Bodenschutz, Landschaftspflege) und <b>öffentlichen</b> Anlagen (öffentlicher Verkehr, Ver- und Entsorgung, Erholung)`,
                  R`Aufgestellt von der <b>TG</b> (übertragene Aufgabe, Art. 2 AGFlurbG), geprüft vom <b>ALE</b> als oberer Flurbereinigungsbehörde`,
                  R`<b>Plangenehmigung</b> ohne Einwendungen · <b>Planfeststellung</b> bei Einwendungen (Abwägung, ggf. Auflagen)`,
                  R`Inhalt: <b>Karte</b> + <b>Textteil</b> (Erläuterungsbericht, Anlagen- und Maßnahmenverzeichnis)`
                ]},
                { p: R`Wasserwirtschaft früher: entwässern (Gräben, Dränagen). Seit 1984, als der Naturschutz per Volksentscheid in die Bayerische Verfassung kam: Wasser in der Fläche halten, Renaturierung, Uferstreifen, Hochwasserschutz.` },
                { h: "Bodenschutz: Allgemeine Bodenabtragsgleichung" },
                { math: R`A = R \cdot K \cdot L \cdot S \cdot C \cdot P` },
                { table: { head: ["Faktor", "Bedeutung", "beeinflussbar?"], rows: [
                  ["R", "Regen", "nein"],
                  ["K", "Bodenerodierbarkeit", "kaum"],
                  ["L", "Hanglänge", "über die Flurbereinigung (Schlaggestaltung)"],
                  ["S", "Hangneigung", "nein"],
                  ["C", "Bewirtschaftung, Fruchtfolge", "ja"],
                  ["P", "Erosionsschutz (quer zum Hang)", "ja"]
                ]}},
                { p: R`Ideal-Schlag: <b>≥ 10 ha</b>, Rechteck <b>4:1 bis 6:1</b>, keine spitzen Ecken, beidseitig erschlossen. Bodenneubildung ca. 0,1 mm/Jahr, deshalb ist Bodenabtrag irreversibel.` },
                { h: "Flurbereinigungsplan (§ 58 FlurbG)" },
                { p: R`Fasst <b>alle Ergebnisse</b> zusammen und ist die Grundlage zur Berichtigung von Kataster und Grundbuch. Kartenteil: Bestandskarte (alt), Karte zum Plan § 41, Abfindungskarte (neu). Nachweise: Forderungsliste, Abfindungs- und Belastungsnachweise. Textteil: Wertermittlung, Vorstandsbeschlüsse, <b>Kostenverteilungsplan</b>, Widmungen.` },
                { table: { head: ["Kosten", "Wer trägt?"], rows: [
                  ["Verfahrenskosten (§ 104), z. B. Personal des ALE", "Freistaat Bayern"],
                  ["Ausführungskosten (§ 105), z. B. Wegebau", "TG (mit Zuschüssen, Beiträgen der Teilnehmer, vorläufig €/ha alt, endgültig €/WVZ bzw. €/ha neu)"]
                ]}},
                { p: R`Bekanntmachung, jeder Teilnehmer bekommt einen Auszug (Einlage ↔ Abfindung) und eine Ladung zum <b>Anhörungstermin</b>. Widerspruch schriftlich innerhalb <b>14 Tagen</b> nach dem Termin.` },
                { h: "Ausführungsanordnung (§ 61) & Schlussfeststellung (§ 149)" },
                { list: [
                  R`Voraussetzung: Flurbereinigungsplan ist <b>unanfechtbar</b>. Ausnahme: vorzeitige Ausführungsanordnung (§ 63)`,
                  R`Am Stichtag tritt die Abfindung an die Stelle der Einlage (<b>Surrogation</b>). Grundbuch und Kataster werden unrichtig, das ALE ist so lange grundbuch- und katasterführende Behörde`,
                  R`Danach berichtigen Grundbuchamt und ADBV ihre Bücher (das Kataster geht schnell, das Grundbuch dauert)`,
                  R`<b>Schlussfeststellung</b> durch das ALE: alles berichtigt, gebaut, bezahlt. Die TG wird aufgelöst oder besteht weiter (oder die Gemeinde übernimmt), wenn noch Vermögen oder Schulden da sind`
                ]}
              ],
              tips: [
                { title: "Plangenehmigung vs. Planfeststellung", body: R`Gibt es Einwendungen? <b>Nein</b> → Plangenehmigung. <b>Ja</b> → Planfeststellung mit Abwägung. Beides macht das ALE.` },
                { title: "Unterlagen der Teilnehmer", body: R`Eigentümer-, Forderungs-, Abfindungs- und Belastungsnachweis sowie Kontoauszug.` }
              ],
              traps: [
                { title: "Falle: Eigentumswechsel mit Besitzeinweisung", body: R`Die vorläufige Besitzeinweisung (§ 65) gibt nur den <b>Besitz</b>. Das <b>Eigentum</b> wechselt erst mit der Ausführungsanordnung (§ 61).` },
                { title: "Falle: TG zahlt alles", body: R`Die Verfahrenskosten trägt der Freistaat, nur die Ausführungskosten trägt die TG.` }
              ],
              checks: [
                { type: "mc", q: "Gegen den Wege- und Gewässerplan wurden Einwendungen erhoben. Was erlässt das ALE?", options: ["Plangenehmigung", "Planfeststellungsbescheid", "Ausführungsanordnung", "Schlussfeststellung"], answer: 1, explain: "Bei Einwendungen gibt es eine Planfeststellung, ohne Einwendungen eine Plangenehmigung." },
                { type: "mc", q: "Wann geht das EIGENTUM an den neuen Grundstücken auf die Teilnehmer über?", options: ["Mit der vorläufigen Besitzeinweisung", "Mit dem Stichtag der Ausführungsanordnung", "Mit der Schlussfeststellung", "Mit der Wertermittlung"], answer: 1, explain: "Ausführungsanordnung (§ 61): Die Abfindung tritt an die Stelle der Einlage (Surrogation)." },
                { type: "mc", q: "Welche Faktoren der Bodenabtragsgleichung A = R·K·L·S·C·P kann der Landwirt direkt beeinflussen?", options: ["R und S", "C und P", "K und R", "Alle"], answer: 1, explain: "C (Bewirtschaftung) und P (Erosionsschutz) sind beeinflussbar. L nur über die Flurbereinigung." },
                { type: "mc", q: "Wer trägt die VERFAHRENSKOSTEN (§ 104 FlurbG)?", options: ["Die TG", "Der Freistaat Bayern", "Die Gemeinde", "Jeder Teilnehmer nach Fläche"], answer: 1, explain: "Verfahrenskosten trägt der Freistaat, Ausführungskosten (§ 105) die TG." },
                { type: "order", q: "Bringe den Verfahrensabschluss in die richtige Reihenfolge:", steps: ["Flurbereinigungsplan bekannt machen + Anhörungstermin", "Plan wird unanfechtbar", "Ausführungsanordnung (§ 61), neuer Rechtszustand", "Berichtigung von Grundbuch und Kataster", "Schlussfeststellung (§ 149)"], explain: "Plan → unanfechtbar → Ausführungsanordnung → Bücher berichtigen → Schlussfeststellung." },
                { type: "mc", q: "Wie lange haben Teilnehmer nach dem Anhörungstermin Zeit für einen Widerspruch gegen den Flurbereinigungsplan?", options: ["1 Woche", "14 Tage", "1 Monat", "3 Monate"], answer: 1, explain: "Schriftlich innerhalb 14 Tagen nach dem Anhörungstermin." }
              ],
              sources: [
                "GoodNotes: 3. Ländliche Neuordnung.pdf – Kap. 4 Plan nach § 41, Kap. 8 Flurbereinigungsplan, Kap. 9 Abschluss",
                "GoodNotes: Übungen.pdf – Übungsaufgabe 8 (Poppenlauer, Plan § 41)",
                "E-Learning Kurs 33000: LN 4. Plan nach § 41, 8. Flurbereinigungsplan und Abschluss"
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
