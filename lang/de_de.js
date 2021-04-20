"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var T =
  /*#__PURE__*/
  function () {
    function T() {
      _classCallCheck(this, T);

      this.page_title = "Bitkomat";
      this.qa_modal_title = "FAQ";
      this.qa_modal_body = `<h4>Wer steht hinter dem Bitkomat?</h4>

<p>Bitkom e.V., der Bundesverband Informationswirtschaft, Telekommunikation und neue Medien
  Interessenverband der deutschen ITK-Branche
  <a href="//www.bitkom.org/Bitkom/Ueber-uns" title="Über uns" target="_blank">Über uns</a>
</p>
<p>
  Bitkom ist der Digitalverband Deutschlands.
  1999 gegründet, vertreten wir heute mehr als 2.700 Unternehmen der digitalen Wirtschaft,
  unter ihnen gut 1.000 Mittelständler, über 500 Startups und nahezu alle Global Player.
</p>

<h4>Wer hat die Thesen erarbeitet?</h4>
<p>Lorem Ipsum.</p>

<h4>Woher stammen die Positionen der Gruppen?</h4>
<p>Den an der Wahl teilnehmenden Gruppen wurden die Thesen mit der Bitte um Stellungnahme zugeleitet. Neben der reinen
  Positionierung (Stimme zu/Neutral/Stimme nicht zu/Keine Stellungnahme) konnten sie ihre Position auch in einem
  kurzen Absatz
  erläutern.
</p>
<p>Für ihre Stellungnahmen zu den Thesen sind die Gruppen selbst verantwortlich.</p>

<h4>Von welcher Wahl reden wir hier überhaupt?</h4>
<p>Bundestagswahl 2021</p>

<h4>Wie werden die Punkte berechnet?</h4>
<p>Deine Antworten werden mit den vorgegebenen Antworten der Gruppen abgeglichen.</p>
<ul>
  <li>Stimmt die Antwort überein, werden der Gruppe 2 Punkte gutgeschrieben;</li>
  <li>Weicht die Antwort leicht ab (Stimme zu/Neutral oder Neutral/Stimme nicht zu), wird der Gruppe 1 Punkt gutgeschrieben;  </li>
  <li>Sind die Antworten entgegengesetzt oder hat eine Gruppe eine These nicht beantwortet, gibt es keine Punkte für die Gruppe. </li>
</ul>
<p>Eine These, die du übersprungen hast, wird nicht gewertet. Die erreichbare Höchstpunktzahl wird dadurch geringer.</p>
<p>Eine These, die doppelt gewichtet werden soll, wird doppelt gewichtet, das heißt, für sie wird die doppelte Punktzahl gutgeschrieben (0/2/4). Dadurch können insgesamt mehr Punkte erreicht werden.</p>

<h4>Werden meine Antworten gespeichert?</h4>
<p>Nein. Alles läuft per JavaScript vollständig nur auf deinem Gerät in deinem Browser ab.</p>

<h4>Ich habe einen inhaltlichen Fehler gefunden!</h4>
<p>Gib uns sehr gerne dein
  <a href="//www.bitkom.org/formular/contact?subject=Bitkomat inhaltliche Frage" title="inhaltliche Frage"
     target="_blank">Feedback</a>
  Wir werden uns das ansehen.
</p>

<h4>Wer hat den ursprünglichen Mahlowat programmiert?</h4>
<p>Das steht <a href="//github.com/HSZemi/mahlowat">hier</a>. Der Mahlowat ist übrigens freie Software!</p>
<h4>Wer hat den Mahlowat für die Bitkom angepasst?</h4>
<p>Unser Web-Entwickler hat den Mahlowat als Bitkomat für Bitkom adaptiert.</p>

<h4>Ich habe einen Programmierfehler gefunden!</h4>
<p>wir freuen uns über jedes <a href="//www.bitkom.org/formular/contact?subject=Bitkomat Bug Report" title="Feedback" target="_blank">Feedback</a> zum Bitkomat.</p>`;
      this.btn_qa_modal_close = "Schließen";
      this.swype_info_message_text = "Wische, um manuell zwischen Thesen zu wechseln";
      this.btn_swype_info_ok = "OK";
      this.start_subtitle = "Digitalpolitischer Parteiencheck zur Bundestagswahl 2021";
      this.start_explanatory_text = `<p class="text-center">Der Bitkomat ermöglicht es Ihnen, Ihre digitalpolitischen Positionen mit denen der aktuell im Deutschen Bundestag vertretenen Parteien abzugleichen.</p>`;
      this.btn_start = "Bitkomat starten";
      this.btn_start_show_qa = "FAQ";
      this.btn_toggle_thesis_more_text = "Erläuterung";
      this.btn_important = "These doppelt gewichten";
      this.btn_yes_text = "Stimme zu";
      this.btn_neutral_text = "Neutral";
      this.btn_no_text = "Stimme nicht zu";
      this.btn_skip_text = "Überspringen";
      this.btn_bitkomat_show_start = '<i class="fas fa-home fa-1x"></i>';
      this.btn_bitkomat_show_qa = "FAQ";
      this.btn_bitkomat_skip_remaining_theses = "Aktuellen Stand auswerten";
      this.title_results = "Ergebnisse";
      this.title_results_summary = "Parteien"; // Zusammenfassung
      this.text_result_below_summary = '<span onclick="showBitkomatFirstThesis()">Bewertung ändern</span>';
      this.title_results_details = "Thesen"; // Details Übersicht
      this.btn_results_show_start = '<i class="fas fa-home fa-1x"></i>';
      this.btn_results_show_qa = "FAQ";
    }

    _createClass(T, [{
      key: "thesis_number",
      value: function thesis_number(number) {
        return "These " + number;
      }
    }, {
      key: "achieved_points_text",
      value: function achieved_points_text(pointsForList, maxAchievablePoints) {
        return '' + pointsForList + '/' + maxAchievablePoints + ' Punkte';
      }
    }, {
      key: "btn_make_thesis_double_weight",
      get: function get() {
        return "These doppelt gewichten";
      }
    }, {
      key: "btn_thesis_has_double_weight",
      get: function get() {
        return "These wird doppelt gewichtet";
      }
    }, {
      key: "label_your_choice",
      get: function get() {
        return "Deine Wahl";
      }
    }, {
      key: "default_text_no_statement",
      get: function get() {
        return "<small class='text-muted'>Keine Stellungnahme.</small>";
      }
    }, {
      key: "error_loading_config_file",
      get: function get() {
        return `<b>Fehler</b>
Die Konfigurationsdatei
<a href="config/data.json"><tt>config/data.json</tt></a> konnte nicht geladen werden.
Existiert sie und enthält keine Syntaxfehler?`;
      }
    }]);

    return T;
  }();

