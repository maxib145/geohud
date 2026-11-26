/* Fächer-Register. status: "full" = neues Skript + Cheatsheet (content/<id>.js),
   "legacy" = vorläufig aus studyData.js, "todo" = noch leer.
   Neues Fach: Eintrag ergänzen + content/<id>.js anlegen. IDs nie ändern (Lesefortschritt). */
window.SUBJECTS = {
  version: "2026-11-26.11",
  groups: [
    { id: "sem3", label: "3. Semester" },
    { id: "nach", label: "Nachholfächer" }
  ],
  list: [
    { id: "agl",       group: "sem3", title: "Ausgleichsrechnung",                 meta: "Modul 6018014 · Prof. Dr.-Ing. M. Müller", file: "content/agl.js", status: "full" },
    { id: "photo",     group: "sem3", title: "Photogrammetrie und Fernerkundung",  meta: "Modul 6018013 · Prof. Dr.-Ing. S. Knoblach, E. Heß", file: "content/photo.js", status: "full" },
    { id: "av",        group: "sem3", title: "Angewandte Vermessung",              meta: "Modul 6018015 · Prof. Dr.-Ing. S. Knoblach · Portfolio (5 Ausarbeitungen)", file: "content/av.js", status: "full" },
    { id: "gisdb-anw", group: "sem3", title: "GIS- und Datenbankanwendungen",      meta: "Modul 6018016 · Übungen ArcGIS Pro + PostgreSQL", file: "content/gisdb-anw.js", status: "full" },
    { id: "gisdb",     group: "sem3", title: "Geoinformationssysteme und Datenbanken", meta: "Modul 6018012 · Prof. Wenzel / Prof. Wilkening · 90 min Klausur", file: "content/gisdb.js", status: "full" },
    { id: "ai",        group: "sem3", title: "Angewandte Informatik",              meta: "Modul 6018017", status: "todo" },
    { id: "ma1",       group: "nach", title: "Mathematik I",                       meta: "Trigonometrie + Analysis · 12 Kapitel nach Altklausur", status: "legacy" },
    { id: "ma2",       group: "nach", title: "Mathematik II",                      meta: "Fehlerlehre/Statistik + Integralrechnung", status: "todo" },
    { id: "oop",       group: "nach", title: "Objektorientierte Programmierung",   meta: "Python · 9 Kapitel nach Altklausuren", status: "legacy" },
    { id: "lm1",       group: "nach", title: "Landmanagement I",                   meta: "SBP · Liegenschaftskataster · Ländliche Neuordnung", status: "legacy" }
  ]
};
