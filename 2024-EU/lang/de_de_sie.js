"use strict";

class TextResources {
    constructor() {
        this.page_title = "Bitkomat EU Wahl 2024";
        this.swype_info_message_text = "Wische, um manuell zwischen Themen zu wechseln";
        this.btn_swype_info_ok = "OK";
        this.start_subtitle = "Digitalpolitischer Parteiencheck zur EU Wahl 2024";
        this.start_explanatory_text = '<p class="text-center">Der Bitkomat ermöglicht es Ihnen, Ihre digitalpolitischen Positionen mit denen der aktuell im der EU vertretenen Parteien abzugleichen.</p>';
        this.btn_start = '"<i class="fas fa-caret-right"></i><span >Bitkomat zur EU Wahl<br>starten</span>';
        this.btn_toggle_thesis_more_text = "Erläuterung";
        this.btn_important = "<i class=\"fas fa-check-double\"></i>Thema doppelt gewichten";
        this.btn_yes_text = "<i class=\"fa fa-smile-beam\"></i>Stimme zu";
        this.btn_neutral_text = "<i class=\"fas fa-meh\"></i>Neutral";
        this.btn_no_text = "<i class=\"fas fa-frown\"></i>Stimme nicht zu";
        this.btn_skip_text = "<i class=\"fas fa-angle-double-right\"></i>Überspringen";
        this.btn_bitkomat_skip_remaining_theses = "<i class=\"fas fa-eye\"></i> Ergebnisse anzeigen";
        this._btn_make_thesis_double_weight = "Thema doppelt gewichten";
        this._btn_thesis_has_double_weight = "Thema wird doppelt gewichtet";
        this.title_results = "Ergebnisse";
        this.title_results_summary_top = `<p>Die Ergebnisse zeigen die Übereinstimmung Ihrer persönlichen Präferenzen mit den Positionen der Parteien.</p>`;
        this.title_results_summary_bottom = `<p class='text-right small'></p>`;
        this.title_results_details = "Themen"; // Details Übersicht
        this.btn_results_weight = '<i class="fa fa-check-double"></i> <span >Gewichtung der Themen</span>';
        this.btn_overview = '<i class="fa fa-smile-beam"></i> <i class="fas fa-meh"></i> <i class="fas fa-frown"></i><span >Übersicht</span>';
        this.btn_results_show_start = '<i class="fas fa-home fa-1x"></i>';
        this.pdf_print_title = 'Hier sehen Sie Ihr EU Wahl Bitkomat Ergebnis.';
        this.pdf_print_name = 'Dateiname?';
        this.pdf_print_keywords = 'Bitkomat EU, Wahlomat, Wahl, Partei, Parteiencheck, digitalpolitisch, Position, digitale Themen, digitales Thema, These, Thesen';
        this._text_no_statement = '<i>Die Partei hat ihrer Antwort auf dieses Thema keine Erläuterung hinzugefügt.</i>';
        this._error_loading_config_file = '<b>Fehler</b> Die Konfigurationsdatei <a href="config/data.json"><code>config/data.json</code></a> konnte nicht geladen werden. Existiert sie und enthält keine Syntaxfehler?';
    }

    thesis_number(number) {
        return number;
    }

    achieved_points_text(pointsForList, maxAchievablePoints) {
        const percentage = (pointsForList / maxAchievablePoints) * 100;
        return `${Math.round(percentage)}%`;
    }


    get btn_make_thesis_double_weight() {
        return this._btn_make_thesis_double_weight;
    }

    set btn_make_thesis_double_weight(value) {
        this._btn_make_thesis_double_weight = value;
    }

    get btn_thesis_has_double_weight() {
        return this._btn_thesis_has_double_weight;
    }

    set btn_thesis_has_double_weight(value) {
        this._btn_thesis_has_double_weight = value;
    }

    get default_text_no_statement() {
        return this._text_no_statement;
    }

    set default_text_no_statement(value) {
        this._text_no_statement = value;
    }

    get error_loading_config_file() {
        return this._error_loading_config_file;
    }

    set error_loading_config_file(value) {
        this._error_loading_config_file = value;
    }
}

async function httpGetAsync(theUrl) {
    // Fetching data asynchronously and handling errors
    try {
        const response = await fetch(theUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error fetching the URL:', error);
        return null;
    }
}
