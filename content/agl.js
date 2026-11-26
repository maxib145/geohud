/* Ausgleichsrechnung – Interaktives Lernskript + Klausur-Cheatsheet
   Quellen: GoodNotes „Skript.pdf“ (V 7.00, Prof. Dr.-Ing. M. Müller, 130 S.), „Vorlesungsfolien.pdf“, „Übungen.pdf“;
   eLearning Kurs 4252 (Cheat Sheet v1.1, Übungs-Tipps, Kontrollergebnisse, Musterlösungen, Video-Tutorials). */
window.CONTENT = window.CONTENT || {};
(function(){
const R = String.raw;
CONTENT.agl = {
  title: "Ausgleichsrechnung",
  lead: "Methode der kleinsten Quadrate, Netzausgleichung, Datum, Statistik, Tests und Zuverlässigkeit – vom ersten Prinzip bis zum Klausur-Rechenweg.",
  sources: [
    "GoodNotes: 3. Semester/Ausgleichsrechnung/Skript.pdf (Vorlesungsskript V 7.00, Prof. Dr.-Ing. Markus Müller, auf Basis Hollmann)",
    "GoodNotes: Vorlesungsfolien.pdf (Folien 01 Einleitung, 02 MdkQ) mit Mitschrift",
    "GoodNotes: Übungen.pdf (UE01–UE05)",
    "eLearning Kurs 4252: AGL Cheat Sheet v1.1, Übungs-Tipps (Lektionen), Kontrollergebnisse, Musterlösungen, Video-Tutorials (Excel, CAPLAN)"
  ],
  chapters: []
};
const AGL = CONTENT.agl.chapters;

/* ───────────── Kapitel 1 ───────────── */
AGL.push({
  id: "k1", title: "Aufgabe und Grundprinzip der Ausgleichung",
  intro: "Warum man überhaupt „ausgleicht“: Sobald mehr gemessen wird als nötig, widersprechen sich die Messungen ein wenig. Die Ausgleichung macht daraus eine eindeutige, beste Lösung – und sagt zusätzlich, wie genau und wie zuverlässig sie ist.",
  sources: ["Skript Kap. 1 (S. 7–9)", "Vorlesungsfolien 01 Einleitung"],
  blocks: [
    { h3: "Worum geht es?" },
    { p: "Aus <b>Beobachtungen</b> (Messungen: Strecken, Richtungen, Höhenunterschiede …) sollen <b>Unbekannte</b> (Koordinaten, Höhen, Instrumentenparameter …) bestimmt werden. Beispiel aus dem Skript: Der Neupunkt N wird über 5 gemessene Horizontalstrecken zu den Festpunkten 101–105 bestimmt (überbestimmter Bogenschnitt). Für $y_N, x_N$ würden 2 Strecken reichen – 3 Strecken sind also <b>überzählig</b>." },
    { p: "Die Ausgleichungsrechnung beantwortet vier Fragen:" },
    { olist: [
      "<b>Schätzung</b> der „besten“ Werte der Unbekannten.",
      "<b>Genauigkeit</b>: Wie genau wurde gemessen? Wie genau ist das Ergebnis?",
      "<b>Zuverlässigkeit</b>: Können grobe Fehler aufgedeckt werden, und wie wirken sie sich aus?",
      "<b>Planung</b>: Wie genau muss ich messen, um eine geforderte Ergebnisgenauigkeit zu erreichen?"
    ]},
    { callout: "def", title: "Schätzung", body: "„Schätzen“ heißt hier nicht „über den Daumen peilen“, sondern: Werte der Unbekannten mit statistischen Methoden aus fehlerbehafteten Messungen bestimmen. Ergebnis ist ein <b>Schätzwert</b> (Dach-Symbol $\\hat{X}$), nicht der wahre Wert $\\tilde X$." },
    { h3: "Verbesserungen" },
    { p: "Jede Messung ist mit kleinen zufälligen Abweichungen behaftet. Zwei verschiedene Streckenpaare liefern daher leicht verschiedene Koordinaten – die Lösung ist <i>nicht konsistent</i>. Deshalb bekommt jede Beobachtung eine <b>Verbesserung</b> $v_i$:" },
    { formula: R`\hat L_i = L_i + v_i \qquad\Longleftrightarrow\qquad v_i = \hat L_i - L_i`, vars: ["$L_i$ – Messung (Beobachtung)", "$v_i$ – Verbesserung", "$\\hat L_i$ – ausgeglichene Beobachtung"] },
    { callout: "trap", title: "Vorzeichen", body: "Verbesserung = <b>ausgeglichen minus gemessen</b> ($v=\\hat L-L$), nicht umgekehrt. Die Verbesserung ist das, was man zur Messung <i>addieren</i> muss. Ein Vorzeichendreher zieht sich durch Schlussprobe und Ausreißertest." },
    { h3: "Die Zielfunktion – Methode der kleinsten Quadrate" },
    { p: "Mit den Verbesserungen hat man mehr Unbekannte als Gleichungen. Es braucht eine <b>zusätzliche Bedingung</b>. Gauß und Legendre (unabhängig, an astronomischen Problemen) erkannten: Die wahrscheinlichsten Werte ergeben sich, wenn die <b>Quadratsumme der Verbesserungen minimal</b> wird (L2-Norm):" },
    { formula: R`\Omega = L_2 = \sum_{i=1}^{n} v_i^2 \;\rightarrow\; \min`, vars: ["$\\Omega$ – Verbesserungsquadratsumme (globales Fehlermaß)", "$n$ – Anzahl Beobachtungen"] },
    { p: "Andere Zielfunktionen sind möglich, spielen in der Netzausgleichung aber nur eine Nebenrolle (Kap. 8):" },
    { table: { head: ["Norm", "Zielfunktion", "Eigenschaft"], rows: [
      ["L2 (Gauß)", "$\\sum v_i^2\\to\\min$", "Standard; analytisch lösbar; liefert Genauigkeiten; empfindlich gegen Ausreißer"],
      ["L1", "$\\sum |v_i|\\to\\min$", "robust gegen grobe Fehler; nur iterativ / Optimierung"],
      ["L∞ (Tschebyscheff)", "$\\max|v_i|\\to\\min$", "minimiert den größten Widerspruch"]
    ]}},
    { callout: "merke", body: "<b>Ausgleichen = Unbekannte so wählen, dass $\\sum v^2$ minimal wird.</b> Bei ungleich genauen Beobachtungen wird die <i>gewichtete</i> Summe $v^TPv$ minimiert (Kap. 2)." },
    { h3: "Ausgleichung durch „Probieren“ – das Suchgitter" },
    { p: "Das Prinzip lässt sich ohne jede Formel zeigen: Man legt um einen Näherungspunkt ein Gitter (hier 1 mm Maschenweite, je 21 Werte für y und x → 441 Kombinationen). Für jede Kombination rechnet man die 5 Strecken $\\hat s_i$ aus Koordinaten, die Verbesserungen $v_i=\\hat s_i-s_i$ und $\\Omega$. Das Minimum liegt bei" },
    { math: R`y_N = 1169.292,\quad x_N = 2842.786,\quad \Omega_{\min}\approx 424\ \text{mm}^2` },
    { p: "Die strenge Lösung aus Kap. 2 ergibt $\\hat y_N = 1169.2918$, $\\hat x_N = 2842.7863$ – das Gitter trifft sie auf den mm genau. Das Verfahren funktioniert für jede Zielfunktion, ist aber viel zu rechenaufwendig für echte Netze. Daher leitet man in Kap. 2 einen direkten Algorithmus her." },
    { table: { head: ["Strecke", "gemessen [m]", "Festpunkt y", "Festpunkt x"], rows: [
      ["N–101", "238.690", "941.6250", "2914.4660"],
      ["N–102", "307.704", "1115.5680", "3145.7710"],
      ["N–103", "193.997", "1354.6020", "2900.1430"],
      ["N–104", "240.986", "1285.3030", "2631.5510"],
      ["N–105", "264.179", "1054.5040", "2604.8580"]
    ]}},
    { callout: "info", title: "Nachgerechnet", body: "Mit der strengen Lösung ergeben sich $v = (-5.8;\\ 6.8;\\ -13.3;\\ 9.8;\\ -8.4)$ mm, $\\Omega = 423.8$ mm² und $s_0=\\sqrt{\\Omega/(5-2)} \\approx 11.9$ mm." },
    { quiz: [
      { type: "mc", q: "Wie viele Überbestimmungen (Redundanz) hat der Bogenschnitt mit 5 Strecken und Unbekannten $y_N, x_N$?", options: ["3", "2", "5", "7"], answer: 0, explain: "$r = n - u = 5 - 2 = 3$." },
      { type: "mc", q: "Welche Definition der Verbesserung ist richtig?", options: ["$v = \\hat L - L$", "$v = L - \\hat L$", "$v = L - L^0$", "$v = \\hat X - X^0$"], answer: 0, explain: "Ausgeglichen = gemessen + Verbesserung, also $v=\\hat L-L$. $L-L^0$ ist die gekürzte Beobachtung $l$." },
      { type: "mc", q: "Warum nutzt man in der Praxis nicht das Suchgitter?", options: ["Rechenaufwand explodiert mit der Zahl der Unbekannten", "Es findet nicht das Minimum", "Es funktioniert nur für die L1-Norm", "Es liefert falsche Vorzeichen"], answer: 0, explain: "Bei u Unbekannten und k Gitterwerten sind $k^u$ Kombinationen nötig." }
    ]}
  ]
});

/* ───────────── Kapitel 2.1 ───────────── */
AGL.push({
  id: "k2", title: "Vermittelnde Ausgleichung (Gauß-Markov-Modell)",
  intro: "Das Herzstück der Vorlesung: Jede Beobachtung wird als Funktion der Unbekannten geschrieben, linearisiert und über die Normalgleichungen gelöst. Daraus folgen Unbekannte, Verbesserungen, $s_0$ und alle Kofaktormatrizen.",
  sources: ["Skript Kap. 2.1 (S. 10–24)", "Vorlesungsfolien 02 MdkQ (Folien 9–11 Herleitung)", "Übung 01 Additionskonstante", "AGL Cheat Sheet v1.1 (12-Schritte-Standardpfad)"],
  blocks: [
    { h3: "Idee: Beobachtung = Funktion der Unbekannten" },
    { p: "„Vermittelnd“ heißt: Jede Beobachtung $L_i$ lässt sich als Funktion $\\varphi_i$ der Unbekannten schreiben. Die ausgeglichene Beobachtung ist dann genau die Funktion der ausgeglichenen Unbekannten:" },
    { formula: R`\hat L = L + v = \varphi(\hat X)`, vars: ["$\\varphi$ – funktionales Modell (z. B. Strecke aus Koordinaten)", "$\\hat X$ – ausgeglichene Unbekannte"] },
    { callout: "def", title: "Funktionales und stochastisches Modell", body: "<p><b>Funktionales Modell</b>: Wie hängen Beobachtungen und Unbekannte zusammen? → Beobachtungsgleichungen, A-Matrix.</p><p><b>Stochastisches Modell</b>: Wie genau sind die Beobachtungen und wie korreliert? → $\\Sigma_{LL}$, $Q_{LL}$, $P$. Beides muss <i>vor</i> der Ausgleichung feststehen.</p>" },
    { h3: "Linearisierung mit Näherungswerten" },
    { p: "$\\varphi$ ist meist nichtlinear (Strecken, Richtungen). Darum wird um <b>Näherungswerte</b> $X^0$ linearisiert (Taylor, Abbruch nach dem linearen Glied):" },
    { math: R`\hat X = X^0 + \hat x \quad\Rightarrow\quad \hat L = \varphi(X^0) + \left.\frac{\partial\varphi}{\partial X}\right|_{X^0}\hat x = L^0 + A\,\hat x` },
    { formula: R`A_{(n,u)} = \left.\frac{\partial \varphi(X)}{\partial X}\right|_{X=X^0}, \qquad l = L - L^0 = L - \varphi(X^0)`, vars: ["$A$ – Konfigurations-/Designmatrix: Zeile = Beobachtung, Spalte = Unbekannte", "$l$ – gekürzter Beobachtungsvektor (gemessen minus genähert)", "$\\hat x$ – gekürzte Unbekannte (Zuschläge zu $X^0$)", "$L^0$ – genäherte Beobachtungen"] },
    { p: "Setzt man alles in $\\hat L = L+v$ ein, entsteht die zentrale <b>Verbesserungsgleichung</b>:" },
    { formula: R`v = A\,\hat x - l` },
    { steps: { title: "Herleitung der Verbesserungsgleichung", task: "Zeige: aus $\\hat L = L + v$ und der Linearisierung folgt $v = A\\hat x - l$.", steps: [
      { t: "Ausgeglichene Beobachtung linearisieren", b: R`$\hat L = L^0 + A\hat x$` },
      { t: "Gleichsetzen mit der Definition", b: R`$L + v = L^0 + A\hat x$` },
      { t: "Nach $v$ umstellen", b: R`$v = A\hat x - (L - L^0)$` },
      { t: "Gekürzte Beobachtung einsetzen", b: R`$l = L - L^0 \;\Rightarrow\; \boxed{v = A\hat x - l}$` }
    ]}},
    { h3: "Herleitung der Normalgleichungen (gleichgenau)" },
    { p: "Gesucht ist das $\\hat x$, das $\\Omega = v^Tv$ minimiert. Das ist eine Extremwertaufgabe: erste Ableitung null setzen." },
    { steps: { title: "Vom Minimum zu den Normalgleichungen", task: "Minimiere $\\Omega = v^T v$ mit $v = A\\hat x - l$.", steps: [
      { t: "Einsetzen", b: R`$\Omega = (A\hat x - l)^T(A\hat x - l) = \hat x^TA^TA\hat x - \hat x^TA^Tl - l^TA\hat x + l^Tl$` },
      { t: "Skalare zusammenfassen", b: R`$\hat x^TA^Tl$ und $l^TA\hat x$ sind $1\times1$-Matrizen, also gleich ihrer Transponierten: $\Omega = \hat x^TA^TA\hat x - 2\hat x^TA^Tl + l^Tl$` },
      { t: "Ableiten", b: R`$d\Omega = 2\,d\hat x^T\,(A^TA\hat x - A^Tl)$` },
      { t: "Null setzen", b: R`$A^TA\,\hat x - A^Tl = 0 \;\Rightarrow\; \underbrace{A^TA}_{N}\,\hat x = \underbrace{A^Tl}_{n}$` },
      { t: "Lösen", b: R`$\hat x = N^{-1}n = (A^TA)^{-1}A^Tl$` }
    ]}},
    { p: "Allgemein (ungleich genau, mit Gewichtsmatrix $P$) wird $v^TPv\\to\\min$, und es entsteht:" },
    { formula: R`N = A^TPA,\qquad n = A^TPl,\qquad \hat x = N^{-1}n = Q\,n`, vars: ["$N$ – Normalgleichungsmatrix (u×u, symmetrisch)", "$n$ – Absolutglied (u×1) – nicht verwechseln mit der Anzahl n der Beobachtungen", "$Q = N^{-1}$ – Kofaktormatrix der Unbekannten"] },
    { h3: "Stochastisches Modell: Varianzen, Kofaktoren, Gewichte" },
    { formula: R`\Sigma_{LL} = \sigma_0^2\,Q_{LL},\qquad P = Q_{LL}^{-1} = \sigma_0^2\,\Sigma_{LL}^{-1},\qquad p_{ii} = \frac{\sigma_0^2}{\sigma_i^2}`, vars: ["$\\Sigma_{LL}$ – Varianz-Kovarianz-Matrix der Beobachtungen [Einheit²]", "$\\sigma_0^2$ – Varianz der Gewichtseinheit (a priori frei wählbar, z. B. 1 mm²)", "$Q_{LL}$ – Kofaktormatrix (Genauigkeits<i>relationen</i>)", "$p_{ii}$ – Gewicht (einheitenlos, wenn $\\sigma_0$ und $\\sigma_i$ gleiche Einheit)"] },
    { p: "Ohne Korrelationen ist $\\Sigma_{LL}$ – und damit $P$ – eine Diagonalmatrix. Sind zusätzlich alle Beobachtungen gleich genau, gilt $\\Sigma_{LL}=\\sigma_L^2E$ und $P=E$ (mit $\\sigma_0=\\sigma_L$)." },
    { callout: "trap", title: "Gewicht = Kehrwert der Varianz", body: "Genauere Messung → kleinere Varianz → <b>größeres</b> Gewicht. $p_i = \\sigma_0^2/\\sigma_i^2$, nicht $\\sigma_i^2/\\sigma_0^2$. Und: Quadrat nicht vergessen – doppelte Standardabweichung = ein Viertel des Gewichts." },
    { h3: "Der komplette Algorithmus" },
    { recipe: { title: "Vermittelnde Ausgleichung – Standardpfad", steps: [
      "Näherungswerte $X^0$ festlegen (aus VTR-Rechnung; bei linearen Aufgaben beliebig, z. B. $X^0=0$).",
      "Genäherte Beobachtungen $L^0=\\varphi(X^0)$ und gekürzte Beobachtungen $l=L-L^0$.",
      "A-Matrix aus den partiellen Ableitungen bei $X^0$.",
      "Gewichtsmatrix $P$ aus dem stochastischen Modell.",
      "Normalgleichungen: $N=A^TPA$, $n=A^TPl$.",
      "Invertieren: $Q=N^{-1}$ (nur bei regulärem $N$; sonst freie Netzausgleichung, Kap. 3).",
      "Unbekannte: $\\hat x=Qn$, $\\hat X=X^0+\\hat x$.",
      "Verbesserungen $v=A\\hat x-l$, ausgeglichene Beobachtungen $\\hat L=L+v$.",
      "Kontrolle: $A^TPv = 0$.",
      "$\\Omega=v^TPv$, Freiheitsgrad $f=n-u+d$, $s_0=\\sqrt{\\Omega/f}$.",
      "Kofaktoren: $Q_{\\hat X\\hat X}=Q$, $Q_{\\hat L\\hat L}=AQA^T$, $Q_{vv}=Q_{LL}-AQA^T$.",
      "Schlussprobe $\\hat L \\overset{!}{=} \\varphi(\\hat X)$; falls verletzt: mit $\\hat X$ als neuen Näherungen iterieren."
    ]}},
    { formula: R`\Omega = v^TPv,\qquad f = n - u + d,\qquad s_0 = \sqrt{\frac{\Omega}{f}}`, vars: ["$f$ – Freiheitsgrad = Redundanz $r$", "$d$ – Datumsdefekt (nur freie Netzausgleichung, sonst 0)", "$s_0$ – a-posteriori Standardabweichung der Gewichtseinheit (Einheit wie $\\sigma_0$)"] },
    { formula: R`\Sigma_{\bullet\bullet} = \sigma_0^2\,Q_{\bullet\bullet}\ \ (\text{a priori}),\qquad K_{\bullet\bullet} = s_0^2\,Q_{\bullet\bullet}\ \ (\text{a posteriori})`, vars: ["a priori bei kleiner Redundanz und guten Erfahrungswerten", "a posteriori ($s_0$) bei großer Redundanz"] },
    { callout: "merke", body: "Zwei Kontrollen gehören in jede Klausurlösung: <b>$A^TPv=0$</b> (prüft Normalgleichungslösung) und <b>Schlussprobe $\\hat L=\\varphi(\\hat X)$</b> (prüft zusätzlich A-Matrix und Linearisierung)." },
    { h3: "Fehlerfortpflanzung: warum Q = N⁻¹" },
    { steps: { title: "Kofaktormatrix der Unbekannten", task: "Zeige $\\Sigma_{\\hat X\\hat X} = \\sigma_L^2 N^{-1}$ für gleichgenaue, unabhängige Beobachtungen.", steps: [
      { t: "Lineare Funktion der Beobachtungen", b: R`$\hat x = F\,l$ mit $F = (A^TA)^{-1}A^T$` },
      { t: "Varianzfortpflanzung", b: R`$\Sigma_{\hat X\hat X} = F\,\Sigma_{LL}\,F^T$, $\Sigma_{LL} = \sigma_L^2E$` },
      { t: "Einsetzen", b: R`$= (A^TA)^{-1}A^T\,A\,(A^TA)^{-1}\sigma_L^2$ (N symmetrisch ⇒ $(N^{-1})^T=N^{-1}$)` },
      { t: "Kürzen", b: R`$= (A^TA)^{-1}\sigma_L^2 = N^{-1}\sigma_L^2$` }
    ]}},
    { h3: "Beispiel: Additionskonstante (Übung 01)" },
    { p: "Eine Strecke ist in 3 Teilstrecken $X_1, X_2, X_3$ geteilt. Gemessen werden alle 6 Kombinationen mit einem Distanzmesser, der eine unbekannte <b>Additionskonstante</b> $a$ hat. Unbekannte: $X_1,X_2,X_3,a$ ($u=4$), $n=6$, also $f=2$. Alle Strecken gleich genau." },
    { math: R`\begin{aligned} S_{12}+v_1 &= \hat X_1 - \hat a & S_{23}+v_4 &= \hat X_2 - \hat a\\ S_{13}+v_2 &= \hat X_1+\hat X_2 - \hat a & S_{24}+v_5 &= \hat X_2+\hat X_3 - \hat a\\ S_{14}+v_3 &= \hat X_1+\hat X_2+\hat X_3 - \hat a & S_{34}+v_6 &= \hat X_3 - \hat a \end{aligned}` },
    { steps: { title: "Additionskonstante komplett", task: "L = (15.299; 31.496; 43.882; 16.234; 28.618; 12.421) m. Näherung $X^0 = (S_{12}, S_{23}, S_{34}, 0)$. Rechne in mm.", steps: [
      { t: "Gekürzte Beobachtungen $l=L-AX^0$", b: R`$l = (0;\ -37;\ -72;\ 0;\ -37;\ 0)^T$ mm` },
      { t: "A-Matrix (linear → nur ±1, 0)", b: R`$A=\begin{pmatrix}1&0&0&-1\\1&1&0&-1\\1&1&1&-1\\0&1&0&-1\\0&1&1&-1\\0&0&1&-1\end{pmatrix}$` },
      { t: "Normalgleichungen", b: R`$N=A^TA=\begin{pmatrix}3&2&1&-3\\2&4&2&-4\\1&2&3&-3\\-3&-4&-3&6\end{pmatrix}$, $\ n=A^Tl=(-109;\,-146;\,-109;\,146)^T$` },
      { t: "Inverse", b: R`$Q=N^{-1}=\begin{pmatrix}0.75&0&0.25&0.5\\0&0.75&0&0.5\\0.25&0&0.75&0.5\\0.5&0.5&0.5&1\end{pmatrix}$` },
      { t: "Unbekannte", b: R`$\hat x=Qn=(-36.0;\,-36.5;\,-36.0;\,-36.0)$ mm $\Rightarrow \hat X = (15.2630;\ 16.1975;\ 12.3850;\ -0.0360)$ m` },
      { t: "Verbesserungen", b: R`$v=A\hat x-l=(0;\ 0.5;\ -0.5;\ -0.5;\ 0.5;\ 0)$ mm, $\Omega=1.0$ mm², $s_0=\sqrt{1/2}=0.71$ mm` },
      { t: "Genauigkeit (a priori $\sigma_S=1$ mm)", b: R`$\sigma_{X_i}=1\cdot\sqrt{0.75}=0.87$ mm, $\ \sigma_a=1\cdot\sqrt{1.00}=1.0$ mm` }
    ]}},
    { callout: "info", title: "Lineare Aufgaben", body: "Bei linearen Beobachtungsgleichungen (A enthält nur Konstanten) sind die Näherungswerte beliebig – auch $X^0=0$. Es ist keine Iteration nötig. Sinnvolle Näherungen halten die Zahlen in $l$ aber klein und gut kontrollierbar." },
    { quiz: [
      { type: "gap", q: "Additionskonstante: Wie groß ist der Freiheitsgrad f?", answer: 2, tol: 0, explain: "$f=n-u=6-4=2$." },
      { type: "mc", q: "Welche Dimension hat $N=A^TPA$ bei n = 6 Beobachtungen und u = 4 Unbekannten?", options: ["4×4", "6×6", "6×4", "4×6"], answer: 0, explain: "$(u\\times n)(n\\times n)(n\\times u)=u\\times u$." },
      { type: "bug", q: "Finde den fehlerhaften Schritt:", lines: ["l = L - φ(X0)", "N = A^T P A,  n = A^T P l", "x̂ = N^-1 · n", "v = l - A·x̂", "s0 = sqrt(v^T P v / (n - u))"], answer: 3, explain: "Richtig ist $v = A\\hat x - l$. Mit $l - A\\hat x$ dreht sich jedes Vorzeichen um." },
      { type: "order", q: "Bringe den Standardpfad in die richtige Reihenfolge:", steps: ["Näherungswerte X⁰", "l = L − L⁰", "A-Matrix und P", "N, n bilden", "Q = N⁻¹, x̂ = Qn", "v = Ax̂ − l", "s₀ und Kofaktoren", "Schlussprobe"] }
    ]}
  ]
});

/* ───────────── Kapitel 2.2/2.3 ───────────── */
AGL.push({
  id: "k3", title: "Geodätische Netze: Höhen-, Strecken-, Richtungsnetz",
  intro: "Dieselbe Rechenmaschine, angewandt auf die drei klassischen Netztypen. Der Unterschied steckt nur in zwei Dingen: Wie sieht eine Zeile der A-Matrix aus, und wie werden die Gewichte gebildet?",
  sources: ["Skript Kap. 2.2–2.3 (S. 25–39)", "Übung 01 (Höhennetz), Übung 02 (kombiniertes Netz), Übung 03 (Prognose mit Excel), Übung 05a (CAPLAN)", "eLearning: Tipps & Kontrollergebnisse UE01–UE03, Video-Tutorials Excel/CAPLAN"],
  blocks: [
    { h3: "Überblick: Zeilen der A-Matrix" },
    { table: { head: ["Beobachtung", "Funktionales Modell", "Ableitung nach Standpunkt i", "nach Zielpunkt k", "Gewicht"], rows: [
      ["Höhenunterschied $\\Delta h_{ik}$", "$h_k - h_i$", "$-1$", "$+1$", "$p=\\sigma_0^2/(\\sigma_{1km}^2 S_{km})$"],
      ["Strecke $S_{ik}$", "$\\sqrt{\\Delta y^2+\\Delta x^2}$", "$-\\frac{\\Delta y}{S},\\ -\\frac{\\Delta x}{S}$", "$+\\frac{\\Delta y}{S},\\ +\\frac{\\Delta x}{S}$", "$\\sigma_S=A+B\\cdot S$"],
      ["Richtung $r_{ik}$ [gon]", "$t_{ik}-o_i$", "$-\\rho\\frac{\\Delta x}{S^2},\\ +\\rho\\frac{\\Delta y}{S^2}$", "$+\\rho\\frac{\\Delta x}{S^2},\\ -\\rho\\frac{\\Delta y}{S^2}$", "$\\sigma_r=$ konst."]
    ]}},
    { callout: "merke", body: "<b>Festpunkte bekommen keine Spalte.</b> Nur Neupunkte (und Orientierungen) sind Unbekannte. Taucht ein Festpunkt in einer Beobachtung auf, steht sein fester Wert in $L^0$, nicht in $A$." },

    { h3: "Höhennetz mit Nivellement" },
    { p: "Netz mit den Festpunkten HFP1 = 225.345 m und HFP2 = 231.489 m, Neupunkten N1, N2, N3 und 8 Höhenunterschieden. $n=8$, $u=3$, $d=0$ → $f=5$." },
    { table: { head: ["Beob.", "von", "nach", "Δh [m]", "S [km]"], rows: [
      ["L1","N1","HFP2","21.707","1.9"],["L2","HFP1","N1","−15.565","2.5"],["L3","HFP2","N2","−1.005","2.2"],["L4","N2","HFP1","−5.137","1.7"],
      ["L5","N1","N3","12.982","1.4"],["L6","N3","N2","7.715","1.6"],["L7","HFP1","N3","−2.573","2.0"],["L8","N3","HFP2","8.720","0.9"]
    ]}},
    { p: "<b>Stochastisches Modell:</b> Die Varianz eines Nivellements wächst linear mit dem Weg: $\\sigma_{\\Delta h}^2=\\sigma_{1km}^2\\cdot S_{km}$. Wählt man $\\sigma_0=\\sigma_{1km}$ (mittlerer Kilometerfehler), werden die Gewichte einfach $p_i=1/S_i$ – und $s_0$ ist direkt der geschätzte Kilometerfehler." },
    { callout: "trap", title: "Nivellement-Gewicht", body: "Beim Nivellement ist die <b>Varianz</b> proportional zur Strecke, nicht die Standardabweichung. Also $p=1/S$, nicht $p=1/S^2$. Bei Distanzmessung (σ = A + B·S) dagegen $p=\\sigma_0^2/\\sigma_S^2$ mit Quadrat." },
    { steps: { title: "Höhennetz Schritt für Schritt", task: "Berechne Höhen, $s_0$ und Standardabweichungen.", steps: [
      { t: "Näherungshöhen aus L1, L3, L7", b: R`$H^0_{N1}=231.489-21.707=209.782$, $H^0_{N2}=231.489-1.005=230.484$, $H^0_{N3}=225.345-2.573=222.772$ m` },
      { t: "A-Matrix (Neupunkt als Ziel +1, als Start −1)", b: R`Zeilen: L1 $(-1,0,0)$, L2 $(1,0,0)$, L3 $(0,1,0)$, L4 $(0,-1,0)$, L5 $(-1,0,1)$, L6 $(0,1,-1)$, L7 $(0,0,1)$, L8 $(0,0,-1)$` },
      { t: "Gekürzte Beobachtungen", b: R`$l=(0;\,-2;\,0;\,2;\,-8;\,3;\,0;\,3)$ mm (L1, L3, L7 sind 0, weil sie die Näherungen geliefert haben)` },
      { t: "Gewichte $p=1/S$", b: R`$P=\mathrm{diag}(0.526;\,0.400;\,0.455;\,0.588;\,0.714;\,0.625;\,0.500;\,1.111)$` },
      { t: "Normalgleichungen", b: R`$N=\begin{pmatrix}1.6406&0&-0.7143\\0&1.6678&-0.6250\\-0.7143&-0.6250&2.9504\end{pmatrix}$, $n=(4.914;\,0.699;\,-10.923)$` },
      { t: "Lösung", b: R`$\hat x=(1.45;\,-0.91;\,-3.54)$ mm ⇒ $\hat H=(209.7835;\ 230.4831;\ 222.7685)$ m` },
      { t: "Verbesserungen und Kontrolle", b: R`$v=(-1.5;\,3.5;\,-0.9;\,-1.1;\,3.0;\,-0.4;\,-3.5;\,0.5)$ mm, $A^TPv=0$ ✓` },
      { t: "Genauigkeit", b: R`$\Omega=20.09$ mm², $s_0=\sqrt{20.09/5}=2.0$ mm (pro km), $s_{H}=s_0\sqrt{q_{ii}}=1.7;\ 1.6;\ 1.3$ mm` }
    ]}},
    { callout: "info", title: "Kleine Redundanz", body: "In Höhennetzen ist die Redundanz oft klein. Liegen viele Zwischenpunkte auf einer Linie, werden alle Verbesserungen klein und täuschen hohe Genauigkeit vor. Aussagekräftiger sind dann die <b>Schleifenwidersprüche</b>." },

    { h3: "Lagenetz mit Strecken" },
    { p: "Neupunkte N1, N2, Festpunkte FP1–FP3, 7 Strecken. $n=7$, $u=4$ (2 Punkte × 2 Koordinaten), $f=3$. Genauigkeit $\\sigma_S=2\\,\\text{mm}+5\\,\\text{ppm}$, $\\sigma_0=1$ mm." },
    { formula: R`\frac{\partial S_{ik}}{\partial y_k} = \frac{\Delta y_{ik}}{S_{ik}} = \sin t_{ik},\qquad \frac{\partial S_{ik}}{\partial x_k} = \frac{\Delta x_{ik}}{S_{ik}} = \cos t_{ik},\qquad \frac{\partial S_{ik}}{\partial y_i} = -\sin t_{ik},\ \ \frac{\partial S_{ik}}{\partial x_i} = -\cos t_{ik}`, vars: ["$\\Delta y_{ik}=y_k-y_i$, $\\Delta x_{ik}=x_k-x_i$ – aus Näherungskoordinaten", "$S_{ik}$ – aus Näherungskoordinaten <i>gerechnete</i> Strecke", "Einheit der Koeffizienten: [1] (m/m)"] },
    { steps: { title: "Eine Zeile aufstellen: L1 = N1 → FP1", task: "Näherung N1 = (5361.80; 1512.40), FP1 = (5693.721; 1097.779), gemessen 531.118 m.", steps: [
      { t: "Koordinatendifferenzen", b: R`$\Delta y=331.921$, $\Delta x=-414.621$` },
      { t: "Gerechnete Strecke", b: R`$S^0=\sqrt{331.921^2+414.621^2}=531.1140$ m` },
      { t: "Gekürzte Beobachtung", b: R`$l=531.118-531.1140=+4.0$ mm` },
      { t: "Koeffizienten (N1 ist Standpunkt → negativ)", b: R`$a_{y_{N1}}=-\Delta y/S=-0.6250$, $a_{x_{N1}}=-\Delta x/S=+0.7807$` },
      { t: "Gewicht", b: R`$\sigma_S=2+5\cdot0.531=4.66$ mm, $\sigma_S^2=21.67$ mm², $p=1/21.67=0.0461$` }
    ]}},
    { callout: "info", title: "Nachgerechnet (Skript rechnet nicht zu Ende)", body: "Nach Iteration: N1 = (5361.8136; 1512.4176), N2 = (5261.4506; 1753.9872); $v=(1.3;\\,-3.8;\\,-7.8;\\,-13.4;\\,-2.9;\\,-1.7;\\,3.6)$ mm, $\\Omega=9.51$, $s_0=1.78$ (dimensionslos, da $\\sigma_0=1$ mm) → die angenommene Genauigkeit war etwas zu optimistisch." },

    { h3: "Lagenetz mit Richtungen" },
    { p: "Ein Theodolit misst <b>Richtungen</b> $r$, bezogen auf die zufällige Nullstellung des Teilkreises. Den Bezug zur x-Achse liefert pro Standpunkt eine <b>Orientierungsunbekannte</b> $o_i$:" },
    { formula: R`r_{ik} = t_{ik} - o_i,\qquad t_{ik} = \arctan\frac{y_k - y_i}{x_k - x_i}`, vars: ["$t_{ik}$ – Richtungswinkel (von +x im Uhrzeigersinn)", "$o_i$ – Orientierung: Richtungswinkel der Teilkreis-Nullrichtung", "eine $o$ pro Teilkreisorientierung (pro Standpunkt/Satz)"] },
    { formula: R`\frac{\partial r_{ik}}{\partial y_k} = +\rho\frac{\Delta x_{ik}}{S_{ik}^2},\quad \frac{\partial r_{ik}}{\partial x_k} = -\rho\frac{\Delta y_{ik}}{S_{ik}^2},\quad \frac{\partial r_{ik}}{\partial y_i} = -\rho\frac{\Delta x_{ik}}{S_{ik}^2},\quad \frac{\partial r_{ik}}{\partial x_i} = +\rho\frac{\Delta y_{ik}}{S_{ik}^2},\quad \frac{\partial r_{ik}}{\partial o_i} = -1`, vars: ["$\\rho = 200/\\pi$ gon (63.662) – macht aus rad gon", "mit $l$ in mgon und $\\hat x$ in mm: Faktor $\\rho\\cdot10^{-3}$ … Einheiten [mgon/mm]", "Orientierungsspalte immer −1"] },
    { callout: "trap", title: "ρ und Einheiten", body: "Die Ableitungen gelten zunächst in <b>rad/m</b>. Rechnest du Richtungen in gon, multiplizierst du die Koordinaten-Koeffizienten mit $\\rho=200/\\pi$ – die Orientierungsspalte (−1) bleibt unverändert. Typischer Klausurpunkt: $l$ in mgon und $\\hat x$ in mm ⇒ Koeffizienten in mgon/mm (Beispiel: −0.0764)." },
    { p: "Beispiel: Neupunkt N, Festpunkte F1–F3, auf allen 4 Standpunkten je 3 Richtungen. $n=12$, $u=2+4=6$, $f=6$, $\\sigma_r=\\sigma_0=3$ mgon ⇒ $P=E$." },
    { steps: { title: "Richtungsnetz – vom Ansatz zum Ergebnis", task: "Näherungen N = (3 499 551.50; 5 199 436.70), $o^0=(13.99;\\,72.98;\\,115.98;\\,223.89)$ gon.", steps: [
      { t: "Näherung für $o$", b: R`$o_i^0 = t_{ik}^0 - r_{ik}$ für eine Zielung, z. B. $o_1^0 = t_{F1,F2}-r_{F1,F2}=142.1813-128.1980=13.98$ gon` },
      { t: "Gekürzte Beobachtung", b: R`$l=r-(t^0-o^0)$, z. B. L1: $128.1980-(142.1813-13.99)=+6.7$ mgon` },
      { t: "Zeile F1 → N (N ist Ziel)", b: R`$a_y=\rho\,\Delta x/S^2=-0.07640$, $a_x=-\rho\,\Delta y/S^2=-0.02498$ mgon/mm, $a_{o_1}=-1$` },
      { t: "Zeile Festpunkt → Festpunkt", b: R`Nur die Orientierungsspalte −1 – die Zeile bestimmt ausschließlich $o_i$.` },
      { t: "Ergebnis (nachgerechnet)", b: R`$\hat y_N=3\,499\,551.540$, $\hat x_N=5\,199\,436.751$; $\Omega=55.2$ mgon², $s_0=\sqrt{55.2/6}=3.0$ mgon ≈ a priori ✓` }
    ]}},
    { h3: "Kombiniertes Netz (Strecken + Richtungen)" },
    { p: "Beide Zeilentypen stehen einfach untereinander in derselben A-Matrix. Jetzt kommt es aber auf das <b>Genauigkeitsverhältnis</b> zwischen Strecken (mm) und Richtungen (mgon) an. Es beeinflusst Koordinaten und – noch stärker – deren Genauigkeitsmaße. Ist es a priori unklar, hilft die <b>Varianzkomponentenschätzung</b> (in UE05a mit CAPLAN)." },
    { callout: "merke", body: "Reines Strecken- oder Richtungsnetz: Ein gemeinsamer Faktor in allen σ ändert die Koordinaten nicht (nur $s_0$). Im <b>kombinierten Netz</b> verschiebt ein falsches σ-Verhältnis die Koordinaten." },

    { h3: "Singuläre Normalgleichungen: Datums- und Konfigurationsdefekte" },
    { list: [
      "<b>Datumsdefekt</b>: Die Beobachtungen legen das Netz nicht absolut fest. Nur Höhendifferenzen ohne Festpunkt → Höhenlage unbestimmt. $\\det N = 0$. Lösung: Festpunkte oder freie Netzausgleichung (Kap. 3).",
      "<b>Konfigurationsdefekt</b>: Punkte oder Netzteile sind messtechnisch unzureichend verknüpft (z. B. ein Punkt nur mit einer Strecke angebunden). Lösung: zusätzliche Messungen – kein Rechentrick hilft."
    ]},
    { h3: "Prognoseausgleichung (Netzplanung)" },
    { p: "$\\Sigma_{\\hat X\\hat X}=\\sigma_0^2(A^TPA)^{-1}$ hängt <b>nicht von den Messwerten</b> ab, nur von Punktlage (Näherungen), Beobachtungsplan (A) und Messgenauigkeit (P). Darum kann man ein Netz <i>vor</i> der Messung ausgleichen: Fehlerellipsen und Zuverlässigkeit vorhersagen, Schwachstellen finden, Messkonzepte vergleichen (z. B. beidseitig vs. einseitig angeschlossener Polygonzug)." },
    { callout: "ex", title: "Übung 03 (Excel)", body: "Prognose: $l$ wird nicht gebraucht. A-Matrix und P aufstellen → MMULT/MTRANS/MINV → $Q$ → $\\sigma_0\\sqrt{q_{ii}}$ und Ellipsen. Typische Frage: Welche Zusatzmessung verkleinert die große Halbachse am stärksten?" },
    { quiz: [
      { type: "gap", q: "Nivellement über 2.5 km, $\\sigma_0=\\sigma_{1km}$. Welches Gewicht bekommt die Beobachtung?", answer: 0.4, tol: 0.001, explain: "$p=1/S=1/2.5=0.4$." },
      { type: "gap", q: "Richtungsnetz mit 1 Neupunkt, 4 Standpunkten (je 3 Richtungen), Festpunkte fest. Freiheitsgrad f?", answer: 6, tol: 0, explain: "$n=12$, $u=2+4=6$, $f=6$." },
      { type: "mc", q: "Welcher Koeffizient steht in der A-Matrix für $\\partial S_{ik}/\\partial y_i$ (i = Standpunkt)?", options: ["$-\\Delta y_{ik}/S_{ik}$", "$+\\Delta y_{ik}/S_{ik}$", "$-\\Delta x_{ik}/S_{ik}$", "$\\rho\\,\\Delta x_{ik}/S_{ik}^2$"], answer: 0, explain: "$\\partial S/\\partial y_i=-\\sin t_{ik}=-\\Delta y/S$." },
      { type: "mc", q: "Wofür braucht man bei der Prognoseausgleichung die Messwerte L?", options: ["Gar nicht – nur A, P und σ0", "Für die A-Matrix", "Für s0", "Für die Gewichte"], answer: 0, explain: "Mit a-priori $\\sigma_0$ ist $\\Sigma_{\\hat X\\hat X}=\\sigma_0^2(A^TPA)^{-1}$ messwertunabhängig." },
      { type: "bug", q: "Fehler im Richtungsansatz finden:", lines: ["r_ik = t_ik − o_i", "∂r/∂o_i = −1", "∂r/∂y_k = ρ·Δx/S²", "∂r/∂x_k = +ρ·Δy/S²", "l = r − (t⁰ − o⁰)"], answer: 3, explain: "$\\partial r/\\partial x_k = -\\rho\\,\\Delta y/S^2$ (Minus!)." }
    ]}
  ]
});

/* ───────────── Kapitel 3 ───────────── */
AGL.push({
  id: "k4", title: "Datum und freie Netzausgleichung",
  intro: "Messungen legen nur die Form eines Netzes fest, nicht seine Lage im Koordinatensystem. Wie man dieses fehlende „Datum“ ergänzt – und was jede Variante mit Koordinaten, Ellipsen und $s_0$ macht – ist ein Klausur-Dauerbrenner.",
  sources: ["Skript Kap. 3 (S. 40–51)", "Übung 04a (freies Höhennetz), 04b (freies Lagenetz), 05b (CAPLAN Datumsvarianten)", "eLearning: Interaktive Darstellung Datumsvarianten, Ergebnisblatt UE05, Kontrollergebnisse UE04a/b", "AGL Cheat Sheet v1.1 (Datumsvarianten)"],
  blocks: [
    { h3: "Innere und äußere Netzgeometrie" },
    { table: { head: ["", "Innere Geometrie", "Äußere Geometrie"], rows: [
      ["beschreibt", "Form, Zusammenhalt des Netzes", "absolute Lage im Koordinatenrahmen"],
      ["Elemente", "$\\hat L$, $v$, $s_0$, Redundanzanteile $r_i$", "Koordinaten $\\hat X$, Standardabweichungen, Fehlerellipsen"],
      ["datumsabhängig?", "nein (bei zwangsfreier Lagerung)", "ja"]
    ]}},
    { callout: "def", title: "Schätzbare Größen", body: "Größen, die bei jeder zwangsfreien Datumswahl gleich herauskommen: ausgeglichene Beobachtungen, Verbesserungen, $s_0$, Strecken und Winkel zwischen Neupunkten. Koordinaten und Ellipsen sind <b>nicht</b> schätzbar – sie hängen vom Datum ab." },
    { h3: "Datumsdefekte zählen" },
    { table: { head: ["Netz / Beobachtungen", "Translation", "Rotation", "Maßstab", "d"], rows: [
      ["Höhennetz (Δh)", "1 (Höhe)", "–", "–", "1"],
      ["Lagenetz nur Richtungen", "2", "1", "1", "4"],
      ["Lagenetz Strecken (± Richtungen)", "2", "1", "–", "3"],
      ["Strecken + Kreisel/Azimut", "2", "–", "–", "2"],
      ["Richtungen + Kreisel", "2", "–", "1", "3"],
    ]}},
    { p: "Ohne Datumsfestlegung ist $N$ singulär ($\\det N=0$, Rangdefekt $d$). Es gibt dann unendlich viele „verallgemeinerte Inverse“ $N^-$ mit $NN^-N=N$ – für die Geodäsie nicht akzeptabel. Das Datum muss explizit festgelegt werden." },
    { h3: "Die vier Varianten" },
    { table: { head: ["Variante", "Vorgehen", "innere Geometrie", "Folge"], rows: [
      ["Zwangsfrei durch Fixieren", "genau d Koordinaten festhalten (z. B. 2D-Richtungsnetz: 2 Punkte)", "erhalten", "Ellipsen hängen stark von der Wahl ab; fixierte Punkte haben σ = 0"],
      ["Freie Netzausgleichung, Gesamtspurminimierung", "keine Festpunkte; Bedingungen $B^T\\hat x=0$ über alle Punkte", "erhalten", "kleinste Spur von $Q_{\\hat X\\hat X}$, kleinste $\\sum(A^2+B^2)$, Datum durch Näherungskoordinaten"],
      ["Freie N.A., Teilspurminimierung", "Bedingungen nur für ausgewählte Datumspunkte ($B_i=E_iB$)", "erhalten", "= freie Ausgleichung + Helmert-Transformation auf Datumspunkte"],
      ["Unter Zwang", "mehr als d Werte fest (Anschlusszwang)", "<b>gestört</b>", "Netzspannungen gehen auf Neupunkte; keine σ für Altpunkte; $s_0$ meist größer"],
      ["Weiche Lagerung", "Altpunkte als Pseudobeobachtungen mit $\\sigma_K$", "je nach $\\sigma_K$", "$\\sigma_K$ groß → fast frei; $\\sigma_K$ klein → fast Zwang"]
    ]}},
    { callout: "merke", body: "<b>Zwangsfrei</b> (genau d festgelegt oder frei): $\\hat L$, $v$, $s_0$ identisch, nur Koordinaten/Ellipsen ändern sich. <b>Zwang</b> (mehr als d festgelegt): auch $v$ und $s_0$ ändern sich." },
    { callout: "ex", title: "Skript Tab. 3.4-1 – Richtungsnetz, 7 Punkte", body: "Summe $\\sum(A^2+B^2)$ der Ellipsen-Halbachsen: Fixieren 101/102 (nebeneinander) → <b>2549 mm²</b>; Fixieren 101/109 (weit auseinander) → <b>738 mm²</b>; freie Netzausgleichung (Gesamtspur) → <b>186 mm²</b>. Merke: Fixpunkte weit auseinander und am Rand wählen – oder frei ausgleichen." },
    { h3: "Freie Netzausgleichung: das geränderte System" },
    { p: "Statt Punkte festzuhalten, ergänzt man Bedingungsgleichungen $B^T\\hat x=0$. Sie besagen: Das ausgeglichene Netz soll gegenüber den Näherungskoordinaten <b>nicht verschoben, nicht verdreht (und nicht skaliert)</b> sein. Mit Lagrange-Multiplikatoren $k$ entsteht:" },
    { formula: R`\begin{pmatrix} N & B\\ B^T & 0\end{pmatrix}\begin{pmatrix}\hat x\\ k\end{pmatrix} = \begin{pmatrix} n\\ 0\end{pmatrix},\qquad \begin{pmatrix} N & B\\ B^T & 0\end{pmatrix}^{-1} = \begin{pmatrix} Q_{11} & Q_{12}\\ Q_{21} & Q_{22}\end{pmatrix},\qquad \hat x = Q_{11}\,n`, vars: ["$B$ – (u×d) Datumsbedingungen", "$k$ – Lagrange'sche Korrelaten (uninteressant)", "$Q_{11}=N^+$ – Pseudoinverse = Kofaktormatrix der Unbekannten", "$f=n-u+d$"] },
    { formula: R`B^T = \begin{pmatrix} 1&0&1&0&\cdots\\ 0&1&0&1&\cdots\\ -x'_1 & y'_1 & -x'_2 & y'_2 &\cdots\\ y'_1 & x'_1 & y'_2 & x'_2 &\cdots\end{pmatrix}\begin{matrix}\leftarrow \text{Transl. } y\\ \leftarrow\text{Transl. } x\\ \leftarrow\text{Rotation}\\ \leftarrow\text{Maßstab}\end{matrix},\qquad y'_i = y_i-\bar y,\ \ x'_i = x_i - \bar x`, vars: ["Reihenfolge der Unbekannten: $y_1,x_1,y_2,x_2,\\dots$ – bei anderer Sortierung Spalten tauschen", "schwerpunktbezogene Koordinaten verbessern die Numerik", "Richtungsnetz: alle 4 Zeilen; Strecken(+Richtungen): Zeilen 1–3", "Zusatzunbekannte (Orientierungen) → Nullen in B", "Höhennetz: $B=(1,1,\\dots,1)^T$"] },
    { callout: "trap", title: "Pivotsuche", body: "Die geränderte Matrix hat Nullen auf der Hauptdiagonalen. In Excel funktioniert MINV trotzdem. Beim Gauß-Verfahren von Hand braucht man aber Zeilen-/Spaltentausch. Und: <b>f = n − u + d</b> – das d nicht vergessen, sonst ist $s_0$ falsch." },
    { steps: { title: "Freies Höhennetz (Übung 04a-Typ)", task: "Das Höhennetz aus Kap. 3, aber HFP1 und HFP2 sind jetzt <i>Neupunkte</i>: u = 5, n = 8, d = 1. Näherungen = bisherige Werte.", steps: [
      { t: "A-Matrix um 2 Spalten erweitern", b: R`Jede Beobachtung hat nun zwei Einträge: −1 beim Start-, +1 beim Zielpunkt. Zeilensumme = 0 ⇒ $N$ singulär (Rang 4).` },
      { t: "Datumsbedingung", b: R`$B=(1;1;1;1;1)^T$: $\sum\hat x_i = 0$ – mittlere Höhe des Netzes bleibt gleich der mittleren Näherungshöhe.` },
      { t: "Rändern und invertieren", b: R`$\begin{pmatrix}N&B\\B^T&0\end{pmatrix}$ (6×6) invertieren, $Q_{11}$ = oberer linker 5×5-Block.` },
      { t: "Ergebnis", b: R`$\hat x=(0.76;\ 0.47;\ 2.04;\ -0.30;\ -2.97)$ mm für (HFP1, HFP2, N1, N2, N3), Summe = 0 ✓` },
      { t: "Genauigkeit", b: R`$\Omega=20.02$ mm², $f=8-5+1=4$, $s_0=2.24$ mm; $s_H=1.5;\ 1.3;\ 1.5;\ 1.4;\ 1.1$ mm` },
      { t: "Vergleich mit Zwang (2 Festpunkte)", b: R`Zwang: $\Omega=20.09$, $f=5$. Zwei Festpunkte = 1 Bedingung mehr als nötig ⇒ Zwang. Hier fast gleich ⇒ die Festpunkte passen gut zusammen.` }
    ]}},
    { h3: "Teilspurminimierung" },
    { p: "Bedingungen nur für ausgewählte Punkte: $B_i=E_iB$, die Selektionsmatrix $E_i$ setzt Zeilen nicht verwendeter Punkte (und von Zusatzparametern) auf 0. Anwendungen: Lagerung auf übergeordneten <b>Datumspunkten</b> ohne die innere Geometrie zu stören, Orientierungsunbekannte im Parametervektor, unterschiedlich gute Näherungskoordinaten, Deformationsmessung (Lagerung auf stabile Stützpunkte)." },
    { h3: "Weiche Lagerung" },
    { formula: R`\begin{pmatrix} l\\ l_A\end{pmatrix} + \begin{pmatrix} v\\ v_A\end{pmatrix} = \begin{pmatrix} A_N & A_A\\ 0 & E\end{pmatrix}\begin{pmatrix}\hat x_N\\ \hat x_A\end{pmatrix},\qquad \Sigma = \begin{pmatrix}\Sigma_{ll}&0\\0&\Sigma_{AA}\end{pmatrix},\ \ \Sigma_{AA}=\sigma_K^2E`, vars: ["$l_A$ – Altpunktkoordinaten als Pseudobeobachtungen", "$\\sigma_K$ – angenommene Koordinatengenauigkeit der Altpunkte (steuert die Lagerung)", "auch: schwaches Datum, stochastische Vorinformation"] },
    { h3: "Welche Variante wann?" },
    { list: [
      "<b>Kataster / Landesvermessung</b>: Verdichtung eines bestehenden Festpunktfelds → Altpunkte dürfen sich nicht ändern → <b>Zwang</b>.",
      "<b>Ingenieurvermessung</b> ohne übergeordnetes Feld → <b>freie Netzausgleichung (Gesamtspur)</b>.",
      "<b>Deformationsmessung</b> (Stütz- und Objektpunkte) → <b>frei mit Teilspurminimierung</b> auf die Stützpunkte.",
      "<b>DB-Richtlinie 883 (3 Stufen)</b>: 1. frei, Teilspur auf Altpunkte (grobe Fehler? Gewichte → VKS) · 2. weiches Datum (Festpunkte noch in Ordnung?) · 3. Zwang (endgültige Koordinaten)."
    ]},
    { callout: "info", title: "CAPLAN", body: "CAPLAN baut die B-Matrix weder mit Original- noch mit Schwerpunktkoordinaten. Ihre Werte lassen sich durch Verschiebung und Skalierung in Schwerpunktkoordinaten überführen. Die geränderte N ist daher nicht direkt mit Excel vergleichbar, $Q_{11}$ und die Koordinaten stimmen aber überein (UE04b)." },
    { quiz: [
      { type: "gap", q: "Lagenetz mit Strecken und Richtungen, 6 Punkte, alle Neupunkte, 5 Standpunkte mit Richtungssätzen. Wie viele Datumsdefekte d?", answer: 3, tol: 0, explain: "Strecken legen den Maßstab fest: 2 Translationen + 1 Rotation = 3. Orientierungen haben keinen Einfluss auf d." },
      { type: "mc", q: "Was ändert sich NICHT, wenn man bei einer zwangsfreien Ausgleichung andere d Koordinaten fixiert?", options: ["Verbesserungen und $s_0$", "Koordinaten der Neupunkte", "Fehlerellipsen", "Spur von $Q_{\\hat X\\hat X}$"], answer: 0, explain: "Innere Geometrie (v, $\\hat L$, $s_0$) ist datumsinvariant." },
      { type: "mc", q: "Was minimiert die freie Netzausgleichung mit Gesamtspurminimierung?", options: ["$\\hat x^T\\hat x$ und die Spur von $Q_{\\hat X\\hat X}$", "$v^TPv$ zusätzlich nochmals", "die Anzahl der Unbekannten", "die Korrelaten k"], answer: 0, explain: "Neben $v^TPv\\to\\min$ wird unter allen Lösungen die mit $\\hat x^T\\hat x\\to\\min$ gewählt ⇒ kleinste Spur, kleinste $\\sum(A^2+B^2)$." },
      { type: "bug", q: "Finde den Fehler (freie Höhennetzausgleichung, 5 Punkte, 8 Δh):", lines: ["u = 5, d = 1", "B = (1,1,1,1,1)^T", "Q11 = oberer 5×5-Block von [[N,B],[B^T,0]]^-1", "x̂ = Q11 · n", "f = n − u = 3"], answer: 4, explain: "$f=n-u+d=8-5+1=4$." },
      { type: "mc", q: "Ein Netz wird auf 3 Festpunkten mit allen 6 Koordinaten gelagert (2D, Strecken + Richtungen). Das ist…", options: ["Ausgleichung unter Zwang", "zwangsfrei", "freie Netzausgleichung", "weiche Lagerung"], answer: 0, explain: "6 fixierte Werte > d = 3 ⇒ Anschlusszwang." }
    ]}
  ]
});

/* ───────────── Kapitel 4+5 ───────────── */
AGL.push({
  id: "k5", title: "Statistik, Konfidenzbereiche und Fehlerellipsen",
  intro: "Damit man aus $s_0$, Standardabweichungen und Ellipsen Aussagen mit einer Wahrscheinlichkeit machen kann, braucht man vier Verteilungen: Normal-, χ²-, t- und F-Verteilung. Die Formeln sind kurz – entscheidend ist, die richtige Verteilung zu wählen.",
  sources: ["Skript Kap. 4 (S. 52–67) und Kap. 5 (S. 68–80)", "Anhang A1–A4 (Tafeln)", "Übung 07 Verteilungsfunktionen und Konfidenzintervalle"],
  blocks: [
    { h3: "Von der Häufigkeit zur Verteilung" },
    { list: [
      "<b>Histogramm</b>: Messreihe in m Klassen der Breite Δx, relative Häufigkeit $h_i=k_i/n$.",
      "Für $n\\to\\infty$ wird $h_i$ zur <b>Wahrscheinlichkeit</b>. Division durch Δx und Δx→dx ergibt die <b>Dichte</b> $f(x)$.",
      "<b>Verteilungsfunktion</b> $F(x)=P(L\\le x)=\\int_{-\\infty}^x f(\\xi)\\,d\\xi$; $P(a\\lt L\\le b)=F(b)-F(a)$.",
      "<b>Quantil</b> $Q_p=F^{-1}(p)$: Wert, unter dem der Anteil p aller Fälle liegt."
    ]},
    { h3: "Normalverteilung" },
    { p: "Zentraler Grenzwertsatz (Elementarfehler-Hypothese nach Hagen/Bessel): Ist eine Abweichung die Summe vieler kleiner, gleich großer Einflüsse, ist sie normalverteilt. Darum sind zufällige Messabweichungen in der Regel $N(\\mu,\\sigma)$." },
    { formula: R`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}},\qquad y=\frac{L-\mu}{\sigma}\sim N(0,1),\qquad P(|\varepsilon|\le k\sigma)=2\Phi(k)-1`, vars: ["$\\Phi$ – Verteilungsfunktion der Standardnormalverteilung; $\\Phi(-y)=1-\\Phi(y)$", "Excel: NORM.S.VERT(y;WAHR), NORM.S.INV(p)"] },
    { table: { head: ["k", "1", "1.96", "2", "2.58", "3", "3.29"], rows: [["$P(|\\varepsilon|\\le k\\sigma)$", "68.3 %", "95 %", "95.4 %", "99 %", "99.7 %", "99.9 %"]] } },
    { h3: "χ², t und F – wofür welche?" },
    { table: { head: ["Verteilung", "entsteht aus", "Anwendung", "Excel"], rows: [
      ["χ²(f)", "Summe von f quadrierten N(0,1)-Größen; $\\frac{f\\,s^2}{\\sigma^2}\\sim\\chi^2_f$", "Vertrauensbereich für σ, Globaltest", "CHIQU.INV(p;f)"],
      ["t(f)", "N(0,1) normiert mit empirischem s statt σ", "Konfidenzintervall bei unbekanntem σ, Ausreißertest mit $s_0$", "T.INV(p;f)"],
      ["F(f₁,f₂)", "Quotient zweier χ²/f-Größen; $s_1^2/s_2^2$", "Varianzvergleich, Konfidenzellipse mit $s_0$", "F.INV(p;f1;f2)"]
    ]}},
    { callout: "merke", body: "<b>σ bekannt → Normal/χ². σ geschätzt (s) → t/F.</b> Zusammenhänge: $\\chi^2_f=f\\cdot F_{f,\\infty}$, $\\ t_f^2=F_{1,f}$, $\\ y^2=F_{1,\\infty}=\\chi^2_1$ (z. B. $1.96^2=3.84$)." },
    { callout: "trap", title: "Einseitig vs. zweiseitig", body: "Normal- und t-Verteilung sind symmetrisch: Für ein zweiseitiges 95-%-Intervall braucht man das Quantil bei <b>0.975</b> (T.INV(0.975;5) = 2.571). χ² und F sind einseitig definiert – dort direkt 1−α (CHIQU.INV(0.95;5) = 11.07)." },
    { h3: "Konfidenzintervalle (1D)" },
    { formula: R`\sigma\text{ bekannt: }\ \bar L \pm y_{1-\alpha/2}\,\frac{\sigma}{\sqrt n}\qquad\qquad \sigma\text{ unbekannt: }\ \bar L \pm t_{f,1-\alpha/2}\,\frac{s}{\sqrt n},\ \ f=n-1`, vars: ["$S=1-\\alpha$ – Sicherheitswahrscheinlichkeit (z. B. 95 %)", "$\\alpha$ – Irrtumswahrscheinlichkeit", "für einen Einzelwert $\\sqrt n$ weglassen"] },
    { formula: R`s\sqrt{\frac{f}{\chi^2_{f,1-\alpha/2}}}\ \le\ \sigma\ \le\ s\sqrt{\frac{f}{\chi^2_{f,\alpha/2}}}`, vars: ["Vertrauensbereich der Standardabweichung – unsymmetrisch!", "auch für $\\sigma_0$ mit $s_0$ und $f=n-u+d$"] },
    { steps: { title: "Vertrauensbereich für σ₀ (Höhennetz)", task: "$s_0=2.0$ mm, $f=5$, S = 95 %.", steps: [
      { t: "Quantile", b: R`$\chi^2_{5;0.975}=12.83$, $\chi^2_{5;0.025}=0.831$` },
      { t: "Untere Grenze", b: R`$2.0\cdot\sqrt{5/12.83}=1.25$ mm` },
      { t: "Obere Grenze", b: R`$2.0\cdot\sqrt{5/0.831}=4.91$ mm` },
      { t: "Deutung", b: "Bei nur 5 Freiheitsgraden ist $s_0$ sehr unsicher: Der wahre Kilometerfehler liegt mit 95 % zwischen 1.25 und 4.9 mm." }
    ]}},
    { h3: "Helmert'sche Fehlerellipse und Konfidenzellipse (2D)" },
    { p: "Für einen Lagepunkt nimmt man den 2×2-Block der Kofaktormatrix. Seine Eigenwerte geben die Halbachsen, sein Eigenvektor die Richtung." },
    { formula: R`w=\sqrt{(q_{xx}-q_{yy})^2+4q_{xy}^2},\quad \lambda_{1,2}=\tfrac12\left(q_{xx}+q_{yy}\pm w\right),\quad \theta=\tfrac12\arctan\frac{2q_{xy}}{q_{xx}-q_{yy}}`, vars: ["$\\theta$ – Richtungswinkel der großen Halbachse (Quadrant über Vorzeichen von Zähler und Nenner!)", "Fehlerellipse: $A_F=\\sigma_0\\sqrt{\\lambda_1}$, $B_F=\\sigma_0\\sqrt{\\lambda_2}$ (bzw. mit $s_0$)"] },
    { formula: R`\text{a priori: } A_K=\sigma_0\sqrt{\lambda_1\,\chi^2_{2,1-\alpha}}\qquad\qquad \text{a posteriori: } A_K=s_0\sqrt{2\lambda_1\,F_{2,f,1-\alpha}}`, vars: ["$\\chi^2_{2;0.95}=5.99$ ⇒ Faktor 2.45 gegenüber Fehlerellipse", "mit $s_0$ hängt der Faktor vom Freiheitsgrad f ab (f→∞: 2.45)", "p-dim.: $A_i=\\sigma_0\\sqrt{\\lambda_i\\chi^2_{p,1-\\alpha}}$ bzw. $s_0\\sqrt{p\\lambda_iF_{p,f,1-\\alpha}}$"] },
    { steps: { title: "Ellipse für N1 (Streckennetz)", task: "$Q_{N1}$: $q_{yy}=17.89$, $q_{xx}=14.00$, $q_{xy}=5.82$ mm² (σ₀ = 1 mm), $s_0=1.78$, $f=3$.", steps: [
      { t: "w", b: R`$w=\sqrt{(14.00-17.89)^2+4\cdot5.82^2}=12.28$` },
      { t: "Eigenwerte", b: R`$\lambda_1=\tfrac12(31.88+12.28)=22.08$, $\ \lambda_2=9.80$` },
      { t: "Richtung", b: R`$2\theta=\arctan\frac{11.65}{-3.89}$: Zähler +, Nenner − ⇒ 2. Quadrant: $2\theta=120.5$ gon, $\theta=60.3$ gon` },
      { t: "Fehlerellipse (a priori)", b: R`$A_F=\sqrt{22.08}=4.7$ mm, $B_F=3.1$ mm` },
      { t: "95-%-Konfidenzellipse a priori", b: R`$A_K=4.7\cdot2.45=11.5$ mm, $B_K=7.7$ mm` },
      { t: "95-%-Konfidenzellipse a posteriori", b: R`$F_{2,3;0.95}=9.55$: $A_K=1.78\sqrt{2\cdot22.08\cdot9.55}=36.6$ mm, $B_K=24.4$ mm – drastisch größer wegen f = 3!` }
    ]}},
    { table: { head: ["Faktor Konfidenz/Fehler (95 %)", "f → ∞ (σ₀)", "f = 5 (s₀)"], rows: [["p = 1 (Höhe)", "1.96", "2.57"], ["p = 2 (Lage)", "2.45", "3.40"], ["p = 3 (Raum)", "2.80", "4.03"]] } },
    { quiz: [
      { type: "mc", q: "Welche Verteilung brauchst du für das 95-%-Konfidenzintervall eines Mittelwerts aus 6 Messungen, wenn σ unbekannt ist?", options: ["t mit f = 5, Quantil 0.975", "Normal, Quantil 0.95", "χ² mit f = 6", "F(1,6)"], answer: 0, explain: "σ geschätzt ⇒ t, f = n − 1, zweiseitig ⇒ 0.975." },
      { type: "gap", q: "Helmert'sche Fehlerellipse: $q_{xx}=4$, $q_{yy}=4$, $q_{xy}=0$, σ₀ = 2 mm. Große Halbachse A in mm?", answer: 4, tol: 0.01, explain: "$\\lambda_1=4$ ⇒ $A=2\\sqrt4=4$ mm (Kreis)." },
      { type: "mc", q: "Warum ist der Vertrauensbereich für σ unsymmetrisch um s?", options: ["Weil die χ²-Verteilung unsymmetrisch ist", "Weil s verzerrt ist", "Weil die t-Verteilung breiter ist", "Rundungsfehler"], answer: 0, explain: "$f s^2/\\sigma^2\\sim\\chi^2_f$, und χ² ist für kleine f stark schief." },
      { type: "bug", q: "Fehler in der Konfidenzellipse (a posteriori, f = 10) finden:", lines: ["λ1,2 = ½(qxx + qyy ± w)", "θ = ½·arctan(2qxy / (qxx − qyy))", "A_K = s0 · sqrt(λ1 · χ²(2; 0.95))", "B_K = s0 · sqrt(2 · λ2 · F(2; 10; 0.95))"], answer: 2, explain: "Mit $s_0$ gehört die F-Verteilung hin: $A_K=s_0\\sqrt{2\\lambda_1F_{2,f}}$. χ² nur mit σ₀ (a priori)." }
    ]}
  ]
});

/* ───────────── Kapitel 6 ───────────── */
AGL.push({
  id: "k6", title: "Statistische Tests und Globaltest",
  intro: "Ein Test beantwortet: Ist ein Unterschied echt (signifikant) oder nur Zufall? In der Ausgleichung brauchst du das zweimal: im Globaltest (passt das ganze Modell?) und im Ausreißertest (ist eine einzelne Messung grob falsch?).",
  sources: ["Skript Kap. 6 (S. 81–88)", "Skript Kap. 7.2.3.2 (Globaltest, Abstimmung der Irrtumswahrscheinlichkeiten)"],
  blocks: [
    { recipe: { title: "Ablauf jedes Tests", steps: [
      "Nullhypothese $H_0$ formulieren (z. B. „kein Unterschied“, $E(\\nabla l)=0$, $\\sigma=\\sigma_0$).",
      "Alternativhypothese $H_A$: einseitig ($\\gt$) oder zweiseitig ($\\ne$) – <i>vor</i> dem Test festlegen.",
      "Irrtumswahrscheinlichkeit α wählen (5 %, 1 %, 0.1 %).",
      "Testgröße T aus den Daten berechnen.",
      "Quantil der passenden Verteilung bestimmen (zweiseitig: α/2 je Seite).",
      "Entscheiden: T im Annahmebereich → $H_0$ beibehalten, sonst ablehnen."
    ]}},
    { table: { head: ["", "$H_0$ wahr", "$H_0$ falsch"], rows: [
      ["$H_0$ angenommen", "richtig (1−α)", "<b>Fehler 2. Art</b> (β)"],
      ["$H_0$ abgelehnt", "<b>Fehler 1. Art</b> (α)", "richtig – Testgüte/Macht 1−β"]
    ]}},
    { callout: "trap", title: "„Angenommen“ heißt nicht „bewiesen“", body: "Wird $H_0$ beibehalten, ist nur kein Widerspruch <b>nachweisbar</b>. Die Wahrscheinlichkeit, einen vorhandenen Fehler zu übersehen (β), kann groß sein. Kleines α allein macht einen Test nicht „gut“ – es vergrößert β." },
    { h3: "Typische Signifikanztests" },
    { table: { head: ["Frage", "Testgröße", "Verteilung"], rows: [
      ["Mittelwert ≠ Sollwert? (σ bekannt)", "$T=\\frac{|\\bar L-\\mu_0|}{\\sigma/\\sqrt n}$", "$y_{1-\\alpha/2}$"],
      ["Mittelwert ≠ Sollwert? (s)", "$T=\\frac{|\\bar L-\\mu_0|}{s/\\sqrt n}$", "$t_{n-1,1-\\alpha/2}$"],
      ["Empirisches s passt zu σ?", "$T=\\frac{f\\,s^2}{\\sigma^2}$", "$\\chi^2_f$"],
      ["Zwei Messreihen gleich genau?", "$T=\\frac{s_1^2}{s_2^2}$ (größere oben)", "$F_{f_1,f_2,1-\\alpha/2}$"],
      ["Differenz zweier Ergebnisse?", "$T=\\frac{|d|}{\\sigma_d}$, $\\sigma_d^2=\\sigma_1^2+\\sigma_2^2$", "y bzw. t"]
    ]}},
    { h3: "Globaltest" },
    { p: "Prüft, ob funktionales <i>und</i> stochastisches Modell zusammenpassen – ohne zu sagen, wo ein Fehler sitzt. Voraussetzung: belastbares a priori $\\sigma_0$." },
    { formula: R`T_G = \frac{f\,s_0^2}{\sigma_0^2} = \frac{\Omega}{\sigma_0^2}\ \sim\ \chi^2_f`, vars: ["einseitig: $H_0$ annehmen, wenn $T_G\\le\\chi^2_{f,1-\\alpha_G}$", "zweiseitig (CAPLAN): $\\chi^2_{f,\\alpha_G/2}\\le T_G\\le\\chi^2_{f,1-\\alpha_G/2}$", "CAPLAN zeigt das Intervall für $s_0/\\sigma_0$: $\\sqrt{\\chi^2_{f,\\alpha/2}/f}\\ \\dots\\ \\sqrt{\\chi^2_{f,1-\\alpha/2}/f}$"] },
    { steps: { title: "Globaltest am Höhennetz", task: "$\\Omega=20.09$ mm², $f=5$, a priori $\\sigma_{1km}=2$ mm, zweiseitig, $\\alpha_G=5$ %.", steps: [
      { t: "Testgröße", b: R`$T_G=20.09/2^2=5.02$` },
      { t: "Quantile", b: R`$\chi^2_{5;0.025}=0.83$, $\chi^2_{5;0.975}=12.83$` },
      { t: "Entscheidung", b: R`$0.83\le5.02\le12.83$ ⇒ $H_0$ angenommen: Modell plausibel.` },
      { t: "Gegenprobe mit σ₀ = 1 mm", b: R`$T_G=20.09\gt12.83$ ⇒ abgelehnt: entweder grober Fehler oder σ a priori zu optimistisch.` }
    ]}},
    { callout: "info", title: "Zweiseitig – auch „zu gut“ ist verdächtig", body: "$s_0\\ll\\sigma_0$ deutet nicht auf grobe Fehler hin, aber auf ein falsches stochastisches Modell (zu pessimistische σ, Korrelationen). Der einseitige Test übersieht das." },
    { h3: "Abstimmung α_G und α* (B-Methode nach Baarda)" },
    { p: "Im Ausreißertest wird jede Beobachtung einzeln getestet (n Tests, nicht unabhängig). Die B-Methode wählt α* (Individualtest) und α_G (Globaltest) so, dass beide dieselbe Testgüte β haben – dann schlägt der Individualtest auch an, wenn der Globaltest ablehnt. Bei fester α* wächst α_G mit dem Freiheitsgrad; große Netze daher in Teilnetze zerlegen. Praxis/CAPLAN-Standard: <b>α* = 0.1 %, α_G = 5 %</b>." },
    { quiz: [
      { type: "mc", q: "Welche Verteilung nutzt der Globaltest?", options: ["χ² mit f Freiheitsgraden", "t mit f − 1", "Normalverteilung", "F(2,f)"], answer: 0, explain: "$\\Omega/\\sigma_0^2\\sim\\chi^2_f$." },
      { type: "mc", q: "Ein Fehler 2. Art bedeutet …", options: ["H₀ wird beibehalten, obwohl sie falsch ist", "H₀ wird abgelehnt, obwohl sie wahr ist", "α wurde zu groß gewählt", "Die Testgröße wurde falsch berechnet"], answer: 0, explain: "Übersehener Effekt; Wahrscheinlichkeit β." },
      { type: "gap", q: "Globaltest: Ω = 30 mm², σ₀ = 1.5 mm, f = 8. Testgröße $T_G$?", answer: 13.33, tol: 0.05, explain: "$30/1.5^2=13.33$ (< $\\chi^2_{8;0.975}=17.53$ → angenommen)." }
    ]}
  ]
});

/* ───────────── Kapitel 7 ───────────── */
AGL.push({
  id: "k7", title: "Zuverlässigkeit und Ausreißertest",
  intro: "Genauigkeit sagt, wie stark Zufallsfehler streuen. Zuverlässigkeit sagt, ob ein grober Fehler auffällt – und wie viel Schaden er anrichtet, wenn nicht. Kennzahlen: Redundanzanteil r, normierte Verbesserung NV, Grenzwert ∇₀l und EP.",
  sources: ["Skript Kap. 7 (S. 89–108)", "CAPLAN-Protokollausrisse (Skript Abb. 7.2-8/7.2-9)", "Übung 10 Zuverlässigkeit und Grobfehlersuche", "AGL Cheat Sheet v1.1 (Zuverlässigkeit)"],
  blocks: [
    { callout: "def", title: "Zuverlässigkeit (Baarda)", body: "<p>Ein Netz ist zuverlässig, wenn es größere Modellfehler aufdecken kann.</p><p><b>Innere Zuverlässigkeit</b>: Fähigkeit, Modellfehler aufzudecken (Kontrollierbarkeit der Beobachtungen).<br><b>Äußere Zuverlässigkeit</b>: Auswirkung nicht aufgedeckter Fehler auf die Ergebnisse.</p>" },
    { table: { head: ["Konfiguration", "Redundanz", "Folge"], rows: [
      ["Neupunkt aus 2 Messungen", "0", "keine Kontrolle"],
      ["+1 Messung", "1", "grober Fehler erkennbar, aber nicht lokalisierbar"],
      ["+2 unabhängige Messungen", "≥ 2", "Fehler erkennbar <b>und</b> lokalisierbar"]
    ]}},
    { h3: "Redundanzanteil" },
    { formula: R`r_i = p_{ii}\,(q_{vv})_{ii},\qquad 0\le r_i\le 1,\qquad \sum r_i = f,\qquad v_i = -r_i\,\nabla\hat l_i`, vars: ["$r_i$ – Anteil der Gesamtredundanz, den Beobachtung i trägt", "$Q_{vv}=Q_{LL}-AQA^T$", "ein grober Fehler erscheint nur zum Anteil $r_i$ in der Verbesserung"] },
    { list: [
      "$r_i\\approx0$: Beobachtung unkontrolliert – ein Fehler verschwindet vollständig in den Koordinaten (z. B. einzige Messung zu einem Punkt).",
      "$r_i\\approx1$: voll kontrolliert, trägt aber kaum zum Ergebnis bei – auf sie könnte man verzichten.",
      "$\\sum r_i=f$ ist eine gute Rechenkontrolle. Mittelwert $\\bar r=f/n$."
    ]},
    { h3: "Ausreißertest (Data Snooping)" },
    { p: "Erweitertes Modell: $l+v=A\\hat x+e_i\\nabla l_i$ – ein Zusatzparameter $\\nabla l_i$ (grober Fehler in genau einer Beobachtung). $H_0$: $E(\\nabla l_i)=0$, $H_A$: $E(\\nabla l_i)\\ne0$ (zweiseitig)." },
    { formula: R`\nabla\hat l_i = -\frac{v_i}{r_i},\qquad NV_i = T_1 = \frac{|v_i|}{\sigma_0\sqrt{(q_{vv})_{ii}}}\ \overset{?}{\le}\ y_{1-\alpha^*/2} = 3.29\ (\alpha^*=0.1\%)`, vars: ["$NV$ – normierte Verbesserung (mit a priori $\\sigma_0$, CAPLAN)", "$\\nabla\\hat l_i$ – geschätzter grober Fehler (in CAPLAN nicht angezeigt; oft „GF“)"] },
    { formula: R`\bar s_0^2 = \frac{f\,s_0^2 - v_i^2/(q_{vv})_{ii}}{f-1},\qquad T_2 = \frac{|v_i|}{\bar s_0\sqrt{(q_{vv})_{ii}}}\ \overset{?}{\le}\ t_{f-1,\,1-\alpha^*/2}`, vars: ["$\\bar s_0$ – vom Einfluss der verdächtigen Beobachtung bereinigtes $s_0$", "t-Test, wenn kein belastbares $\\sigma_0$ vorliegt"] },
    { recipe: { title: "Grobfehlersuche – iterativ", steps: [
      "Ausgleichung rechnen, Globaltest.",
      "Für <b>jede</b> Beobachtung NV (bzw. $T_2$) berechnen.",
      "Überschreiten mehrere die Schranke: nur die mit dem <b>größten</b> NV entfernen.",
      "Neu ausgleichen und wieder testen – bis keine Überschreitung mehr.",
      "Entfernte Messung prüfen (Feldbuch, Nachmessung), nicht einfach wegwerfen."
    ]}},
    { callout: "trap", title: "Nie mehrere auf einmal löschen", body: "Ein grober Fehler „verschmiert“ über $Q_{vv}$ auf benachbarte Verbesserungen – auch gute Beobachtungen können dann über der Schranke liegen. Darum immer nur den größten Wert entfernen und neu rechnen. (CAPLAN reduziert stattdessen das Gewicht; nach Prof. Müller widerspricht das dem Testgedanken.)" },
    { h3: "Grenzwert und äußere Zuverlässigkeit" },
    { formula: R`\nabla_0 l_i = \frac{\delta_0\,\sigma_{L_i}}{\sqrt{r_i}},\qquad \delta_0 = y_{1-\alpha^*/2}+y_{\beta^*}`, vars: ["$\\nabla_0 l_i$ – gerade noch aufdeckbarer grober Fehler (GRZW, „Nabla“) – innere Zuverlässigkeit", "$\\delta_0=4.13$ für α* = 0.1 %, β* = 80 % (CAPLAN-Standard)", "$\\delta_0=3.29$ für β* = 50 %"] },
    { formula: R`EP_i = \nabla\hat l_i\,(1-r_i) = v_i\left(1-\frac{1}{r_i}\right),\qquad EPG_i = (1-r_i)\,\nabla_0 l_i,\qquad \delta x_i = \sqrt{p_i(1-r_i)}\,|\nabla\hat l_i|`, vars: ["$EP$ – Einfluss des geschätzten Fehlers auf die ausgeglichene Beobachtung (CAPLAN)", "$EPG$ – Einfluss eines gerade nicht aufdeckbaren Fehlers (Planung)", "$\\delta x$ – Netzverzerrung nach Niemeier (datumsunabhängig)"] },
    { callout: "info", title: "Planung vs. Auswertung", body: "$r_i$ und $\\nabla_0l_i$ hängen nur von A und P ab → schon in der <b>Prognose</b> berechenbar. $NV$, $\\nabla\\hat l$ und $EP$ brauchen echte Verbesserungen → erst <b>nach der Messung</b>." },
    { steps: { title: "Zuverlässigkeit am Höhennetz", task: "Zwangsausgleichung mit 2 HFP, a priori $\\sigma_{1km}=2$ mm, α* = 0.1 %.", steps: [
      { t: "Redundanzanteile", b: R`$r=(0.64;\,0.73;\,0.70;\,0.61;\,0.47;\,0.52;\,0.79;\,0.54)$, $\sum r = 5.00 = f$ ✓` },
      { t: "Normierte Verbesserungen", b: R`$NV=(0.66;\,1.28;\,0.37;\,0.53;\,1.85;\,0.20;\,1.41;\,0.39)$ – alle $\lt3.29$ ⇒ kein grober Fehler nachweisbar` },
      { t: "Verdächtigste Beobachtung L5", b: R`$\nabla\hat l_5=-3.0/0.47=-6.4$ mm; $\bar s_0=1.26$ mm, $T_2=2.93\lt t_{4;0.9995}=8.61$` },
      { t: "Grenzwerte", b: R`$\nabla_0l=4.13\cdot\sigma_{L}/\sqrt r$: L1 14.3 mm … L8 10.7 mm – Fehler unter ca. 1.5 cm würden <b>nicht</b> sicher entdeckt` },
      { t: "Äußere Zuverlässigkeit", b: R`$EPG=(1-r)\nabla_0l$: am größten bei L5 (7.6 mm) – kleinster Redundanzanteil` }
    ]}},
    { callout: "ex", title: "CAPLAN-Protokoll lesen (Skript)", body: "Strecke 1→N: σ = 5 mm, RA = 39.3 %. Nabla = $4.13\\cdot5/\\sqrt{0.393}=32.9$ mm, EPG = $(1-0.393)\\cdot32.9=20.0$ mm. Spalten im Protokoll: G-Sigma = a priori σ, RA = $r_i$ in %, EP, NV." },
    { quiz: [
      { type: "gap", q: "Netz mit n = 20, u = 8, d = 0. Wie groß ist die Summe aller Redundanzanteile?", answer: 12, tol: 0, explain: "$\\sum r_i=f=20-8=12$." },
      { type: "gap", q: "σ_L = 3 mm, r = 0.36, δ₀ = 4.13. Gerade noch aufdeckbarer Fehler ∇₀l in mm?", answer: 20.65, tol: 0.05, explain: "$4.13\\cdot3/\\sqrt{0.36}=4.13\\cdot3/0.6=20.65$ mm." },
      { type: "mc", q: "Drei Beobachtungen haben NV > 3.29 (4.1; 5.7; 3.6). Was tust du?", options: ["Nur die mit NV = 5.7 entfernen und neu rechnen", "Alle drei entfernen", "Die mit 3.6 entfernen", "Gewichte aller drei halbieren"], answer: 0, explain: "Iterativ: größte normierte Verbesserung zuerst." },
      { type: "mc", q: "Eine Beobachtung hat r = 0.02. Was bedeutet das?", options: ["Sie ist praktisch unkontrolliert – grobe Fehler bleiben unsichtbar", "Sie ist sehr zuverlässig", "Sie trägt nichts zum Ergebnis bei", "Sie ist ein Ausreißer"], answer: 0, explain: "Nur 2 % eines Fehlers erscheinen in v." },
      { type: "bug", q: "Fehler finden:", lines: ["r_i = p_ii · qvv_ii", "∇̂l_i = −v_i / r_i", "NV_i = |v_i| / (σ0 · qvv_ii)", "Schranke 3.29 für α* = 0.1 %"], answer: 2, explain: "Wurzel fehlt: $NV=|v_i|/(\\sigma_0\\sqrt{q_{vv,ii}})$." }
    ]}
  ]
});

/* ───────────── Kapitel 8 ───────────── */
AGL.push({
  id: "k8", title: "Ausgleichende Gerade, Regression und Schätzer",
  intro: "Die MdkQ funktioniert auch außerhalb von Netzen: Gerade, Polynom oder Ebene durch Messpunkte legen. Zum Schluss ein Blick auf andere Schätzer (robust) und auf den Allgemeinfall (Gauß-Helmert-Modell).",
  sources: ["Skript Kap. 8 (S. 109–124) inkl. Excel-Hinweise (RGP, Trendlinie)"],
  blocks: [
    { h3: "Ausgleichende Gerade" },
    { p: "Modell $y=m\\,x+b$. Die $y_i$ sind Beobachtungen, die $x_i$ gelten als fehlerfrei. Unbekannte $\\hat X=(\\hat m,\\hat b)$. Das Problem ist linear – keine Näherungswerte nötig, $l=L=y$." },
    { formula: R`y_i+v_i = \hat m\,x_i+\hat b,\qquad A=\begin{pmatrix}x_1&1\\ \vdots&\vdots\\ x_n&1\end{pmatrix},\qquad N=\begin{pmatrix}\sum x^2&\sum x\\ \sum x& n\end{pmatrix}` },
    { formula: R`\hat m=\frac{n\sum xy-\sum x\sum y}{n\sum x^2-(\sum x)^2},\qquad \hat b=\frac{\sum x^2\sum y-\sum x\sum xy}{n\sum x^2-(\sum x)^2},\qquad s_0=\sqrt{\frac{\sum v^2}{n-2}}`, vars: ["Nenner = $\\det N$", "Excel: RGP(y;x;WAHR;WAHR) oder Trendlinie im Punkt(XY)-Diagramm", "schwerpunktbezogene x verbessern die Rechenschärfe"] },
    { steps: { title: "Gerade durch 5 Punkte", task: "x = 1…5, y = (2.1; 3.9; 6.2; 7.8; 10.1).", steps: [
      { t: "Summen", b: R`$n=5$, $\sum x=15$, $\sum x^2=55$, $\sum y=30.1$, $\sum xy=110.2$` },
      { t: "Determinante", b: R`$5\cdot55-15^2=50$` },
      { t: "Steigung", b: R`$\hat m=(5\cdot110.2-15\cdot30.1)/50=(551-451.5)/50=1.99$` },
      { t: "Achsabschnitt", b: R`$\hat b=(55\cdot30.1-15\cdot110.2)/50=(1655.5-1653)/50=0.05$` },
      { t: "Verbesserungen", b: R`$v=\hat mx+\hat b-y=(-0.06;\,0.13;\,-0.18;\,0.21;\,-0.10)$, $\sum v^2=0.107$` },
      { t: "Genauigkeit", b: R`$s_0=\sqrt{0.107/3}=0.19$; $Q=N^{-1}$: $q_{mm}=0.1$, $q_{bb}=1.1$ ⇒ $s_m=0.06$, $s_b=0.20$` }
    ]}},
    { h3: "Polynom und multiple Regression" },
    { formula: R`y=a_0+a_1x+a_2x^2+\dots+a_px^p:\quad A_i=(1,\ x_i,\ x_i^2,\dots,x_i^p);\qquad z=a_0+a_1x+a_2y\ (\text{Ebene}):\quad A_i=(1,\ x_i,\ y_i)`, vars: ["u = p + 1 Parameter, f = n − u", "Grad nur so hoch wie physikalisch sinnvoll – sonst „Überanpassung“ (Schwingen zwischen den Punkten)"] },
    { h3: "Schätzertypen" },
    { table: { head: ["Schätzer", "Zielfunktion", "Eigenschaft"], rows: [
      ["MdkQ (L2)", "$v^TPv\\to\\min$", "bester linearer erwartungstreuer Schätzer (BLUE); bei Normalverteilung auch Maximum-Likelihood; nicht robust"],
      ["L1-Norm", "$\\sum p_i|v_i|\\to\\min$", "robust; Lösung geht durch u Beobachtungen; lineare Optimierung"],
      ["Robuste M-Schätzer (Huber u. a.)", "Gewichte iterativ nach $|v_i|$ reduziert", "unempfindlich gegen Ausreißer"],
      ["L∞", "$\\max|v_i|\\to\\min$", "begrenzt den größten Widerspruch"]
    ]}},
    { h3: "Allgemeinfall: Gauß-Helmert-Modell" },
    { p: "Wenn sich die Beobachtungen nicht explizit als Funktion der Unbekannten schreiben lassen – z. B. Gerade mit fehlerbehafteten x <b>und</b> y – nutzt man Bedingungsgleichungen $\\psi(L+v,\\ \\hat X)=0$. Linearisiert: $B\\,v+A\\,\\hat x+w=0$. Sonderfälle: $B=-E$ → Gauß-Markov (vermittelnd); keine Unbekannten → bedingte Ausgleichung." },
    { quiz: [
      { type: "gap", q: "Ausgleichende Gerade durch 12 Punkte: Freiheitsgrad?", answer: 10, tol: 0, explain: "$f=n-u=12-2=10$." },
      { type: "mc", q: "Welche Zeile der A-Matrix gehört zu einem Polynom 2. Grades am Punkt $x_i=3$?", options: ["(1, 3, 9)", "(3, 9, 27)", "(1, 6, 9)", "(0, 1, 6)"], answer: 0, explain: "$\\partial y/\\partial a_k=x^k$: $(1,\\ x,\\ x^2)$." },
      { type: "mc", q: "Wann braucht man das Gauß-Helmert-Modell statt der vermittelnden Ausgleichung?", options: ["Wenn auch die x-Werte fehlerbehaftet sind", "Wenn n > u", "Bei linearen Problemen", "Bei Höhennetzen"], answer: 0, explain: "Beobachtungen lassen sich dann nicht explizit als $\\varphi(X)$ darstellen." }
    ]}
  ]
});

/* ───────────── Übungen ───────────── */
AGL.push({
  id: "ue", title: "Übungen UE01–UE05b: Kontrollergebnisse",
  intro: "Die Endergebnisse aus dem eLearning, mit denen du deine Excel- und CAPLAN-Lösungen prüfen kannst – jeweils mit dem Lernpunkt, den die Übung trainiert.",
  sources: ["eLearning Kurs 4252: Kontrollergebnisse UE01, UE02a, UE02b, UE03, UE04a, UE04b, UE05a, UE05b (Stand Okt.–Nov. 2026)", "GoodNotes Übungen.pdf"],
  blocks: [
    { table: { head: ["Übung", "Thema", "Kenngrößen", "Kontrollergebnis", "Lernpunkt"], rows: [
      ["UE01", "Additionskonstante, 5 Pfeiler", "n = 10, u = 5, r = 5", "a = +1.670 mm, s_a = ±1.141 mm, s₀ = 1.613 mm, Σv = 0", "lineares Modell, Standardpfad; geschlossene Formel liefert dasselbe"],
      ["UE02a", "kombiniertes Strecken-/Richtungsnetz (1)", "n = 16, u = 6, r = 10", "N1 (1864.7175; 2170.0072), N2 (2285.7108; 1992.4958), s₀ = 1.052, σ 3.2–5.1 mm", "Orientierungen als Unbekannte, ρ in der A-Matrix, Schlussprobe"],
      ["UE02b", "kombiniertes Netz (2)", "n = 11, u = 6, r = 5", "210 (8486.893; 14157.089), 220 (8677.622; 13945.943), s₀ = 0.936", "Gewichtsverhältnis Strecke/Richtung"],
      ["UE03", "Prognoseausgleichung", "n = 5, u = 5, r = 0", "σ_y = 13.8 mm, σ_x = 16.1 mm, σ_P = 21.2 mm", "ohne l, v, s₀ – nur A, P, σ₀; Punktfehler $\\sigma_P=\\sqrt{\\sigma_y^2+\\sigma_x^2}$"],
      ["UE04a", "freies Höhennetz", "n = 5, u = 4, d = 1", "X⁰ = (1,2,3,4) → X̂ = (1,2,3,4), v = 0; s(H₁,H₄) = 0.433, s(H₂,H₃) = 0.559 mm; X⁰ = 0 → X̂ = (−1.5; −0.5; 0.5; 1.5)", "<b>Datum = Näherungswerte</b>: andere X⁰ verschieben das Netz (hier um −2.5 m), Probe $\\hat x^Te=0$"],
      ["UE04b", "freies Lagenetz (Daten UE02b)", "d = 3, f = 4", "s₀ = 0.986; 210 (8486.898; 14157.083), 220 (8677.626; 13945.938)", "Koordinaten ≠ UE02b (anderes Datum), v nahezu gleich"],
      ["UE05a", "CAPLAN Lagenetz", "n = 46 (23 Ri + 23 Str), u = 20, r = 26", "zwangsfrei: 102 (y, x) + 109 (x) fest → d = 3; s₀ ≈ 0.74 (σ_S = 5 mm, σ_R = 1 mgon), nach Gewichtsiteration ≈ 1.0", "Varianzkomponentenschätzung; Pkt 106 am schlechtesten (kein eigener Standpunkt)"],
      ["UE05b", "CAPLAN Datumsvarianten", "Punkt 220", "siehe Tabelle unten", "innere vs. äußere Geometrie"]
    ]}},
    { h3: "UE05b – fünf Datumsvarianten im direkten Vergleich" },
    { table: { head: ["Variante", "y₂₂₀ (…)", "x₂₂₀ (…)", "A [mm]", "B [mm]", "s₀", "v(S 2→220)"], rows: [
      ["A Zwang", ".6222", ".9426", "11.1", "6.9", "0.94", "−6.1 mm"],
      ["B1 frei, Gesamtspur", ".6264", ".9379", "6.8", "5.7", "0.99", "−5.4 mm"],
      ["B2 frei, Teilspur", ".6276", ".9387", "12.6", "10.8", "0.99", "−5.4 mm"],
      ["C zwangsfrei (fixiert)", ".6230", ".9434", "11.8", "7.3", "0.99", "−5.4 mm"],
      ["D weich", ".6236", ".9417", "16.0", "10.3", "0.92", "−5.9 mm"]
    ]}},
    { callout: "merke", body: "B1 = B2 = C bei $v$ und $s_0$ → <b>zwangsfreie Varianten haben dieselbe innere Geometrie</b>; Koordinaten und Ellipsen unterscheiden sich. Die Gesamtspur (B1) liefert die kleinsten Ellipsen. A (Zwang) und D (weich) ändern das Modell → auch $v$ und $s_0$ ändern sich." },
    { callout: "info", title: "Video-Tutorials", body: "Die Video-Tutorials liegen im eLearning nur als ZIP-Archiv (Tutorials-20260331.zip, Excel- und CAPLAN-Bedienung). Es gibt keine Transkripte; ihre Inhalte – Matrizenrechnung in Excel und Netzausgleichung in CAPLAN – sind in den Rezepten dieses Skripts abgedeckt." },
    { quiz: [
      { type: "mc", q: "UE04a: Warum liefern $X^0=(1,2,3,4)$ und $X^0=0$ verschiedene Höhen, obwohl die Messungen gleich sind?", options: ["Bei der freien Ausgleichung definieren die Näherungswerte das Datum", "Rundungsfehler", "Weil das Problem nichtlinear ist", "Weil f sich ändert"], answer: 0, explain: "$\\sum\\hat x=0$ bezieht sich auf $X^0$ – die mittlere Höhe bleibt die mittlere Näherungshöhe." },
      { type: "mc", q: "UE05b: In welchen Varianten sind die Verbesserungen identisch?", options: ["B1, B2, C", "A und D", "Alle fünf", "Nur B1 und B2"], answer: 0, explain: "Alle zwangsfrei ⇒ gleiche innere Geometrie." }
    ]}
  ]
});

/* ───────────── Klausur-Cheatsheet ───────────── */
CONTENT.agl.cheatsheet = {
  lead: "Alle Formeln mit Variablen und Einheiten, Klausur-Rezepte und Excel-Funktionen. Druckt auf A4 zweispaltig.",
  sections: [
    { title: "1 · Notation", blocks: [
      { table: { head: ["Symbol", "Bedeutung", "Dim./Einheit"], rows: [
        ["$n,\\ u,\\ d$", "Beobachtungen, Unbekannte, Datumsdefekte", "–"],
        ["$f=r=n-u+d$", "Freiheitsgrad / Redundanz", "–"],
        ["$L,\\ \\hat L,\\ L^0$", "gemessen, ausgeglichen, genähert", "n×1 [m, gon]"],
        ["$l=L-L^0$", "gekürzte Beobachtungen", "n×1 [mm, mgon]"],
        ["$X^0,\\ \\hat x,\\ \\hat X=X^0+\\hat x$", "Näherung, Zuschlag, Ergebnis", "u×1"],
        ["$v=\\hat L-L$", "Verbesserung", "n×1"],
        ["$A$", "Design-/Konfigurationsmatrix $\\partial\\varphi/\\partial X|_{X^0}$", "n×u"],
        ["$\\Sigma_{LL}=\\sigma_0^2Q_{LL}$, $P=Q_{LL}^{-1}$", "VKM, Kofaktoren, Gewichte", "n×n"],
        ["$N=A^TPA$, $n=A^TPl$", "Normalgleichungen", "u×u, u×1"],
        ["$Q=N^{-1}$", "Kofaktormatrix der Unbekannten", "u×u"]
      ]}}
    ]},
    { title: "2 · Standardpfad (12 Schritte)", blocks: [
      { olist: [
        "$X^0$ (VTR-Rechnung; linear: beliebig)",
        "$L^0=\\varphi(X^0)$, $l=L-L^0$",
        "$A$ aus partiellen Ableitungen",
        "$P$: $p_i=\\sigma_0^2/\\sigma_i^2$",
        "$N=A^TPA$, $n=A^TPl$",
        "$Q=N^{-1}$ (frei: Rändern)",
        "$\\hat x=Qn$, $\\hat X=X^0+\\hat x$",
        "$v=A\\hat x-l$, $\\hat L=L+v$",
        "Kontrolle $A^TPv=0$",
        "$\\Omega=v^TPv$, $s_0=\\sqrt{\\Omega/f}$",
        "$Q_{\\hat L\\hat L}=AQA^T$, $Q_{vv}=Q_{LL}-AQA^T$",
        "Schlussprobe $\\hat L=\\varphi(\\hat X)$, sonst iterieren"
      ]},
      { formula: R`\sigma_{\hat X_i}=\sigma_0\sqrt{q_{ii}}\ \ (\text{a priori}),\qquad s_{\hat X_i}=s_0\sqrt{q_{ii}}\ \ (\text{a posteriori})` }
    ]},
    { title: "3 · A-Matrix-Zeilen", blocks: [
      { table: { head: ["Beob.", "Standpunkt i", "Zielpunkt k"], rows: [
        ["$\\Delta h_{ik}=h_k-h_i$", "$-1$", "$+1$"],
        ["$S_{ik}$: $\\partial/\\partial y,\\ \\partial/\\partial x$", "$-\\frac{\\Delta y}{S},\\ -\\frac{\\Delta x}{S}$", "$+\\frac{\\Delta y}{S},\\ +\\frac{\\Delta x}{S}$"],
        ["$r_{ik}=t_{ik}-o_i$ [gon]", "$-\\rho\\frac{\\Delta x}{S^2},\\ +\\rho\\frac{\\Delta y}{S^2}$", "$+\\rho\\frac{\\Delta x}{S^2},\\ -\\rho\\frac{\\Delta y}{S^2}$"],
        ["Orientierung $o_i$", "$-1$", "–"]
      ]}},
      { list: ["$\\Delta y=y_k-y_i$, $\\Delta x=x_k-x_i$, $S$ aus Näherungen; $\\rho=200/\\pi=63.662$ gon", "mm/mgon: Richtungskoeffizient × $10^{-3}$·ρ … Einheit mgon/mm", "Festpunkte: keine Spalte"] }
    ]},
    { title: "4 · Stochastisches Modell", blocks: [
      { table: { head: ["Messung", "σ", "Gewicht (σ₀ gewählt)"], rows: [
        ["Nivellement", "$\\sigma_{1km}\\sqrt{S_{km}}$", "$p=1/S_{km}$ bei $\\sigma_0=\\sigma_{1km}$"],
        ["Strecke", "$A+B\\cdot S$ (z. B. 2 mm + 5 ppm)", "$p=\\sigma_0^2/(A+BS)^2$"],
        ["Richtung", "konst. (z. B. 3 mgon)", "$p=1$ bei $\\sigma_0=\\sigma_R$"]
      ]}},
      { callout: "trap", body: "Gewicht = $\\sigma_0^2/\\sigma^2$ (Quadrat!). Im kombinierten Netz verändert das σ-Verhältnis Koordinaten; im reinen Netz nur $s_0$." }
    ]},
    { title: "5 · Datum", blocks: [
      { table: { head: ["Netz", "d"], rows: [["Höhennetz", "1"], ["2D nur Richtungen", "4 (2T, 1R, 1M)"], ["2D mit Strecken", "3 (2T, 1R)"], ["2D Strecken + Azimut", "2"]] } },
      { formula: R`\begin{pmatrix}N&B\\B^T&0\end{pmatrix}^{-1}=\begin{pmatrix}Q_{11}&\cdot\\\cdot&\cdot\end{pmatrix},\quad \hat x=Q_{11}n`, vars: ["Höhennetz: $B=(1,\\dots,1)^T$", "2D: Zeilen $B^T$: $(1,0)$, $(0,1)$, $(-x',y')$, $(y',x')$ je Punkt; $y'=y-\\bar y$", "Teilspur: $B_i=E_iB$; Zusatzunbekannte → 0"] },
      { list: [
        "<b>zwangsfrei</b> (d fixiert / frei): $v$, $\\hat L$, $s_0$ gleich; Koordinaten und Ellipsen verschieden",
        "<b>Gesamtspur</b>: kleinste Spur $Q$, kleinste $\\sum(A^2+B^2)$",
        "<b>Zwang</b> (> d fest): innere Geometrie gestört, $v$ und $s_0$ ändern sich",
        "<b>weich</b>: Altpunkte als Pseudobeob. mit $\\sigma_K$",
        "Kataster → Zwang; Ingenieur → frei (Gesamtspur); Deformation → Teilspur; RIL 883: frei → weich → Zwang"
      ]}
    ]},
    { title: "6 · Verteilungen & Konfidenz", blocks: [
      { table: { head: ["Größe", "Excel", "Bsp."], rows: [
        ["$y_{1-\\alpha/2}$", "NORM.S.INV(0.975)", "1.960"],
        ["$t_{f,1-\\alpha/2}$", "T.INV(0.975;5)", "2.571"],
        ["$\\chi^2_{f,1-\\alpha}$", "CHIQU.INV(0.95;5)", "11.07"],
        ["$F_{f_1,f_2,1-\\alpha}$", "F.INV(0.95;2;10)", "4.10"],
        ["$\\Phi(y)$", "NORM.S.VERT(y;WAHR)", "Φ(3) = 0.99865"]
      ]}},
      { formula: R`\bar L\pm t_{f,1-\alpha/2}\,\frac{s}{\sqrt n}` },
      { formula: R`s\sqrt{\tfrac{f}{\chi^2_{f,1-\alpha/2}}}\le\sigma\le s\sqrt{\tfrac{f}{\chi^2_{f,\alpha/2}}}` },
      { formula: R`w=\sqrt{(q_{xx}-q_{yy})^2+4q_{xy}^2}` },
      { formula: R`\lambda_{1,2}=\tfrac12(q_{xx}+q_{yy}\pm w),\quad \theta=\tfrac12\arctan\tfrac{2q_{xy}}{q_{xx}-q_{yy}}` },
      { formula: R`A_F=\sigma_0\sqrt{\lambda_1},\qquad B_F=\sigma_0\sqrt{\lambda_2}` },
      { formula: R`A_K=\sigma_0\sqrt{\lambda_1\chi^2_{2,1-\alpha}}\ \ (\times2.45)` },
      { formula: R`A_K=s_0\sqrt{2\lambda_1F_{2,f,1-\alpha}}`, vars: ["θ: Quadrant aus Vorzeichen von Zähler und Nenner", "$\\sigma_P=\\sqrt{\\sigma_y^2+\\sigma_x^2}=\\sqrt{A^2+B^2}$ (Helmert'scher Punktfehler)"] }
    ]},
    { title: "7 · Tests", blocks: [
      { table: { head: ["Test", "Testgröße", "Schranke"], rows: [
        ["Globaltest", "$T_G=\\Omega/\\sigma_0^2$", "$\\chi^2_{f,\\alpha/2}\\le T_G\\le\\chi^2_{f,1-\\alpha/2}$"],
        ["Ausreißer (σ₀)", "$NV=\\frac{|v_i|}{\\sigma_0\\sqrt{q_{vv,ii}}}$", "$3.29$ (α* = 0.1 %)"],
        ["Ausreißer (s₀)", "$T_2=\\frac{|v_i|}{\\bar s_0\\sqrt{q_{vv,ii}}}$", "$t_{f-1,1-\\alpha^*/2}$"],
        ["σ-Vergleich", "$s_1^2/s_2^2$", "$F_{f_1,f_2}$"],
        ["Mittelwert", "$|\\bar L-\\mu_0|\\sqrt n/s$", "$t_{n-1}$"]
      ]}},
      { formula: R`\bar s_0^2=\frac{\Omega-v_i^2/q_{vv,ii}}{f-1}`, vars: ["α_G = 5 %, α* = 0.1 % (CAPLAN-Standard)", "Fehler 1. Art α (H₀ fälschlich abgelehnt), 2. Art β (übersehen)"] }
    ]},
    { title: "8 · Zuverlässigkeit", blocks: [
      { formula: R`r_i=p_{ii}\,q_{vv,ii},\qquad \textstyle\sum r_i=f` },
      { formula: R`\nabla\hat l_i=-\frac{v_i}{r_i},\qquad \nabla_0l_i=\frac{\delta_0\,\sigma_{L_i}}{\sqrt{r_i}}` },
      { formula: R`EP_i=v_i\left(1-\tfrac{1}{r_i}\right),\qquad EPG_i=(1-r_i)\,\nabla_0l_i`, vars: ["$\\delta_0=4.13$ (α* = 0.1 %, β = 80 %)"] },
      { list: ["$r\\approx0$ unkontrolliert, $r\\approx1$ kontrolliert, aber wenig beitragend", "iterativ: nur die größte NV entfernen, neu rechnen", "$r$, $\\nabla_0l$ schon in der Prognose; $NV$, $EP$ erst nach Messung"] }
    ]},
    { title: "9 · Klausur-Rezepte", blocks: [
      { recipe: { title: "Typ „Netz ausgleichen“", steps: ["n, u, d, f notieren", "Näherungen + $l$ (Einheit mm/mgon festlegen!)", "A zeilenweise (Tabelle §3)", "P", "N, n → Q → $\\hat x$", "v, Kontrolle $A^TPv=0$", "$s_0$, $\\sigma_{\\hat X}$", "Schlussprobe"] } },
      { recipe: { title: "Typ „Datum / Variante bewerten“", steps: ["d bestimmen (§5)", "Anzahl fixierter Werte = d? → zwangsfrei; > d → Zwang", "Was ändert sich? innere vs. äußere Geometrie", "Variante zur Aufgabe passend begründen"] } },
      { recipe: { title: "Typ „Ellipse“", steps: ["2×2-Block von Q (Reihenfolge y/x!)", "w, λ₁, λ₂", "θ mit Quadrant", "Fehlerellipse σ₀√λ", "Konfidenz: σ₀ → ×√χ²₂ (2.45); s₀ → ×√(2F₂,f)"] } },
      { recipe: { title: "Typ „grobe Fehler“", steps: ["Globaltest $\\Omega/\\sigma_0^2$ vs. χ²", "$Q_{vv}$, $r_i$ (Kontrolle Σr = f)", "NV für alle, max. suchen", "> 3.29 → entfernen, neu", "$\\nabla_0l$, EP/EPG interpretieren"] } },
      { recipe: { title: "Typ „Prognose / Planung“", steps: ["A, P aus Näherungen und Messplan", "$Q=(A^TPA)^{-1}$, kein l", "$\\sigma_0\\sqrt{q}$, Ellipsen, $r_i$, $\\nabla_0l$", "Zusatzmessung bewerten"] } }
    ]},
    { title: "10 · Excel", blocks: [
      { table: { head: ["Aufgabe", "Funktion"], rows: [
        ["Transponieren", "MTRANS(A)"], ["Matrixprodukt", "MMULT(A;B)"], ["Inverse", "MINV(N)"], ["Determinante", "MDET(N)"],
        ["Wurzel einer Diagonale", "WURZEL(INDEX(Q;i;i))"], ["Summe v²·p", "SUMMENPRODUKT(v;v;p)"], ["Gerade/Polynom", "RGP(y;x;WAHR;WAHR)"],
        ["Winkel (gon)", "ARCTAN2(Δx;Δy)·200/PI()"]
      ]}},
      { callout: "trap", body: "ARCTAN2 erwartet in Excel <b>(x; y)</b> – für $t=\\arctan(\\Delta y/\\Delta x)$ also ARCTAN2(Δx; Δy); negative Ergebnisse +400 gon. Matrixformeln als Bereich eingeben (bzw. dynamisches Array)." }
    ]}
  ]
};
})();
