/* Geoinformationssysteme und Datenbanken – Interaktives Lernskript + Klausur-Cheatsheet
   Prüfung (V3): 90 min schriftlich GIS (Prof. Dr. D. Wenzel) + Datenbanken (Prof. Dr. J. Wilkening).
   Quellen: GoodNotes Geoinformationssysteme 01–08 + Semesterfahrplan, Datenbanken/Vorlesung_GeoDB.pdf (VL 1–6), Mitschrift. */
window.CONTENT = window.CONTENT || {};
(function(){
const R = String.raw;
CONTENT.gisdb = {
  title: "Geoinformationssysteme und Datenbanken",
  lead: "GIS-Theorie (Definitionen, Datenmodelle, Analysewerkzeuge, Erfassung, Geodatabase, Geobasisdaten) und Datenbanken (Entwurf, ER-Modell, Normalisierung, SQL) für die 90-minütige Klausur.",
  sources: [
    "GoodNotes: Geoinformationssysteme/01_Einführung … 08_Anwendungsbereiche, 04_Analysefunktionen_Übungen, Semesterfahrplan (Prof. Dr. Daniela Wenzel)",
    "GoodNotes: Datenbanken/Vorlesung_GeoDB.pdf (VL 1–6, Prof. Dr. Jan Wilkening, 310 S.), Mitschrift.pdf",
    "Prüfungsform laut VL 1: V3 – 90 min schriftlich GIS + Datenbanken (benotet), Portfolio Übungen (unbenotet)"
  ],
  chapters: []
};
const C = CONTENT.gisdb.chapters;

C.push({
  id: "gis-def", title: "GIS: Definition, Raumbezug und Koordinatensysteme",
  intro: "Was ein GIS ist, wie Daten einen Raumbezug bekommen und welche Koordinatensysteme dabei vorkommen – die Definitionen werden in der Klausur gern wörtlich abgefragt.",
  sources: ["01_Einführung (Wenzel)"],
  blocks: [
    { callout: "def", title: "Geographisches Informationssystem", body: "Rechnergestütztes System aus <b>Hardware, Software, Daten und Anwendungen</b>, mit dem raumbezogene Daten digital <b>erfasst und redigiert, gespeichert und reorganisiert, modelliert und analysiert sowie alphanumerisch und graphisch präsentiert</b> werden können (Bill/Fritsch 1991). Merkhilfe EVAP: Erfassung, Verwaltung, Analyse, Präsentation." },
    { list: ["GIS findet Gemeinsamkeiten in Daten aus vielen Quellen", "beantwortet räumliche Fragen: Wo? Warum? Wozu?", "zeigt Muster und Trends, die in Tabellen nicht sichtbar sind", "Abgrenzung zu CAD: CAD hat kaum Analysefunktionen"] },
    { h3: "Räumliche Sachverhalte" },
    { list: ["<b>Räumliche Objekte</b> (Geoobjekte, features)", "<b>Kontinuen</b> (z. B. Geländeoberfläche)", "<b>Prozesse</b> (z. B. Pegelstand, Verkehrsdichte)"] },
    { h3: "Raumbezug" },
    { table: { head: ["Metrik", "Beispiele", "Eigenschaft"], rows: [
      ["primär", "Koordinaten", "direkter geometrischer Bezug"],
      ["sekundär", "Adressen, Kennziffern (PLZ, Gemeindeschlüssel)", "indirekt, über <b>Geokodierung</b> in Koordinaten überführbar"]
    ]}},
    { table: { head: ["Koordinatensystem", "Beschreibung"], rows: [
      ["Geographisch (B, L, h)", "auf dem Ellipsoid"],
      ["Kartesisch geozentrisch (X, Y, Z)", "Ursprung im Ellipsoidmittelpunkt, Z = Rotationsachse, X im Bezugsmeridian (z. B. WGS 84)"],
      ["Projektionskoordinaten", "ETRS89/UTM, DHDN/Gauß-Krüger; eben, aber verzerrt → begrenztes Anwendungsgebiet"]
    ]}},
    { list: ["Bezugsflächen: Ebene, Kugel, Ellipsoid", "Projektionsflächen: Ebene (azimutal), Kegel, Zylinder – jeweils normal, transversal oder schiefachsig", "<b>UTM</b>: GRS80, ETRS89 ≈ WGS84, transversale Mercator-Projektion in 6°-Zonen, Hauptmeridian ×0.9996; Würzburg Zone 32, EPSG 25832"] },
    { callout: "info", title: "Vier-Komponenten-Modell", body: "Hardware, Software, Daten, Anwender/Anwendungen – Daten sind der teuerste und langlebigste Teil." },
    { quiz: [
      { type: "mc", q: "Was ist ein Beispiel für sekundäre Metrik?", options: ["Postadresse", "UTM-Koordinate", "geographische Breite", "geozentrisches X"], answer: 0, explain: "Sekundär = indirekter Raumbezug, über Geokodierung auflösbar." },
      { type: "mc", q: "Was unterscheidet ein GIS grundlegend von CAD?", options: ["Analysefunktionen auf Geometrie und Sachdaten", "Es kann zeichnen", "Es nutzt Koordinaten", "Es druckt Karten"], answer: 0, explain: "Analyse ist das Leistungszentrum eines GIS." }
    ]}
  ]
});

C.push({
  id: "gis-daten", title: "GIS: Datenstrukturen, Geoobjekt und Modellierung",
  intro: "Ein Geoobjekt hat Geometrie, Topologie und Sachdaten. Vektor oder Raster, 2D bis 4D, Layer – diese Begriffe tragen die ganze Vorlesung.",
  sources: ["03_Datenstrukturen_und_Modellierung (Wenzel)"],
  blocks: [
    { h3: "Geodaten" },
    { list: ["<b>Geobasisdaten</b>: amtlich (Vermessungsverwaltung) oder z. B. OSM/Google; Qualität: Flächendeckung, Aktualität, Standardisierung", "<b>Geofachdaten</b>: Fachdatenbanken (Umwelt, Verkehr, Leitungen …), bauen auf Geobasisdaten auf"] },
    { table: { head: ["Eigenschaft", "Inhalt"], rows: [
      ["Geometrie", "Lage und Form (Punkt, Linie, Fläche) – Vektor oder Raster"],
      ["Topologie", "gegenseitige Lage, Nachbarschaft, Verbindung – unabhängig von der Form"],
      ["Sachdaten/Attribute", "beschreibende, thematische Eigenschaften (z. B. Baujahr, Nutzung)"]
    ]}},
    { h3: "Dimensionen" },
    { table: { head: ["Art", "Beschreibung"], rows: [
      ["2D", "Lage ohne Höhe"],
      ["2D + 1D", "2D-Lage plus getrenntes Geländemodell, keine Verknüpfung Lage/Höhe"],
      ["2,5D", "Höhe z als Attribut der Lage (Sachdatenabsorption); ein z pro (x, y)"],
      ["3D", "echte Volumenkörper"],
      ["4D", "3D + Zeit"]
    ]}},
    { p: "<b>Topologische Dimensionen</b>: 0-Zellen (Punkte/Knoten), 1-Zellen (Kanten/Linien), 2-Zellen (Maschen/Flächen), 3-Zellen (Körper). Grundlage der Netzwerkanalyse ist die Graphentheorie." },
    { h3: "Vektor vs. Raster" },
    { table: { head: ["", "Vektor", "Raster"], rows: [
      ["Punkt", "Koordinate", "Pixel"], ["Linie", "Koordinatenfolge", "Pixelkette"], ["Fläche", "geschlossene Koordinatenfolge", "Pixelmenge"],
      ["Stärken", "genau, Topologie, wenig Speicher, Attribute je Objekt", "Kontinuen, Bilder, einfache Overlay-Rechnung"],
      ["Umwandlung", "Vektor → Raster: <b>Rasterisierung</b> („leicht“)", "Raster → Vektor: <b>Vektorisierung</b> („schwer“)"]
    ]}},
    { list: ["Simple Features (ISO 19125): Point, LineString, Polygon, Multi-…, GeometryCollection", "Weitere Geometrien: Kreis(bogen), Ellipse, Spline, Klothoide", "Punktsymbole mit Drehung, Linien mit Verlaufsrichtung"] },
    { h3: "Layerkonzept" },
    { p: "Geoobjekte gleicher Art werden thematisch in Ebenen (Layern) organisiert und übereinander gelegt. So lassen sich Themen getrennt verwalten, darstellen und miteinander verschneiden." },
    { quiz: [
      { type: "mc", q: "Welche Umwandlung gilt als „schwer“?", options: ["Raster → Vektor", "Vektor → Raster", "beide gleich", "keine"], answer: 0, explain: "Vektorisierung erfordert Linienverfolgung und Mustererkennung." },
      { type: "mc", q: "2,5D bedeutet …", options: ["Höhe als Attribut, ein z je Lage", "echte 3D-Körper", "2D plus Zeit", "Raster mit 2.5 m Auflösung"], answer: 0, explain: "Überhänge (z. B. Brücken) sind nicht darstellbar." }
    ]}
  ]
});

C.push({
  id: "gis-analyse", title: "GIS: Analysefunktionen (ArcGIS Pro)",
  intro: "Die Klausur stellt typischerweise eine Situation und fragt: Welches Werkzeug, in welcher Reihenfolge, und was ist zu beachten? Dafür muss man die Overlay-Werkzeuge genau unterscheiden.",
  sources: ["04_Analysefunktionen und 04_Analysefunktionen_Übungen (Wenzel)", "Übung Ü6 Analyse von Geodaten"],
  blocks: [
    { list: ["Berechnung aus Geometrie: Distanz, Fläche, Volumen, Orthogonalmaße, Winkel", "Aggregatfunktionen: Summe, Mittel, Min/Max", "Abfragen: attributiv und lagebezogen", "Overlay/Verschneidung, Netzwerkanalyse, Interpolation, Koordinatentransformation", "Automatisierung: <b>ModelBuilder</b> (Werkzeuge, Variablen, Konnektoren; Modellparameter) oder <b>Python</b> (arcpy); Skripte können zu Tools werden"] },
    { h3: "Auswahl" },
    { table: { head: ["Art", "Beispiel"], rows: [
      ["Attributbezogen", "alle Flurstücke des Eigentümers „Müller“ mit Nutzung „Grünland“"],
      ["Lagebezogen", "alle Flurstücke innerhalb eines Polygons / benachbart zu Flurstück 4711"],
      ["Kombiniert", "Eigentümer „Müller“ und an Flurstück 364 angrenzend"]
    ]}},
    { h3: "Werkzeuge" },
    { table: { head: ["Werkzeug", "Wirkung", "Typischer Einsatz"], rows: [
      ["Puffer (Buffer)", "Abstandsfläche fester oder attributgesteuerter Breite, Enden rund/flach", "Schutzstreifen, Einzugsbereich"],
      ["Mehrfachring-Puffer", "mehrere Abstände, optional zusammengeführt", "Erreichbarkeit 400 m / 2 km"],
      ["Überschneiden (Intersect)", "nur gemeinsame Bereiche aller Eingaben, Attribute beider", "betroffene Teilflächen; Linien × Polygongrenze → Punkte"],
      ["Vereinigen (Union)", "alle Flächen beider Eingaben, zerschnitten, Attribute beider", "vollständige Kombination zweier Flächenthemen"],
      ["Verschneiden (Identity)", "Eingabe bleibt vollständig, wird an Identity-Features zerschnitten", "Flurstücke mit Nutzungsart anreichern"],
      ["Aktualisieren (Update)", "Bereiche der Eingabe werden durch Update-Polygone ersetzt", "nur Polygone!"],
      ["Ausschneiden (Clip)", "Eingabe auf Ausdehnung des Clip-Features beschneiden, nur Eingabe-Attribute", "Daten auf Gemeindegebiet begrenzen"],
      ["Radieren (Erase)", "Bereiche des Erase-Features entfernen", "Flächen ohne Schutzgebiete"],
      ["Anhängen (Append)", "Features an bestehenden Datensatz anhängen", "Fortführung eines Bestands"],
      ["Zusammenführen (Merge)", "mehrere Datasets zu einem <b>neuen</b> zusammenführen", "Kacheln zusammenführen"],
      ["Zusammenführen (Dissolve)", "Geometrien mit gleichem Attributwert verschmelzen", "Gemarkungen aus Flurstücken"]
    ]}},
    { callout: "trap", title: "Zwei Mal „Zusammenführen“", body: "Im deutschen ArcGIS Pro heißen <b>Merge</b> (mehrere Datasets → eines) und <b>Dissolve</b> (Objekte mit gleichem Attribut verschmelzen) beide „Zusammenführen“. Immer den englischen Namen dazuschreiben." },
    { h3: "Anwendungsbeispiele aus der Vorlesung" },
    { steps: { title: "Sieben Klausurszenarien", task: "Welche Werkzeuge? (Lösungsvorschläge auf Basis der Werkzeugdefinitionen)", steps: [
      { t: "1 Gemarkungsflächen aus Flurstücken", b: "<b>Dissolve</b> nach dem Feld Gemarkungsname." },
      { t: "2 Hinweisschilder an Waldzuwegen zählen", b: "<b>Intersect</b> der Wege (Linien) mit der Waldfläche, Ausgabetyp <b>Punkt</b> → jeder Schnittpunkt mit der Waldgrenze ist ein Schild; Anzahl der Punkte zählen." },
      { t: "3 Freileitung: betroffene Flurstücke mit Teilflächen", b: "<b>Buffer</b> um die Leitung (Schutzstreifenbreite) → <b>Intersect</b> mit den Flurstücken → Fläche je Teilstück berechnen." },
      { t: "4 Alter und neuer Baumbestand", b: "<b>Append</b> (oder Merge in neues Dataset). Besonderheit: gleiche Attributstruktur bzw. Feldzuordnung festlegen. <b>Update</b> geht nicht – es arbeitet nur mit Polygonen." },
      { t: "5 Anliegerflurstücke Hauptstraße", b: "<b>Lagebezogene Auswahl</b>: Flurstücke, die die Straßenfläche berühren. Grundbuchfläche ≠ Geometriefläche, weil die Buchfläche die amtliche, früher (teils graphisch oder aus älteren Messungen) ermittelte Fläche ist, nicht die aus Koordinaten gerechnete." },
      { t: "6 Lidl-Erreichbarkeit", b: "Daten: Märkte (Punkte), Stadtgebiet. <b>Multiple Ring Buffer</b> 400 m und 2 km → <b>Clip</b> auf Stadtgebiet (ggf. <b>Dissolve</b> überlappender Puffer) → Karte." },
      { t: "7 Innenentwicklung", b: "Attributive Auswahl Gemeindeeigentum + unbebaut, kombiniert mit lagebezogener Auswahl (z. B. innerhalb des Siedlungsbereichs) → Liste/Karte." }
    ]}},
    { quiz: [
      { type: "mc", q: "Welches Werkzeug behält die gesamte Eingabefläche und ergänzt Attribute der zweiten Ebene?", options: ["Identity (Verschneiden)", "Intersect", "Clip", "Erase"], answer: 0, explain: "Intersect behält nur die Schnittmenge, Clip übernimmt keine Attribute." },
      { type: "mc", q: "Gemeindegrenzen sollen aus Flurstücken mit Attribut „Gemeinde“ entstehen. Welches Werkzeug?", options: ["Dissolve", "Merge", "Union", "Append"], answer: 0, explain: "Verschmelzen nach gleichem Attributwert." },
      { type: "bug", q: "Fehler im Analyseplan finden:", lines: ["Buffer 30 m um Freileitung", "Intersect Puffer × Flurstücke", "Update der Baumpunkte mit neuen Bäumen", "Fläche der Teilstücke berechnen"], answer: 2, explain: "Update funktioniert nur mit Polygonen; für Punkte Append/Merge." }
    ]}
  ]
});

C.push({
  id: "gis-praes", title: "GIS: Präsentation, Kartenlayout und Erfassung",
  intro: "Wie Ergebnisse dargestellt werden (Kartenelemente, thematische Karte, DGM) und wie Daten ins GIS kommen (primäre und sekundäre Erfassung, Digitalisierung, Raster-Vektor-Wandlung).",
  sources: ["02_Präsentation_Kartenlayout, 05_Erfassungsmethoden (Wenzel)"],
  blocks: [
    { callout: "def", title: "Karte", body: "Ganzheitliche Darstellung und intellektuelle Abstraktion der geografischen Realität für einen Zweck, analog/digital, visuell/betastbar. Grundsatz: <b>Lageprinzip</b> (grundrisstreu). Die <b>thematische Karte</b> visualisiert Attribute über einer Hintergrundkarte und darf das Lageprinzip zur Hervorhebung verlassen; sie nutzt grafische Variablen." },
    { table: { head: ["Kartenelement", "Zweck"], rows: [
      ["Kartenrahmen / Kartenrand / Kartenfeld", "Begrenzung / Saum bis Blattrand / eigentliche Darstellung"],
      ["Titel", "kurz, aussagekräftig"], ["Legende", "Zeichenerklärung"], ["Maßstabsleiste (+ Maßstabszahl)", "wichtigstes Element"],
      ["Nordpfeil", "Orientierung, v. a. bei nicht genordeten Karten"], ["Datenquelle, Stand", "Qualität und Aktualität"], ["Weiteres", "Logo, Copyright, Autor"]
    ]}},
    { list: ["Gestaltung: Beschränkung auf das Wesentliche, Lagegenauigkeit, eindeutige Aussage, gute Lesbarkeit, sparsamer Einsatz grafischer Mittel, assoziative Symbolik", "Weitere Präsentation: Web (Server, PostgreSQL/PostGIS), DGM (TIN, Raster, Höhenlinien, Profile, Sichtbarkeit), hybride Darstellung, nichtgrafisch (ASCII, Office)"] },
    { h3: "Erfassung" },
    { table: { head: ["Primär (Originalmessung)", "Sekundär (aus vorhandenen Unterlagen)"], rows: [["GNSS, Tachymetrie, Photogrammetrie, Laserscanning", "Konstruktion aus Messwerten, manuelle Digitalisierung am Bildschirm, halbautomatische Linienverfolgung, automatische Raster-Vektor-Wandlung"]] } },
    { list: ["Anforderungen: Vollständigkeit, Fehlerfreiheit, geeignete Strukturierung; Daten sind der größte Kostenfaktor, langlebig, oft zu aktualisieren", "<b>Konstruktion</b>: höchste Genauigkeit, aber hoher Aufwand und sachkundiges Personal", "<b>Bildschirmdigitalisierung</b>: Plan scannen → georeferenzieren → mit Fangfunktionen (Punkt, Ende, Stützpunkt, Kante) und Sollbedingungen (rechter Winkel, parallel, Flächenschluss) erfassen", "<b>Linienverfolgung</b> (halbautomatisch) für homogene, hochwertige Vorlagen", "<b>Raster-Vektor-Wandlung</b>: Bildverbesserung, Schwellwert (Grauwerthistogramm), Linienverfolgung → unstrukturiert; Mustererkennung → strukturiert; Nacharbeit (Stoppeln, Brücken)"] },
    { quiz: [
      { type: "mc", q: "Welches Kartenelement gilt als eines der wichtigsten?", options: ["Maßstabsleiste", "Firmenlogo", "Kartenrand", "Copyright"], answer: 0, explain: "Laut Vorlesung (nach Bill) zählt sie zu den wichtigsten Elementen." }
    ]}
  ]
});

C.push({
  id: "gis-impl", title: "GIS: Implementierung, Geodatabase und Geobasisdaten",
  intro: "Wie man ein Datenmodell in ArcGIS umsetzt (Geodatabase, Feature-Dataset, Domänen, Subtypen) und welche amtlichen Geobasisdaten es gibt (ALKIS, AAA, DOP, Hauskoordinaten, LoD, ATKIS).",
  sources: ["06_Implementierung, 07_Geobasisdaten Teil 1 und 2, 08_Anwendungsbereiche (Wenzel)"],
  blocks: [
    { list: ["<b>Fachschale</b>: anwendungsbezogenes Modul mit fachspezifischen Funktionen (Bauleitplanung, Kanal, Gas)", "<b>Einfache Fachschale</b>: nur fachspezifisches Datenmodell, nutzt vorhandene GIS-Funktionen (z. B. Baumkataster)"] },
    { table: { head: ["Geodatabase", "Speicher", "Größe", "Nutzer"], rows: [
      ["Personal-GDB", "Access .mdb", "2 GB", "Einzelplatz, nur Windows – in ArcGIS Pro nicht mehr unterstützt"],
      ["File-GDB", "Ordner mit Dateien", "1 TB je Dataset (bis 256 TB)", "ein Schreiber je Dataset, plattformunabhängig"],
      ["Enterprise-GDB", "RDBMS (Oracle, SQL Server, PostgreSQL)", "DBMS-abhängig", "Mehrbenutzer, Versionierung"]
    ]}},
    { list: ["<b>Feature-Class</b>: Objekte gleicher Geometrie und Attribute", "<b>Feature-Dataset</b>: zusammengehörige Feature-Classes mit gemeinsamem Koordinatensystem – Voraussetzung für Topologie, Netzwerk- und Terrain-Datasets", "<b>Domäne</b>: zulässige Werte eines Feldes – Bereichsdomäne (Wertebereich) oder codierte Wertdomäne (Liste) → Datenintegrität", "<b>Subtypen</b>: Untergruppen einer Feature-Class mit eigenen Standardwerten/Domänen", "Zugriffsrechte und Konzept der Datenführung (wer pflegt was)"] },
    { h3: "Geobasisdaten (Bayern)" },
    { table: { head: ["Produkt", "Kerninfo"], rows: [
      ["ALKIS", "Amtliches Liegenschaftskataster-Informationssystem: Grafik und Sachdaten integriert, NAS-Format, objektorientiert, AdV-Standard"],
      ["AAA-Modell", "AFIS (Festpunkte), ALKIS, ATKIS in einem UML-Anwendungsschema (Basis- und Fachschema), Objektartenkatalog (ALKIS-OK-BY)"],
      ["Kataster vs. Grundbuch", "Kataster: Beschreibung und Darstellung, örtlicher Bezug; Grundbuch: Eigentum, Rechte Dritter, Lasten, Rang"],
      ["DOP", "20 cm Bodenauflösung, RGBI + PAN; entzerrt mit DGM (Standard) oder DOM (True Ortho); TIFF + World-File (TFW: Pixelgröße E, Drehung, Drehung, Pixelgröße N (negativ), E und N der linken oberen Ecke)"],
      ["Hauskoordinaten", "jede Gebäudeadresse mit Lage, ~3 Mio. in Bayern, täglich aktuell, ASCII, ETRS89/UTM 32/33"],
      ["3D-Gebäude", "LoD 0 Gelände, LoD 1 Klötzchen (Grundriss + Höhe), LoD 2 + Standarddächer, LoD 3 Detail/Textur, LoD 4 Innenraum"],
      ["ATKIS Basis-DLM", "Landschaftsmodell, Inhalt ≈ TK25, Objektarten nach ATKIS-OK"],
      ["Weitere", "Digitale Ortskarte, DTK, DGM (1/2/5/25 m), OpenStreetMap/Open Data"]
    ]}},
    { quiz: [
      { type: "mc", q: "Was muss für Feature-Classes gelten, die gemeinsam in eine Topologie sollen?", options: ["Sie liegen im selben Feature-Dataset (gleiches Koordinatensystem)", "Sie haben dieselben Attribute", "Sie sind Punkte", "Sie sind in einer Personal-GDB"], answer: 0, explain: "Feature-Dataset = gemeinsamer Raumbezug." },
      { type: "mc", q: "LoD 2 ist …", options: ["Blockmodell mit Standarddachformen", "Klötzchenmodell ohne Dach", "texturiertes Detailmodell", "begehbares Innenraummodell"], answer: 0, explain: "LoD 1 + Dachformen." },
      { type: "mc", q: "Welche Domäne beschränkt „Baumart“ auf {Laubbaum, Nadelbaum}?", options: ["Codierte Wertdomäne", "Bereichsdomäne", "Subtyp", "Feature-Dataset"], answer: 0, explain: "Liste zulässiger Codes." }
    ]}
  ]
});

C.push({
  id: "db-grund", title: "Datenbanken: Grundlagen und Architektur",
  intro: "Warum Datenbanken statt Dateien, was ein DBMS leistet, welche Datenbankmodelle es gibt und wie das 3-Ebenen-Modell Datenunabhängigkeit schafft.",
  sources: ["Vorlesung GeoDB VL 1–2 (Wilkening)", "Mitschrift 07.10.26"],
  blocks: [
    { callout: "def", title: "DB, DBMS, DBS", body: "<b>Datenbank (DB)</b>: Sammlung zusammenhängender Daten, Ausschnitt der Realwelt in einem Modell. <b>DBMS</b>: Software zum Definieren, Erstellen, Abfragen, Aktualisieren und Verwalten. <b>DBS = DB + DBMS</b>." },
    { table: { head: ["Problem einfacher Dateisysteme", "Lösung im DBMS"], rows: [
      ["Redundanzen", "zentrale, normalisierte Speicherung"], ["Inkonsistenzen", "Datentypen, Constraints, Integrität"], ["eingeschränkter Mehrbenutzerbetrieb", "Concurrency, Transaktionen"],
      ["Datenschutz", "Nutzerrollen, Rechte, Sichten"], ["fehlende Datenunabhängigkeit", "Trennung Daten/Anwendung, 3-Ebenen-Modell"]
    ]}},
    { olist: ["Speicherung von Daten und Struktur", "Trennung Daten/Anwendungen", "gleichzeitiger Zugriff", "Sichten (Views)", "Integrität (Konsistenz)", "Transaktionen", "persistente Speicherung", "Sicherheit (Rollen, Gruppen)"] },
    { callout: "merke", body: "Mitschrift-Fragen: Benutzeraccounts lösen <b>Mehrbenutzer- und Datenschutzprobleme</b>; Datentypen lösen <b>Inkonsistenzen</b>. Excel ist keine DB – u. a. weil Datentypen je Spalte nicht festgelegt sind." },
    { h3: "Datenbankmodelle" },
    { table: { head: ["Modell", "Merkmal"], rows: [
      ["hierarchisch", "Baumstruktur, Kind hängt an genau einem Elternknoten"], ["Netzwerk", "Recordsets, mehrere Zuordnungen, keine Baumstruktur"],
      ["relational", "Relationen (Tabellen), 1:1/1:n/n:m, ER-Modell, SQL – am weitesten verbreitet"], ["objektorientiert", "Objekte mit Methoden, Klassen, komplexe Strukturen"],
      ["objektrelational", "relational + mehr Datentypen (PostgreSQL) → Basis räumlicher DB"], ["NoSQL („not only SQL“)", "dokumentorientiert (Key/Value, JSON), spaltenorientiert, Graph-DB; aus Big Data"]
    ]}},
    { h3: "3-Ebenen-Modell (ANSI/SPARC)" },
    { table: { head: ["Ebene", "Inhalt", "Sprache / Wer"], rows: [
      ["extern", "Benutzersichten (Views) für Anwendungen", "DQL/DML, Endnutzer"],
      ["konzeptionell", "Gesamtschema als Ausschnitt der realen Welt", "DDL, DB-Entwickler"],
      ["intern", "physische Organisation auf Speichermedien (B-Baum, Hash)", "DB-Administrator"]
    ]}},
    { list: ["<b>Physische Datenunabhängigkeit</b>: Speicherorganisation ändern ohne Auswirkung auf Anwendungen", "<b>Logische Datenunabhängigkeit</b>: Strukturänderungen ohne Auswirkung – über Sichten", "Nutzergruppen: Administratoren, Designer/Entwickler, Endnutzer", "Data Dictionary: Metadaten über Schema, Sichten, Rechte, Transaktionen", "Architekturen: zentral, verteilt, Client-Server, parallel (Shared Memory / Shared Disk / Shared Nothing)"] },
    { quiz: [
      { type: "mc", q: "Auf welcher Ebene liegt die physische Organisation auf Speichermedien?", options: ["intern", "extern", "konzeptionell", "logisch"], answer: 0, explain: "Interne Ebene, Aufgabe des DB-Administrators." },
      { type: "mc", q: "Welches Modell nutzt PostgreSQL und ist Grundlage räumlicher DB?", options: ["objektrelational", "hierarchisch", "Netzwerk", "Graph"], answer: 0, explain: "Relational + erweiterbare Datentypen (z. B. geometry)." },
      { type: "mc", q: "Was ist eine View?", options: ["Gespeicherte Abfrage, virtuelle Tabelle ohne eigene Daten", "Kopie einer Tabelle", "Index", "Datentyp"], answer: 0, explain: "Externe Sicht, realisiert logische Datenunabhängigkeit." }
    ]}
  ]
});

C.push({
  id: "db-entwurf", title: "Datenbanken: Entwurf und ER-Modell",
  intro: "Vom Ausschnitt der realen Welt zum ER-Diagramm: Entitäten, Attribute, Schlüssel, Beziehungen und Kardinalitäten. Klausuraufgaben verlangen fast immer ein kleines ER-Modell.",
  sources: ["Vorlesung GeoDB VL 2–3 (Wilkening)", "Portfolioaufgabe 1 (ER-Modell)"],
  blocks: [
    { list: ["Entwurfsphasen (Wasserfall): Anforderungsanalyse → konzeptioneller Entwurf (ER/UML) → logischer Entwurf (Relationen, Normalisierung) → physischer Entwurf/Implementierung", "Ziele des konzeptionellen Entwurfs: Vollständigkeit, Korrektheit, Minimalität, Modifizierbarkeit"] },
    { table: { head: ["Abstraktionskonzept", "Bedeutung", "Beispiel"], rows: [
      ["Klassifikation", "gleichartige Objekte → Klasse", "alle Studierenden"], ["Aggregation", "„part of“", "Arbeit aus Einleitung, Hauptteil, Schluss"],
      ["Generalisierung / Spezialisierung", "„is a“", "Angestellter → Mitarbeiter, Sachbearbeiter"], ["Identifikation", "Schlüssel identifizieren eindeutig", "Matrikelnummer"]
    ]}},
    { h3: "ER-Elemente (Chen 1976)" },
    { table: { head: ["Element", "Symbol", "Bedeutung"], rows: [
      ["Entity-Typ", "Rechteck", "Kategorie gleichartiger Entitäten"], ["Attribut", "Oval (Schlüssel unterstrichen)", "beschreibend oder identifizierend, mit Domäne"],
      ["Beziehungstyp", "Raute", "Assoziation, ggf. mit Attributen; binär, ternär, n-är, rekursiv"], ["Kardinalität", "an den Kanten", "1:1, 1:n, n:m"]
    ]}},
    { table: { head: ["Kardinalität", "Beispiel"], rows: [["1:1", "Ehemann – Ehefrau"], ["1:n", "Fachbereich – Professoren"], ["n:m", "Studenten – Vorlesungen"]] } },
    { list: ["(min, max)-Notation: z. B. Person (0, n) macht Urlaub an Ort (1, n)", "Modifizierte Notation: 1:c (höchstens eins), 1:m (mindestens eins), 1:mc (beliebig viele)", "Krähenfuß (Martin): identifizierende/nicht identifizierende Beziehungen", "Generalisierung disjunkt/nicht disjunkt, total/partiell"] },
    { recipe: { title: "Portfolioaufgabe ER-Modell – Anforderungen", steps: ["mind. 10 sinnvolle Entity-Typen", "je mind. 3 beschreibende Attribute", "jeder Entity-Typ mit mind. einer Beziehung inkl. Kardinalität", "mind. 1× Generalisierung", "keine sich kreuzenden Linien; Abgabe PDF/JPG/PNG"] } },
    { quiz: [
      { type: "mc", q: "„n Studenten besuchen m Vorlesungen“ – wie wird das relational umgesetzt?", options: ["Zusätzliche Relation mit beiden Primärschlüsseln", "Fremdschlüssel in Student", "Fremdschlüssel in Vorlesung", "gar nicht"], answer: 0, explain: "n:m braucht immer eine Zwischenrelation (z. B. BESUCHT)." },
      { type: "mc", q: "„Ein Angestellter ist ein Mitarbeiter oder Sachbearbeiter“ ist …", options: ["Generalisierung (is-a)", "Aggregation", "Klassifikation", "1:1-Beziehung"], answer: 0, explain: "Spezialisierung von Teilmengen." }
    ]}
  ]
});

C.push({
  id: "db-relational", title: "Datenbanken: Relationales Modell und Normalisierung",
  intro: "Relationen, Schlüssel, Überführung des ER-Modells und Normalisierung bis 3NF. Normalisierung ist eine der sichersten Klausuraufgaben – hier mit vollständigem Rechenweg.",
  sources: ["Vorlesung GeoDB VL 3 (Wilkening)", "Übung Woche 3 + Musterlösung (Busreise-Unternehmen)"],
  blocks: [
    { list: ["Relation (Codd 1970) = Menge von Tupeln; Schema $R(A_1,\\dots,A_n)\\subseteq D_1\\times\\dots\\times D_n$", "gute Relation: eindeutiger Name, Attribute, 0…n Tupel, <b>ein Wert pro Zelle</b>, ein Primärschlüssel", "<b>NULL</b> = kein Wert (≠ 0), nur eingeschränkt vergleichbar", "<b>Primärschlüssel</b>: identifiziert eindeutig, so kurz wie möglich (unterstrichen); <b>Fremdschlüssel</b> (#): verweist auf Schlüssel einer anderen Relation; <b>Sekundärschlüssel</b>: Index für Suche/Sortierung, nicht zwingend eindeutig"] },
    { table: { head: ["ER-Konstrukt", "Relationale Umsetzung"], rows: [
      ["Entitätsmenge", "eigene Relation"], ["1:1 / 1:n", "Fremdschlüssel auf der n-Seite (NULL möglich) oder eigene Relation (keine NULLs)"],
      ["n:m", "<b>immer</b> eigene Relation mit beiden Primärschlüsseln (+ Beziehungsattribute)"], ["Generalisierung", "Relation je Teilmenge oder eine Relation mit Typ-Spalte"]
    ]}},
    { h3: "Anomalien" },
    { list: ["<b>Einfüge-Anomalie</b>: Daten nur mit leeren Feldern/Schlüsseln einfügbar", "<b>Lösch-Anomalie</b>: Löschen eines Mitarbeiters löscht auch Projektdaten", "<b>Änderungs-Anomalie</b>: eine Änderung muss in vielen Datensätzen erfolgen → Inkonsistenz"] },
    { h3: "Abhängigkeiten und Normalformen" },
    { list: ["<b>Funktionale Abhängigkeit</b> X → Y: gleiche X ⇒ gleiche Y (PLZ → Ort)", "<b>Transitiv</b>: X → Y und Y → Z ⇒ X → Z"] },
    { table: { head: ["Normalform", "Bedingung"], rows: [
      ["1NF", "atomare Werte, keine Wertelisten, jedes Attribut einmal, Datensätze eindeutig"],
      ["2NF", "1NF + jedes Nicht-Schlüssel-Attribut <b>voll</b> vom (ganzen) Primärschlüssel abhängig"],
      ["3NF", "2NF + keine transitiven Abhängigkeiten zwischen Nicht-Schlüssel-Attributen"]
    ]}},
    { steps: { title: "Normalisierung LIEFERUNG", task: "LIEFERUNG(LieferNr, ArtikelNr, Artikelname, Anzahl, Lieferdatum, Lieferfirma, AnschriftLieferfirma) mit ArtikelNr → Artikelname, ArtikelNr → Lieferfirma, Lieferfirma → Anschrift.", steps: [
      { t: "Schlüssel bestimmen", b: "Eine Lieferung hat mehrere Artikel ⇒ Primärschlüssel (LieferNr, ArtikelNr). Lieferdatum hängt nur von LieferNr ab." },
      { t: "1NF", b: "Pro Lieferung-Artikel-Kombination eine Zeile, alle Werte atomar." },
      { t: "2NF – Teilabhängigkeiten entfernen", b: "LIEFERUNG(<u>LieferNr</u>, Lieferdatum) · POSITION(<u>LieferNr#, ArtikelNr#</u>, Anzahl) · ARTIKEL(<u>ArtikelNr</u>, Artikelname, Lieferfirma, AnschriftLieferfirma)" },
      { t: "3NF – transitive Abhängigkeit", b: "ArtikelNr → Lieferfirma → Anschrift ⇒ ARTIKEL(<u>ArtikelNr</u>, Artikelname, Lieferfirma#) · LIEFERFIRMA(<u>Lieferfirma</u>, Anschrift)" },
      { t: "Ergebnis", b: "4 Relationen, keine Redundanz: Anschrift einer Firma steht genau einmal." }
    ]}},
    { quiz: [
      { type: "mc", q: "Eine Relation hat Schlüssel (MatrNr, KursNr) und das Attribut Studentenname. Welche Normalform ist verletzt?", options: ["2NF", "1NF", "3NF", "keine"], answer: 0, explain: "Studentenname hängt nur von MatrNr ab – Teilabhängigkeit." },
      { type: "mc", q: "PERSON(PersNr, Name, PLZ, Ort) – welche Normalform ist verletzt?", options: ["3NF (PersNr → PLZ → Ort)", "1NF", "2NF", "keine"], answer: 0, explain: "Transitive Abhängigkeit über PLZ." },
      { type: "order", q: "Normalisierung in der richtigen Reihenfolge:", steps: ["Wertelisten auflösen (1NF)", "Primärschlüssel bestimmen", "Teilabhängigkeiten auslagern (2NF)", "transitive Abhängigkeiten auslagern (3NF)"] }
    ]}
  ]
});

C.push({
  id: "db-sql", title: "Datenbanken: SQL",
  intro: "Relationenalgebra als Theorie, SQL als Praxis: DDL zum Anlegen, DML zum Ändern, DQL zum Abfragen, dazu Constraints, Domänen, Fremdschlüssel und Aggregatfunktionen.",
  sources: ["Vorlesung GeoDB VL 4–6 (Wilkening)", "Übungen Woche 4–6 + Musterlösungen SQL"],
  blocks: [
    { table: { head: ["Relationenalgebra", "Bedeutung", "SQL"], rows: [
      ["Projektion π", "Spalten auswählen", "SELECT a, b"], ["Selektion σ", "Zeilen auswählen", "WHERE"], ["Vereinigung ∪, Differenz −, Schnitt ∩", "nur bei gleichen Attributen", "UNION / EXCEPT / INTERSECT"],
      ["Kartesisches Produkt ×", "jedes mit jedem", "FROM a, b"], ["Join ⋈", "eingeschränktes Produkt; inner/outer/natural", "JOIN … ON"]
    ]}},
    { table: { head: ["Gruppe", "Zweck", "Befehle"], rows: [
      ["DDL", "Strukturen", "CREATE, ALTER, DROP (DATABASE, TABLE, DOMAIN, INDEX)"], ["DML", "Datensätze", "INSERT, UPDATE, DELETE"],
      ["DQL", "Abfragen", "SELECT"], ["DCL", "Rechte", "GRANT, REVOKE"]
    ]}},
    { code: `CREATE DOMAIN namen AS VARCHAR(150) NOT NULL;

CREATE TABLE t_person (
  id      SERIAL PRIMARY KEY,
  vname   namen,
  name    namen,
  plz     VARCHAR(5),
  beschaeftigt_seit DATE CHECK (beschaeftigt_seit > '1950-01-01')
);

CREATE TABLE t_verleih (
  isbn  VARCHAR(13) NOT NULL,
  leser INTEGER NOT NULL,
  datum DATE,
  FOREIGN KEY (isbn)  REFERENCES t_buecher(isbn) ON DELETE CASCADE,
  FOREIGN KEY (leser) REFERENCES t_leser(nr)     ON DELETE CASCADE
);

ALTER TABLE t_lager ADD name VARCHAR(100);
ALTER TABLE t_lager ADD CONSTRAINT ppruef CHECK (preis > 0);
CREATE INDEX i_produkt_name ON t_produkt (name);`, lang: "sql" },
    { list: ["Datentypen: INTEGER, SMALLINT, BIGINT, SERIAL (Autowert), NUMERIC(p,s)/DECIMAL (exakt, z. B. (8,3) → ±99999.999), REAL/DOUBLE (ungenau), CHAR(n), VARCHAR(n), TEXT, DATE (ISO 1999-01-08), TIME, TIMESTAMP, BOOLEAN, BYTEA", "Dezimalpunkt, nicht Komma: 2.99", "CAST('100' AS INTEGER) bzw. PostgreSQL '100'::INTEGER", "DROP DOMAIN … CASCADE (abhängige Objekte mitlöschen) / RESTRICT (verhindern)"] },
    { code: `INSERT INTO t_lager (id, name, stueck, preis) VALUES (1, 'Kugelschreiber', 200, 2.99);
INSERT INTO t_lager (id, name, preis) VALUES (6, 'Schreibblock A4', 1.99);   -- stueck = NULL
INSERT INTO t_ma_frankfurt SELECT * FROM t_ma WHERE ort IN ('Frankfurt','Offenbach');
INSERT INTO t_lager (id, preis) VALUES (8, 2) ON CONFLICT (id) DO UPDATE SET preis = 2;  -- Upsert

UPDATE t_lager SET stueck = 270 WHERE name = 'Bleistift';
UPDATE t_lager SET stueck = stueck + 100 WHERE stueck < 100;
DELETE FROM t_lager WHERE name = 'Schreibblock A4';`, lang: "sql" },
    { h3: "SELECT – Reihenfolge der Klauseln" },
    { code: `SELECT [DISTINCT] spalten | ausdruck AS alias
FROM tabelle
[WHERE bedingung]            -- Zeilen filtern, keine Aggregatfunktionen!
[GROUP BY spalten]
[HAVING aggregat-bedingung]  -- Gruppen filtern
[ORDER BY spalte [ASC|DESC]]
[LIMIT n];`, lang: "sql" },
    { table: { head: ["Bedingung", "Beispiel"], rows: [
      ["Vergleich", "ort &lt;&gt; 'Berlin', gebdat &lt; '1980-01-01'"], ["Bereich", "preis BETWEEN 10 AND 100 (inklusive Grenzen)"], ["Liste", "ort IN ('Hamburg','Berlin')"],
      ["Muster", "name LIKE 'M%' (beliebig viele), 'M_ller' (genau eins), ESCAPE"], ["Existenz", "EXISTS (SELECT …)"], ["NULL", "stueck IS NULL (nicht = NULL!)"]
    ]}},
    { code: `SELECT vname AS Vorname, name AS Familienname
FROM t_ma
WHERE ort IN ('Hamburg','Berlin') AND gebdat < '1980-01-01'
ORDER BY name;

SELECT id, preis, preis * 1.19 AS bruttopreis FROM t_lager;

SELECT ort AS wohnort, COUNT(id) AS anzahl
FROM t_ma GROUP BY ort HAVING COUNT(id) >= 10;

SELECT COUNT(id) AS anzahl,
       COUNT(id) FILTER (WHERE stueck > 200) AS anzahl_gross,
       ROUND(AVG(wert)) AS mittel, MIN(wert), MAX(wert)
FROM t_lager;`, lang: "sql" },
    { callout: "trap", title: "WHERE vs. HAVING", body: "Aggregatfunktionen (COUNT, SUM, AVG, MIN, MAX) dürfen <b>nicht</b> in WHERE stehen – dafür gibt es HAVING nach GROUP BY. Und: Im SELECT dürfen neben Aggregaten nur Spalten stehen, die auch im GROUP BY stehen (<code>SELECT ort, COUNT(name) FROM t_ma;</code> ist falsch)." },
    { quiz: [
      { type: "bug", q: "Welche Zeile ist falsch?", lines: ["SELECT plz, COUNT(id)", "FROM t_ma", "WHERE COUNT(id) > 4", "GROUP BY plz;"], answer: 2, explain: "Bedingung auf Aggregat gehört in HAVING COUNT(id) > 4 nach GROUP BY." },
      { type: "mc", q: "Welches Muster findet „Müller“, „Möller“ und „Miller“, aber nicht „Mueller“?", options: ["'M_ller'", "'M%ller'", "'M__ller'", "'%ller'"], answer: 0, explain: "_ = genau ein Zeichen." },
      { type: "mc", q: "Was bewirkt ON DELETE CASCADE beim Fremdschlüssel?", options: ["Beim Löschen des referenzierten Datensatzes werden abhängige mitgelöscht", "Löschen wird verhindert", "Fremdschlüssel wird NULL", "Index wird gelöscht"], answer: 0, explain: "Kaskadierendes Löschen." },
      { type: "order", q: "Ordne die SELECT-Klauseln:", steps: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY"] }
    ]}
  ]
});

CONTENT.gisdb.cheatsheet = {
  lead: "GIS-Definitionen, Werkzeuge und Geobasisdaten sowie Datenbank-Entwurf, Normalformen und SQL – für die 90-Minuten-Klausur.",
  sections: [
    { title: "1 · GIS-Grundbegriffe", blocks: [
      { list: ["GIS = Hardware, Software, Daten, Anwendungen; EVAP", "Geoobjekt = Geometrie + Topologie + Sachdaten", "primäre Metrik (Koordinaten) / sekundäre (Adresse → Geokodierung)", "2D · 2D+1D · 2,5D (z als Attribut) · 3D · 4D", "0-/1-/2-/3-Zellen", "Rasterisierung leicht, Vektorisierung schwer", "UTM: ETRS89/GRS80, Zone 32, EPSG 25832, 0.9996"] }
    ]},
    { title: "2 · Analysewerkzeuge", blocks: [
      { table: { head: ["Tool", "Kurz"], rows: [
        ["Buffer / Multiple Ring", "Abstandsflächen"], ["Intersect", "nur Schnittmenge, Attribute beider"], ["Union", "alles, zerschnitten"], ["Identity", "Eingabe ganz + Attribute"],
        ["Update", "ersetzen (nur Polygone)"], ["Clip", "beschneiden, nur Eingabe-Attribute"], ["Erase", "herausradieren"], ["Append", "anhängen an bestehendes"],
        ["Merge", "Datasets → neues"], ["Dissolve", "nach Attribut verschmelzen"]
      ]}}
    ]},
    { title: "3 · Geodatabase & Geobasisdaten", blocks: [
      { list: ["Personal (.mdb, 2 GB, veraltet) · File (1 TB/Dataset) · Enterprise (RDBMS)", "Feature-Dataset: gemeinsames KS → Topologie/Netzwerk", "Domänen: Bereich / codierte Werte; Subtypen", "ALKIS (NAS), AAA = AFIS+ALKIS+ATKIS (UML)", "DOP 20 cm RGBI; TFW: Pixel E, Rot, Rot, Pixel N, E₀, N₀", "LoD 0–4; Basis-DLM ≈ TK25; Hauskoordinaten täglich"] }
    ]},
    { title: "4 · Kartenlayout", blocks: [
      { list: ["Rahmen, Rand, Feld, Titel, Legende, Maßstab(sleiste), Nordpfeil, Quelle/Stand, Autor/Copyright", "thematische Karte darf Lageprinzip verlassen"] }
    ]},
    { title: "5 · DB-Grundlagen", blocks: [
      { list: ["DBS = DB + DBMS", "Probleme Dateien: Redundanz, Inkonsistenz, Mehrbenutzer, Datenschutz, Abhängigkeit", "Modelle: hierarchisch, Netzwerk, relational, OO, objektrelational, NoSQL", "3 Ebenen: extern (Views) – konzeptionell (DDL) – intern (physisch)", "physische / logische Datenunabhängigkeit"] }
    ]},
    { title: "6 · Entwurf & Normalisierung", blocks: [
      { list: ["ER (Chen): Rechteck Entity, Oval Attribut, Raute Beziehung; 1:1, 1:n, n:m", "(min,max); 1:c, 1:m, 1:mc; Krähenfuß", "n:m → eigene Relation; 1:n → FK auf n-Seite", "Anomalien: Einfüge, Lösch, Änderung", "1NF atomar · 2NF voll vom ganzen Schlüssel · 3NF keine transitiven Abh."] }
    ]},
    { title: "7 · SQL", blocks: [
      { code: `CREATE TABLE t (id SERIAL PRIMARY KEY, n VARCHAR(50) NOT NULL,
  p NUMERIC(8,2) CHECK (p > 0), fk INT REFERENCES x(id) ON DELETE CASCADE);
INSERT INTO t (n,p) VALUES ('A', 2.99);
UPDATE t SET p = p*1.19 WHERE n LIKE 'A%';
DELETE FROM t WHERE p IS NULL;
SELECT n, COUNT(*) FROM t WHERE p BETWEEN 1 AND 9
  GROUP BY n HAVING COUNT(*) > 1 ORDER BY n DESC LIMIT 5;`, lang: "sql" },
      { list: ["DDL CREATE/ALTER/DROP · DML INSERT/UPDATE/DELETE · DQL SELECT · DCL GRANT", "LIKE: % beliebig, _ genau eins", "Aggregat nur in HAVING, nicht WHERE", "NULL mit IS NULL prüfen", "'100'::INTEGER = CAST('100' AS INTEGER)"] }
    ]}
  ]
};
})();
