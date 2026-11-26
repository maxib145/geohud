/* GIS- und Datenbankanwendungen – Übungsteil (Portfolio, unbenotet laut VL 1; Inhalte klausurrelevant für GIS + DB)
   Quellen: GoodNotes GIS-Übungen Ü1–Ü8, Ü3a/Ü3b, Z1; Datenbank-Übungen Ü1–Ü6, „Datenbanken Übungen“ (eigene Ausarbeitung), Musterlösungen SQL;
   iCloud Ü05 Luftbildkarte. */
window.CONTENT = window.CONTENT || {};
(function(){
CONTENT["gisdb-anw"] = {
  title: "GIS- und Datenbankanwendungen",
  lead: "Die praktischen Übungen: ArcGIS Pro von der Oberfläche bis zur Analyse und zum Export, PostgreSQL/pgAdmin von der Installation bis zu Fremdschlüsseln und Aggregaten – mit Lösungen.",
  sources: [
    "GoodNotes: GIS-Übungen Ü1, Ü2, Ü3a, Ü3b, Ü4, Ü6, Ü7, Ü8, Z1 (THWS Studienbereich Geo – GIS-Grundlagen mit ArcGIS Pro)",
    "iCloud: Semester_3/Luftbildkarte/Ü05_Erstellen_einer_Luftbildkarte.pdf",
    "GoodNotes: Datenbank-Übungen Ü1–Ü6, Musterlösungen SQL, „Datenbanken Übungen“ (eigene Ausarbeitung 07.10.2026)"
  ],
  chapters: []
};
const C = CONTENT["gisdb-anw"].chapters;

C.push({
  id: "arcgis", title: "ArcGIS Pro: Übungen Ü1–Ü4",
  intro: "Oberfläche, Suchen und Auswählen, Symbolisierung und Kartenlayout mit den Daten „Rottenbauer“ und „Moosach“.",
  sources: ["GIS-Übungen Ü1, Ü2, Ü3a, Ü3b, Ü4"],
  blocks: [
    { table: { head: ["Übung", "Inhalt", "Kernfertigkeiten"], rows: [
      ["Ü1 Benutzeroberfläche", "Projekt Rottenbauer öffnen", "Menüband, Bereich Inhalt, Katalog, Navigation, Lesezeichen, Maßstab"],
      ["Ü2 Suchen, Auswählen, Auswerten", "Adress-/Ortssuche, Layer-Suche (Teil des Feldes), Attribut- und Lageauswahl, Statistik", "Auswahl nach Attributen (SQL-Ausdruck), nach Position, Feldstatistik"],
      ["Ü3a Symbolisierung I", "maßstabsabhängige Darstellung, Gruppenlayer, Symbolisierungsarten", "Einzelsymbol, Einzelwerte, abgestufte Farben/Symbole, Diagramme"],
      ["Ü3b Symbolisierung II", "ATKIS Basis-DLM Moosach (unformatiert) symbolisieren, PDF", "Objektarten nach ATKIS-OK, semantisch korrekte Farben"],
      ["Ü4 Kartenlayout", "Flyer „Würzburger Höhe“ mit zwei Kartenrahmen", "Layout einfügen, Kartenrahmen, <b>Ausdehnungsindikator</b>, Legende, Maßstab, Nordpfeil, PDF-Export"]
    ]}},
    { callout: "merke", body: "Syntaktisch korrekt = Symbol passt zum Skalenniveau (nominal → Farbton, ordinal/metrisch → Helligkeit/Größe). Semantisch korrekt = Symbol weckt die richtige Assoziation (Wasser blau, Wald grün)." },
    { recipe: { title: "Ü4 Layout in ArcGIS Pro", steps: ["Einfügen → Neues Layout (Format wählen)", "Kartenrahmen aufziehen und Karte zuordnen", "zweiten Kartenrahmen für Übersicht einfügen", "Ausdehnungsindikator der Hauptkarte in der Übersicht anzeigen", "Titel, Legende, Maßstabsleiste/-zahl, Nordpfeil, Quelle ergänzen", "Teilen → Layout exportieren (PDF)"] } },
    { quiz: [
      { type: "mc", q: "Was zeigt ein Ausdehnungsindikator?", options: ["Den Ausschnitt der Hauptkarte als Rechteck in der Übersichtskarte", "Den Maßstab", "Die Legende", "Die Druckränder"], answer: 0, explain: "Verknüpft Übersichts- und Hauptkarte." }
    ]}
  ]
});

C.push({
  id: "arcgis2", title: "ArcGIS Pro: Luftbildkarte, Analyse, Import/Export",
  intro: "Ü5 Luftbildkarte mit Transformation, Ü6 Analysewerkzeuge, Ü7 Import und Ü8 Export sowie die Zusatzaufgabe Wilhelma.",
  sources: ["Ü05 Luftbildkarte (iCloud)", "GIS-Übungen Ü6, Ü7, Ü8, Z1"],
  blocks: [
    { h3: "Ü5 Luftbildkarte Würzburg" },
    { list: ["Spezifikation: DIN A3 quer, ETRS89/UTM32 (EPSG 25832), 1:5000, UTM-Gitter und Rahmen mit Koordinaten, Titel, numerischer Maßstab + Maßstabsleiste, Legende (Nutzungsarten baulich geprägter Flächen), Nordpfeil, PDF", "Daten: Basis-DLM in <b>DHDN/GK4</b>, DOP in ETRS89/UTM", "Basis-DLM wird <b>on the fly</b> transformiert → in den Karteneigenschaften die passende geografische Transformation DHDN → ETRS89 wählen", "Objekte teiltransparent: Straßenachsen (ver01_l, Beschriftung NAM, bei Bundes-/Landesstraßen + BEZ), Wege (ver02_l), Bahn (ver03_l/_f), baulich geprägte Flächen (sie02_f: Wohnbau 41001, Industrie/Gewerbe 41002, gemischte Nutzung 41006, besondere funktionale Prägung 41007 …), Weinbauflächen"] },
    { callout: "trap", title: "On-the-fly-Transformation", body: "Ohne gewählte Transformation liegen DHDN-Daten über dem ETRS89-Luftbild um grob 100 m versetzt (Datumsunterschied). Die Projektion allein reicht nicht – das <b>Datum</b> muss transformiert werden." },
    { h3: "Ü6 Analyse (Moosach)" },
    { list: ["Werkzeug starten: Analyse → Werkzeuge, suchen, öffnen", "<b>Puffer</b>: Eingabe-Features, Ausgabe-Feature-Class, Abstand (Wert oder Feld), Seitentyp, Endtyp (rund/flach, nur Linien), Dissolve-Typ (keine/alle/nach Feld)", "<b>Mehrfachring-Puffer</b>, Überschneiden, Vereinigen, Ausschneiden, Radieren, Zusammenführen – siehe Fach „Geoinformationssysteme und Datenbanken“, Kapitel Analysefunktionen", "Lizenzstufen Basic/Standard/Advanced beachten"] },
    { h3: "Ü7 Import / Ü8 Export" },
    { table: { head: ["Thema", "Inhalt", "Fragen aus der Übung"], rows: [
      ["Layer-Dateien (.lyrx)", "verweisen auf Datasets und speichern Symbolisierung, Beschriftung, Maßstabsbereich", "sichtbaren Maßstabsbereich ändern"],
      ["Import", "Shapefile, CSV/XY, CAD, WMS, GDB", "Transformationswarnung beachten"],
      ["Export Bild", "PNG, JPEG, TIFF, PDF …", "Speicherplatz vs. Qualität (Vektor-PDF vs. Raster)"],
      ["Export Shapefile", "erzeugt .shp (Geometrie), .shx (Index), .dbf (Attribute), .prj (Koordinatensystem), ggf. .cpg/.sbn", "welche Datei enthält was?"],
      ["Export Sachdaten", "CSV, mit XY-Koordinaten", "Öffnen in Excel/Editor; welche Koordinaten (KS der Karte)"],
      ["In CAD exportieren", "DWG/DXF (Conversion Tools)", "Layerstruktur bleibt erhalten"]
    ]}},
    { callout: "ex", title: "Z1 Wilhelma", body: "Übersichtskarte für den zoologisch-botanischen Garten Stuttgart: DIN A3, 1:3000, ETRS89/UTM32; Hintergrund aus Basis-DLM (sie02_f nach OBJART, veg01_f/veg03_f …) – Anwendung von Symbolisierung, Beschriftung und Layout aus Ü3–Ü5." },
    { quiz: [
      { type: "mc", q: "Welche Shapefile-Komponente speichert die Attribute?", options: [".dbf", ".shp", ".shx", ".prj"], answer: 0, explain: ".shp Geometrie, .shx Index, .prj Koordinatensystem." },
      { type: "mc", q: "Warum muss in Ü5 eine Transformation eingestellt werden?", options: ["Basis-DLM ist DHDN/GK4, die Karte ETRS89/UTM32 – unterschiedliche Datums", "Weil die DOP falsch sind", "Wegen der Legende", "Für den PDF-Export"], answer: 0, explain: "Datumsübergang DHDN → ETRS89." }
    ]}
  ]
});

C.push({
  id: "pg", title: "PostgreSQL / pgAdmin: Übungen Woche 1–3",
  intro: "Installation, pgAdmin-Begriffe, Datenbank im eigenen Umfeld und die Portfolioaufgabe ER-Modell, dazu die Normalisierung des Busreise-Unternehmens.",
  sources: ["DB-Übungen Ü1–Ü3", "eigene Ausarbeitung „Datenbanken Übungen“ (07.10.2026)", "Musterlösungen SQL"],
  blocks: [
    { table: { head: ["Begriff (pgAdmin)", "Bedeutung"], rows: [
      ["Server", "Verbindung zu einer laufenden PostgreSQL-Instanz (= DBMS); Hochschule: FKV-S036, lokal: localhost"],
      ["Rolle", "Benutzer/Gruppe mit Rechten (Login, DB anlegen, Superuser)"],
      ["Datenbank", "abgeschlossener Datenbestand; „postgres“ = Standard-DB"],
      ["Schema", "Namensraum in einer DB (Standard „public“)"],
      ["Funktion", "gespeicherter Code (SQL/PL/pgSQL), viele von PostGIS"],
      ["Domain", "eigener Datentyp mit Regeln (z. B. PLZ = 5 Ziffern)"],
      ["View", "gespeicherte Abfrage ohne eigene Daten"],
      ["Extension", "Zusatzpaket pro DB (postgis, plpgsql)"],
      ["Tabelle", "Zeilen (Datensätze) und Spalten (Attribute)"]
    ]}},
    { callout: "ex", title: "Eigene Antwort: Netzinformationssystem (NIS) eines Versorgers", body: "Stadtwerke dokumentieren Strom-, Gas-, Wasser- und Fernwärmenetze in einem raumbezogenen DBS: Lage jeder Leitung und jedes Bauteils + Sachdaten (Material, Nennweite, Baujahr). Wichtig sind <b>Datenintegrität</b> (falsch eingezeichnete Gasleitung ist lebensgefährlich; Hausanschluss muss an bestehender Leitung hängen, nur zulässige Nennweiten/Druckstufen) und <b>Sichten</b> (Netzdokumentation sieht alles, eine Baufirma nur ihren Planausschnitt)." },
    { h3: "Portfolioaufgabe 1 (Abgabe 31.10.)" },
    { p: "ER-Modell auf einer DIN-A4-Seite zu Hochschule, Verkehrsbetrieb, sozialem Netzwerk, Bürgerinformationssystem oder Fahrradgeschäft: ≥ 10 Entity-Typen, je ≥ 3 Attribute, jede Entity mit Beziehung und Kardinalität, ≥ 1 Generalisierung, keine Linienkreuzungen." },
    { h3: "Woche 3: Busreise-Unternehmen" },
    { recipe: { title: "Vorgehen (laut Aufgabenstellung)", steps: ["zusammengehörige Daten finden → Entity-Typen (z. B. Reise, Kunde, Bus, Fahrer, Buchung, Ziel/Hotel)", "ER-Modell mit Kardinalitäten (Kunde n:m Reise über Buchung)", "Relationen in Textform: REISE(ReiseNr, …), KUNDE(KdNr, …), BUCHUNG(KdNr#, ReiseNr#, …)", "auf 2NF und 3NF normalisieren, transitive Abhängigkeiten (z. B. PLZ → Ort) auslagern", "Beispieltabellen mit Werten anlegen"] } },
    { quiz: [
      { type: "mc", q: "Wo wird PostGIS installiert?", options: ["Als Extension je Datenbank", "Als eigener Server", "Als Schema", "Als Rolle"], answer: 0, explain: "CREATE EXTENSION postgis; pro DB." }
    ]}
  ]
});

C.push({
  id: "sql-ue", title: "SQL-Übungen Woche 4–6 mit Lösungen",
  intro: "Alle SQL-Aufgaben der Übungen mit den Musterlösungen – zum Nachtippen und Abwandeln. Die Tabellen t_lager, t_ma und die Bibliothek (t_leser, t_buecher, t_verleih) kommen immer wieder vor.",
  sources: ["DB-Übungen Ü4–Ü6", "Musterlösungen SQL"],
  blocks: [
    { h3: "Woche 4: DDL" },
    { code: `CREATE DATABASE testdb;
CREATE TABLE t_artikel (id INTEGER, name VARCHAR, preis NUMERIC(8,2));
DROP TABLE t_artikel;
DROP DATABASE testdb;

CREATE TABLE t_person (id INTEGER NOT NULL, vname VARCHAR(150) NOT NULL, name VARCHAR(150) NOT NULL);
ALTER TABLE t_person ADD beschaeftigt_seit DATE;          -- sinnvoller Constraint z. B. CHECK (beschaeftigt_seit <= CURRENT_DATE)
ALTER TABLE t_person DROP beschaeftigt_seit;
DROP TABLE t_person;

CREATE DOMAIN namen AS VARCHAR(150) NOT NULL;
CREATE TABLE t_person (id INTEGER NOT NULL, vname namen, name namen,
  strasse VARCHAR(150), hnr VARCHAR(5), plz VARCHAR(5), ort VARCHAR(150));`, lang: "sql" },
    { callout: "trap", title: "PLZ und Hausnummer als Text", body: "PLZ wie 01067 verlieren als INTEGER die führende Null, Hausnummern wie 12a sind keine Zahlen → VARCHAR." },
    { h3: "Woche 5: DML und einfache Abfragen" },
    { code: `ALTER TABLE t_lager ADD name VARCHAR(100);
INSERT INTO t_lager (id, name, stueck, preis) VALUES (1, 'Kugelschreiber', 200, 2.99);
INSERT INTO t_lager (id, name, preis) VALUES (6, 'Schreibblock A4', 1.99);
UPDATE t_lager SET stueck = 270 WHERE name = 'Bleistift';
UPDATE t_lager SET preis = 2.80 WHERE name = 'Ordner';
DELETE FROM t_lager WHERE name = 'Schreibblock A4';

INSERT INTO t_ma_frankfurt (id, name, vname, str, hnr, plz, ort, gebdat, land)
SELECT id, name, vname, str, hnr, plz, ort, gebdat, land
FROM t_ma_dt WHERE ort = 'Frankfurt' OR ort = 'Offenbach';
UPDATE t_ma_frankfurt SET ort = 'Frankfurt/Main' WHERE ort = 'Frankfurt';

SELECT vname AS Vorname, name AS Familienname, plz AS Postleitzahl, ort AS Wohnort
FROM t_ma
WHERE ort IN ('Hamburg', 'Berlin') AND gebdat < '1980-01-01'
ORDER BY name;

SELECT id, stueck, preis, preis * 1.19 AS Bruttopreis FROM t_lager;
SELECT stueck, COUNT(id) FROM t_lager GROUP BY stueck;
SELECT stueck, COUNT(id) FROM t_lager WHERE stueck < 10 GROUP BY stueck;`, lang: "sql" },
    { h3: "Woche 6: Fremdschlüssel, Aggregate, Zufallswerte" },
    { code: `CREATE TABLE t_verleih (
  isbn  VARCHAR(13) NOT NULL,
  leser INTEGER NOT NULL,
  datum DATE,
  FOREIGN KEY (isbn)  REFERENCES t_buecher(isbn) ON DELETE CASCADE,
  FOREIGN KEY (leser) REFERENCES t_leser(nr)     ON DELETE CASCADE);

SELECT COUNT(isbn) FROM t_buecher;
SELECT COUNT(nr)   FROM t_leser;
SELECT leser, COUNT(isbn) AS anzahl FROM t_verleih GROUP BY leser;
SELECT isbn, CEIL(preis) AS preis_aufgerundet FROM t_buecher;

CREATE TABLE t_mess (nr SERIAL PRIMARY KEY, wert INTEGER);
INSERT INTO t_mess (wert)
SELECT ROUND(RANDOM() * 999) + 1 FROM generate_series(1, 100);
SELECT COUNT(wert) AS anzahl, ROUND(AVG(wert)) AS mittelwert,
       MIN(wert) AS minimum, MAX(wert) AS maximum
FROM t_mess;

SELECT l.nr, l.name, b.titel
FROM t_leser l
JOIN t_verleih v ON v.leser = l.nr
JOIN t_buecher b ON b.isbn = v.isbn
ORDER BY l.nr;`, lang: "sql" },
    { callout: "info", body: "<code>generate_series</code>, <code>RANDOM()</code>, <code>CEIL</code> und <code>SERIAL</code> sind PostgreSQL-spezifisch. Spaltennamen der Bibliothekstabellen (titel, name) hängen vom Skript bibliothek.sql ab – im eLearning prüfen." },
    { quiz: [
      { type: "bug", q: "Welche Zeile erzeugt einen Fehler?", lines: ["CREATE DOMAIN namen AS VARCHAR(150) NOT NULL;", "CREATE TABLE t_p (id INTEGER, vname namen);", "INSERT INTO t_p (id) VALUES (1);", "SELECT * FROM t_p;"], answer: 2, explain: "vname ist über die Domäne NOT NULL – ohne Wert schlägt das INSERT fehl." },
      { type: "mc", q: "Welche Abfrage zählt die Ausleihen je Leser?", options: ["SELECT leser, COUNT(isbn) FROM t_verleih GROUP BY leser;", "SELECT COUNT(leser) FROM t_verleih;", "SELECT leser FROM t_verleih ORDER BY isbn;", "SELECT leser, isbn FROM t_verleih GROUP BY isbn;"], answer: 0, explain: "Gruppieren nach leser, zählen je Gruppe." }
    ]}
  ]
});

CONTENT["gisdb-anw"].cheatsheet = {
  lead: "ArcGIS-Pro-Handgriffe und SQL-Muster aus den Übungen.",
  sections: [
    { title: "1 · ArcGIS Pro", blocks: [
      { list: ["Auswahl: nach Attributen (SQL-Ausdruck) / nach Position", "Symbolisierung: Einzelsymbol, Einzelwerte, abgestufte Farben/Symbole", "maßstabsabhängige Darstellung, Gruppenlayer", "Layout: Kartenrahmen, Ausdehnungsindikator, Legende, Maßstab, Nordpfeil → PDF", "On-the-fly-Transformation DHDN → ETRS89 in Karteneigenschaften", "Shapefile: .shp .shx .dbf .prj", "In CAD exportieren: DWG/DXF"] }
    ]},
    { title: "2 · SQL-Muster", blocks: [
      { code: `CREATE DOMAIN namen AS VARCHAR(150) NOT NULL;
ALTER TABLE t ADD spalte TYP; ALTER TABLE t DROP spalte;
INSERT INTO z SELECT … FROM q WHERE …;
UPDATE t SET a = a + 100 WHERE b < 100;
SELECT x, COUNT(*) FROM t GROUP BY x HAVING COUNT(*) > 1;
FOREIGN KEY (f) REFERENCES p(id) ON DELETE CASCADE
SELECT … FROM a JOIN b ON a.id = b.a_id;`, lang: "sql" },
      { list: ["PLZ/Hausnummer als VARCHAR", "Dezimalpunkt 2.99", "Aggregat-Bedingung in HAVING"] }
    ]}
  ]
};
})();
