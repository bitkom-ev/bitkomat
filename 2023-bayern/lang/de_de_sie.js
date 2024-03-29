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
            this.page_title = "Bitkomat Bayern";

            this.swype_info_message_text = "Wische, um manuell zwischen Themen zu wechseln";
            this.btn_swype_info_ok = "OK";
            this.start_subtitle = "Digitalpolitischer Parteiencheck zur Landtagswahl 2023";
            this.start_explanatory_text = `<p class="text-center">Der Bitkomat ermöglicht es Ihnen, Ihre digitalpolitischen Positionen mit denen der aktuell im Bayerischen Landtag vertretenen Parteien abzugleichen.</p>`;
            this.btn_start = "<i class=\"fas fa-caret-right\"></i><span >Bitkomat Bayern<br>starten</span>";
            this.btn_toggle_thesis_more_text = "Erläuterung";
            this.btn_important = "<i class=\"fas fa-check-double\"></i>Thema doppelt gewichten";
            this.btn_yes_text = "<i class=\"fa fa-smile-beam\"></i>Stimme zu";
            this.btn_neutral_text = "<i class=\"fas fa-meh\"></i>Neutral";
            this.btn_no_text = "<i class=\"fas fa-frown\"></i>Stimme nicht zu";
            this.btn_skip_text = "<i class=\"fas fa-angle-double-right\"></i>Überspringen";
            this.btn_bitkomat_skip_remaining_theses = "<i class=\"fas fa-eye\"></i> Ergebnisse anzeigen";
            this.btn_make_thesis_double_weight = 'Thema doppelt gewichten';
            this.btn_thesis_has_double_weight = 'Thema wird doppelt gewichtet';
            this.title_results = "Ergebnisse";
            this.title_results_summary_top = `<p>Die Ergebnisse zeigen die Übereinstimmung Ihrer persönlichen Präferenzen mit den Positionen der Parteien.</p>`;
            this.title_results_summary_bottom = `<p class='text-right small'></p>`;
            this.title_results_details = "Themen"; // Details Übersicht
            this.btn_results_weight = '<i class="fa fa-check-double"></i> <span >Gewichtung der Themen</span>';
            this.btn_overview = '<i class="fa fa-smile-beam"></i> <i class="fas fa-meh"></i> <i class="fas fa-frown"></i><span >Übersicht</span>';
            this.btn_results_show_start = '<i class="fas fa-home fa-1x"></i>';
            this.pdf_print_title = 'Hier sehen Sie Ihr Bayern Bitkomat Ergebnis.';
            this.pdf_print_name = 'Dateiname?';
            this.pdf_print_keywords = 'Bitkomat Bayern, Wahlomat, Landtagswahl, Wahl, Partei, Parteiencheck, digitalpolitisch, Position, digitale Themen, digitales Thema, These, Thesen';
            this.text_no_statement = '<i>Die Partei hat ihrer Antwort auf dieses Thema keine Erläuterung hinzugefügt.</i>';
            this.error_loading_config_file = '<b>Fehler</b> Die Konfigurationsdatei <a href="config/data.json"><code>config/data.json</code></a> konnte nicht geladen werden. Existiert sie und enthält keine Syntaxfehler?';
        }

        _createClass(T, [{
            key: "thesis_number",
            value: function thesis_number(number) {
                return number; // <!-- + . Thema: -->
            }
        }, {
            key: "achieved_points_text",
            value: function achieved_points_text(pointsForList, maxAchievablePoints) {
                var prozent = (pointsForList / maxAchievablePoints) * 100;
                return Math.round(prozent) + '% ';  // + pointsForList + '/' + maxAchievablePoints + ' Punkte';
            }
        },
            {
                key: "btn_make_thesis_double_weight",
                get: function get() {
                    return this.btn_make_thesis_double_weight;
                }
            }, {
                key: "btn_thesis_has_double_weight",
                get: function get() {
                    return this.btn_thesis_has_double_weight;
                }
            },
            {
                key: "default_text_no_statement",
                get: function get() {
                    return this.text_no_statement;
                }
            },
            {
                key: "error_loading_config_file",
                get: function get() {
                    return this.error_loading_config_file;
                }
            }]);

        return T;
    }();


/**
 *
 * @param theUrl
 * @returns {any}
 */
function httpGet(theUrl) {
    let xmlhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();

    return xmlhttp.response;
}