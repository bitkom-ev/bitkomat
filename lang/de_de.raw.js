class T {
  constructor() {
    this.page_title = "Bitkomat";
    this.qa_modal_title = "Fragen &amp; Antworten";
    this.qa_modal_body = '<h4>Wer steht hinter dem Bitkomat?</h4>\
					<p>Lorem Ipsum.</p>\
\
					<h4>Wer hat die Thesen erarbeitet?</h4>\
					<p>Lorem Ipsum.</p>\
\
					<h4>Woher stammen die Positionen der Gruppen?</h4>\
					<p>Den an der Wahl teilnehmenden Gruppen wurden die Thesen mit der Bitte um Stellungnahme zugeleitet. Neben der reinen\
						Positionierung (Stimme zu/Neutral/Stimme nicht zu/Keine Stellungnahme) konnten sie ihre Position auch in einem kurzen Absatz\
						erläutern.\
					</p>\
					<p>Für ihre Stellungnahmen zu den Thesen sind die Gruppen selbst verantwortlich.</p>\
\
					<h4>Von welcher Wahl reden wir hier überhaupt?</h4>\
					<p>Lorem Ipsum.</p>\
\
					<h4>Wie werden die Punkte berechnet?</h4>\
					<p>Deine Antworten werden mit den vorgegebenen Antworten der Gruppen abgeglichen.</p>\
					<ul>\
						<li>Stimmt die Antwort überein, werden der Gruppe 2 Punkte gutgeschrieben;</li>\
						<li>Weicht die Antwort leicht ab (Stimme zu/Neutral oder Neutral/Stimme nicht zu), wird der Gruppe 1 Punkt gutgeschrieben;</li>\
						<li>Sind die Antworten entgegengesetzt oder hat eine Gruppe eine These nicht beantwortet, gibt es keine Punkte für die\
							Gruppe.\
						</li>\
					</ul>\
					<p>Eine These, die du übersprungen hast, wird nicht gewertet. Die erreichbare Höchstpunktzahl wird dadurch geringer.</p>\
					<p>Eine These, die doppelt gewichtet werden soll, wird doppelt gewichtet, das heißt, für sie wird die doppelte Punktzahl\
						gutgeschrieben (0/2/4). Dadurch können insgesamt mehr Punkte erreicht werden.</p>\
\
					<h4>Werden meine Antworten gespeichert?</h4>\
					<p>Nein. Alles läuft vollständig in deinem Browser ab.</p>\
\
					<h4>Ich habe einen inhaltlichen Fehler gefunden!</h4>\
					<p>Gib uns gern Bescheid, wir sehen uns das an. Wer „wir“ sind, steht oben auf dieser Seite.</p>\
\
					<h4>Wer hat den Bitkomat programmiert?</h4>\
					<p>Das steht\
						<a href="https://github.com/hszemi/bitkomat">hier</a>. Der Bitkomat ist übrigens freie Software!</p>\
\
					<h4>Ich habe einen Programmierfehler gefunden!</h4>\
					<p>Oh nein! Wenn du den Fehler\
						<a href="https://github.com/hszemi/bitkomat">meldest</a>, wird er vielleicht behoben.</p>';
    this.btn_qa_modal_close = "Schließen";
    this.swype_info_message_text = "Wische, um manuell zwischen Thesen zu wechseln";
    this.btn_swype_info_ok = "OK";
    this.start_subtitle = "Der Bitkomat ist ein Wahlpositions&shy;vergleichswerkzeug.";
    this.start_explanatory_text = "<p>Der Bitkomat ermöglicht es dir, deine Meinung zu ausgewählten Thesen mit denen der Gruppen zu vergleichen, die zur Bundestagswahl 2021\
						antreten.\
					</p>\
					<p>Für ihre Stellungnahmen zu den Thesen sind die Gruppen selbst verantwortlich.</p>";
    this.btn_start = "Bitkomat starten!";
    this.btn_start_show_qa = "FAQ";
    this.btn_toggle_thesis_more_text = "Erläuterung";
    this.btn_important = "These doppelt gewichten";
    this.btn_yes_text = "Stimme zu";
    this.btn_neutral_text = "Neutral";
    this.btn_no_text = "Stimme nicht zu";
    this.btn_skip_text = "Überspringen";
    this.btn_bitkomat_show_start = "Home";
    this.btn_bitkomat_show_qa = "FAQ";
    this.btn_bitkomat_skip_remaining_theses = "Aktuellen Stand auswerten";
    this.title_results = "Ergebnis";
    this.title_results_summary = "Zusammenfassung";
    this.text_result_below_summary = '<button class="btn btn-sm btn-light" onclick="showBitkomatFirstThesis()">Übersicht</button>';
    this.title_results_details = "";
    this.btn_results_show_start = "Home";
    this.btn_results_show_qa = "FAQ";
  }

  thesis_number(number) {
    return "These " + number;
  }

  get btn_make_thesis_double_weight() {
    return "These doppelt gewichten";
  }

  get btn_thesis_has_double_weight() {
    return "These wird doppelt gewichtet";
  }

  get label_your_choice() {
    return "Deine Wahl";
  }

  achieved_points_text(pointsForList, maxAchievablePoints) {
    return '' + pointsForList + '/' + maxAchievablePoints + ' Punkte';
  }

  get default_text_no_statement() {
    return "<small class='text-muted'>Keine Stellungnahme.</small>";
  }

  get error_loading_config_file() {
    return '<b>Fehler</b> Die Konfigurationsdatei <a href="config/data.json"><tt>config/data.json</tt></a> konnte nicht geladen\
		werden. Existiert sie und enthält keine Syntaxfehler?';
  }

}
