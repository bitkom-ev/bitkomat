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

var T = /*#__PURE__*/ (function () {
    function T() {
        _classCallCheck(this, T);
        this.page_title = "Bitkomat Sachsen";
        this.swype_info_message_text = "Wische, um manuell zwischen Themen zu wechseln";
        this.btn_swype_info_ok = "OK";
        this.start_subtitle = "Digitalpolitischer Parteiencheck zur Landtagswahl Sachsen 2024";
        this.start_explanatory_text = `<p class="text-center">Der Bitkomat ermöglicht es Ihnen, Ihre digitalpolitischen Positionen mit denen der aktuell im Sächsischen Landtag vertretenen Parteien abzugleichen.</p>`;
        this.btn_start = "<i class=\"fas fa-caret-right\"></i><span>Bitkomat Sachsen<br>starten</span>";
        this.btn_toggle_thesis_more_text = "Erläuterung";
        this.btn_important = "<i class=\"fas fa-check-double\"></i>Thema doppelt gewichten";
        this.btn_yes_text = "<i class=\"fa fa-smile-beam\"></i>Stimme zu";
        this.btn_neutral_text = "<i class=\"fas fa-meh\"></i>Neutral";
        this.btn_no_text = "<i class=\"fas fa-frown\"></i>Stimme nicht zu";
        this.btn_skip_text = "<i class=\"fas fa-angle-double-right\"></i>Überspringen";
        this.btn_bitkomat_skip_remaining_theses = "<i class=\"fas fa-eye\"></i> Ergebnisse anzeigen";
        this.btn_make_thesis_double_weight = "Thema doppelt gewichten";
        this.btn_thesis_has_double_weight = "Thema wird doppelt gewichtet";
        this.title_results = "Ergebnisse";
        this.title_results_summary_top = `<p>Die Ergebnisse zeigen die Übereinstimmung Ihrer persönlichen Präferenzen mit den Positionen der Parteien.</p>`;
        this.title_results_summary_bottom = `<p class='text-right small'></p>`;
        this.title_results_details = "Themen"; // Details Übersicht
        this.btn_results_weight = '<i class="fa fa-check-double"></i> <span>Gewichtung der Themen</span>';
        this.btn_overview = '<i class="fa fa-smile-beam"></i> <i class="fas fa-meh"></i> <i class="fas fa-frown"></i><span>Übersicht</span>';
        this.btn_results_show_start = '<i class="fas fa-home fa-1x"></i>';
        this.pdf_print_title = "Hier sehen Sie Ihr Sachsen Bitkomat Ergebnis.";
        this.pdf_print_name = "Dateiname?";
        this.pdf_print_keywords = "Bitkomat Sachsen, Wahlomat, Landtagswahl, Wahl, Partei, Parteiencheck, digitalpolitisch, Position, digitale Themen, digitales Thema, These, Thesen";
        this.text_no_statement = '<i>Die Partei hat ihrer Antwort auf dieses Thema keine Erläuterung hinzugefügt.</i>';
        this.error_loading_config_file = '<b>Fehler</b> Die Konfigurationsdatei <a href="config/data.json"><code>config/data.json</code></a> konnte nicht geladen werden. Existiert sie und enthält keine Syntaxfehler?';
    }

    _createClass(T, [
        {
            key: "thesis_number",
            value: function thesis_number(number) {
                return number; // <!-- + . Thema: -->
            },
        },
        {
            key: "achieved_points_text",
            value: function achieved_points_text(pointsForList, maxAchievablePoints) {
                var prozent = (pointsForList / maxAchievablePoints) * 100;
                return Math.round(prozent) + "% "; // + pointsForList + '/' + maxAchievablePoints + ' Punkte';
            },
        },
    ]);

    return T;
})();

var data = null;
var answers = null;
var currentThesis = 0;
var timeout = null;
var showSwypeInfo = false;
var thesis_id = 0;
var t = new T();

$(function () {
    translate();
    init();
    initHammer();
});

function translate() {
    for (var prop in t) {
        if (t.hasOwnProperty(prop)) {
            var id = prop.replace(/_/g, '-');
            $('#' + id).html(t[prop]);
        }
    }
}

function init() {
    // hide all: #result,
    $("#bitkomat-sachsen, #start, #intro, #weight, #result,  #header-body, #bottom").hide();
    $.getJSON("config/data.json")
        .done(function (jsondata) {
            data = jsondata;
            initOnclickCallbacks();
            initAnswers();
            loadThesis();
            recreatePagination(1, 1, currentThesis);
            initResultDetails('weight');
            $('#btn-start').prop('disabled', false);
            $("#bitkomat-sachsen").show();
            $("#spinner").hide();
        })
        .fail(function () {
            $('#error-msg').html('<div class="alert alert-danger" role="alert">' + t.error_loading_config_file + '</div>');
        });
}

function initOnclickCallbacks() {
    $('#btn-start').off('click').click(function () {
        showBitkomat();
    });
    $('#btn-start-show-qa').off('click').click(function () {
        showModal('#QAModal', '#DATAModal', '#qa-modal-body');
    });
    $('#btn-results-show-qa').off('click').click(function () {
        showModal('#QAModal', '#DATAModal', '#qa-modal-body');
    });
    $('#btn-bitkomat-sachsen-show-qa').off('click').click(function () {
        showModal('#QAModal', '#DATAModal', '#qa-modal-body');
    });
    $('#btn-bitkomat-sachsen-show-data').off('click').click(function () {
        showModal('#DATAModal', '#QAModal', '#data-modal-body');
    });
    $('#btn-results-show-share').off('click').click(function () {
        showModal('#shareModal', '#QAModal', "#share-modal-body");
    });
    $('#btn-toggle-thesis-more').off('click').click(function () {
        toggleThesisMore();
    });
    $('#btn-important').off('click').click(function () {
        toggleImportant(-1);
    });
    $('#btn-yes').off('click').click(function () {
        doYes();
    });
    $('#btn-neutral').off('click').click(function () {
        doNeutral();
    });
    $('#btn-no').off('click').click(function () {
        doNo();
    });
    $('#btn-skip').off('click').click(function () {
        doSkip();
    });
    $('#btn-bitkomat-sachsen-skip-remaining-theses').off('click').click(function () {
        showResults('weight');
    });
    $('#btn-bitkomat-sachsen-show-weight').off('click').click(function () {
        showResults('weight');
    });
    $('#btn-bitkomat-sachsen-change-weight').off('click').click(function () {
        showResults('weight');
    });
    $('#btn-bitkomat-sachsen-show-results').off('click').click(function () {
        showResults('result');
    });
    $('#text-result-summary').off('click').click(function () {
        showBitkomatFirstThesis();
    });
}

function initHammer() {
    var thesisHammer = new Hammer(document.getElementById("thesis-card"));
    thesisHammer.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
    thesisHammer.on('swipeleft', nextThesis);
    thesisHammer.on('swiperight', prevThesis);

    var resultHammer = new Hammer(document.getElementById("result-summary-row"));
    resultHammer.on('swiperight', function () {
        showBitkomat();
    });
}

function showModal(id, hide, load) {
    // Hide previous modal if specified
    if (hide) {
        hideModal(hide);
    }

    // Load content if a target is specified
    if (load) {
        let file = null;
        let ergebnis = load.match(/data/);  // Use RegExp for matching

        // Decide the file based on the content requirement
        if (ergebnis) {
            file = "./datenschutzhinweise-sachsen.html";
            trackEvent('datenschutz-sachsen', 'show');
        } else if (load.match(/qa/)) {
            file = "/2024-sachsen/faq-sachsen.html";
            trackEvent('faq-sachsen', 'show');
        }

        // If a file is specified, fetch and load its content
        if (file) {
            fetchAndLoad(file, load);
        }
    }

    // Show the modal after content is potentially loaded
    $(id).modal('show');
}

function trackEvent(category, action) {
    if (typeof _paq !== 'undefined' && _paq.push) {
        _paq.push(['trackEvent', category, action]);
    }
}

async function fetchAndLoad(file, loadTarget) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const content = await response.text();
        $(loadTarget).html(content);
    } catch (error) {
        console.error('Error loading the file:', error);
        // Handle errors or show a default/fallback content
        $(loadTarget).html('<p>Error loading content. Please try again later.</p>');
    }
}

function hideModal(id) {
    $(id).modal('hide');
}

function recreatePagination(status, real, currentThesis) {
    let thesen = Object.keys(data.theses).length;

    if (status == 0) {
        return $('#pagination').empty();
    } else {
        $('#pagination').empty();

        for (var i = 0; i < thesen; i++) {
            let current = "";
            let title = data.theses[i].s;
            let thema = data.theses[i].t;
            let currentGroup = '';

            if (currentThesis >= 0 && currentThesis <= 3 && i >= 0 && i < 4) {
                currentGroup = 'focused';
            }
            if (currentThesis >= 4 && currentThesis <= 8 && i >= 4 && i < 9) {
                currentGroup = 'focused';
            }
            if (currentThesis >= 9 && currentThesis <= 13 && i >= 9 && i < 14) {
                currentGroup = 'focused';
            }
            if (currentThesis >= 14 && currentThesis <= (thesen - 1) && i >= 14 && i < thesen) {
                currentGroup = 'focused';
            }

            if (i == 0 || i == 4 || i == 9 || i == 14) {
                var listid = i;
                $('#pagination').append('<div class="pagination-group active ' + currentGroup + '" id="pagination-group-' + i + '">');
                currentGroup = '';
                $('#pagination-group-' + i).append('   <span>' + thema + '</span>');
                $('#pagination-group-' + i).append('   <ul class="pagination " id="pagination-list-' + i + '">');
            }

            $('#pagination-list-' + listid).append(
                '<li class="page-item item-' +
                (i + 1) +
                ' ' +
                getPaginationClasses(i) +
                ' ' +
                current +
                '" title="' +
                (i + 1) +
                '. ' +
                thema +
                ': ' +
                title +
                ' öffnen">' +
                '<button class="page-link" onclick="loadThesisNumber(' +
                i +
                ')">' +
                (i + 1) +
                "</button>" +
                "</li>"
            );

            if (i == 0 || i == 4 || i == 9 || i == 14) {
                $('#pagination-group-' + i).append('</ul>');
                $('#pagination').append('</div>');
            }
        }
    }
}

function getPaginationClasses(i) {
    switch (answers[i]) {
        case "a":
            return " bg-success text-light";
        case "e":
            return " bg-success bg-double text-light";
        case "b":
            return " bg-warning text-dark";
        case "f":
            return " bg-warning bg-double text-dark";
        case "c":
            return " bg-danger text-light";
        case "g":
            return " bg-danger bg-double text-light";
        case "d":
            return "";
        case "h":
            return " bg-double";
        default:
            return "";
    }
}

function doDouble(thisThesis) {
    let char = answers[thisThesis];
    let doStatus = 0;
    if (char == 'e' || char == 'f' || char == 'g' || char == 'h') {
        doStatus = 1;
    }

    if (doStatus === 0) {
        if (char == 'a') {
            char = 'e';
        } else if (char == 'b') {
            char = 'f';
        } else if (char == 'c') {
            char = 'g';
        } else if (char == 'd') {
            char = 'h';
        }
    }
    if (doStatus === 1) {
        if (char == 'e') {
            char = 'a';
        } else if (char == 'f') {
            char = 'b';
        } else if (char == 'g') {
            char = 'c';
        } else if (char == 'h') {
            char = 'd';
        }
    }
    answers[thisThesis] = char;
    return showResults('weight');
}

function doYes() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'e';
    } else {
        answers[currentThesis] = 'a';
    }
    nextThesisAfterSelection();
    recreatePagination(1, 1, currentThesis);
}

function doNeutral() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'f';
    } else {
        answers[currentThesis] = 'b';
    }
    nextThesisAfterSelection();
    recreatePagination(1, 1, currentThesis);
}

function doNo() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'g';
    } else {
        answers[currentThesis] = 'c';
    }
    nextThesisAfterSelection();
    recreatePagination(1, 1, currentThesis);
}

function doSkip() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'h';
    } else {
        answers[currentThesis] = 'd';
    }
    nextThesisAfterSelection();
    recreatePagination(1, 1, currentThesis);
}

function toggleImportant(thisThesis = -1) {
    if (thisThesis == -1) {
        answers[currentThesis] = toggleImportantCharacter(answers[currentThesis]);
    } else {
        answers[thisThesis] = toggleImportantCharacter(answers[thisThesis]);
    }
    if (isThesisMarkedImportant()) {
        setImportant();
    } else {
        unsetImportant();
    }
}

function unsetImportant() {
    $('#btn-important').addClass('btn-light');
    $('#btn-important').removeClass('btn-success');
    $('#btn-important').text(t.btn_make_thesis_double_weight);
}

function setImportant() {
    $('#btn-important').removeClass('btn-light');
    $('#btn-important').addClass('btn-success');
    $('#btn-important').text(t.btn_thesis_has_double_weight);
}

function isThesisMarkedImportant(thisThesis = -1) {
    if (thisThesis == -1) {
        return answers[currentThesis] === 'e' || answers[currentThesis] === 'f' || answers[currentThesis] === 'g' || answers[currentThesis] === 'h';
    } else {
        return [thisThesis] === 'e' || answers[thisThesis] === 'f' || answers[thisThesis] === 'g' || answers[thisThesis] === 'h';
    }
}

function toggleImportantCharacter(char) {
    switch (char) {
        case 'a':
            return 'e';
        case 'b':
            return 'f';
        case 'c':
            return 'g';
        case 'd':
            return 'h';
        case 'e':
            return 'a';
        case 'f':
            return 'b';
        case 'g':
            return 'c';
        case 'h':
            return 'd';
        default:
            return 'd';
    }
}

function styleAnswerButtons() {
    $('#btn-yes').removeClass('btn-success');
    $('#btn-no').removeClass('btn-danger');
    $('#btn-neutral').removeClass('btn-warning');
    $('#btn-skip').removeClass('btn-secondary');
    unsetImportant();

    switch (answers[currentThesis]) {
        case "a":
            $('#btn-yes').addClass('btn-success');
            break;
        case "b":
            $('#btn-neutral').addClass('btn-warning');
            break;
        case "c":
            $('#btn-no').addClass('btn-danger');
            break;
        case "d":
            $('#btn-yes').addClass('btn-success');
            $('#btn-neutral').addClass('btn-warning');
            $('#btn-no').addClass('btn-danger');
            $('#btn-skip').addClass('btn-secondary');
            break;
        case "e":
        case "f":
        case "g":
        case "h":
            setImportant();
    }
}

function initAnswers() {
    answers = [];
    for (var i = 0; i < Object.keys(data.theses).length; i++) {
        answers.push('d');
    }
}

function loadThesisNumber(number) {
    currentThesis = number;
    loadThesis();
    recreatePagination(1, 1, currentThesis);
}

function loadThesis() {
    if (currentThesis < 0) {
        currentThesis = 0;
    }
    if (currentThesis >= Object.keys(data.theses).length) {
        currentThesis = Object.keys(data.theses).length - 1;
    }

    var thesis_id = "" + currentThesis;
    $('#btn-toggle-thesis-more').fadeOut(100);
    $('#thesis-text').fadeOut(100, function () {
        $('#thesis-text').text(data.theses[thesis_id].l);
        $('#thesis-text').fadeIn(100);
        if (data.theses[thesis_id].x !== "") {
            $('#btn-toggle-thesis-more').fadeIn(100);
        }
    });

    $('#thesis-card').removeClass(function (index, className) {
        return (className.match(/(^|\s)thesis-card-\S+/g) || []).join(' ');
    }).addClass('thesis-card-' + (currentThesis + 1));

    $('#thesis-number').text(t.thesis_number(currentThesis + 1));
    $('#thesis-number').removeClass(['bg-success', 'bg-warning', 'bg-danger', 'text-dark', 'text-light']);
    $('#thesis-number').addClass(getPaginationClasses(currentThesis));
    $('#thesis-title').text(data.theses[thesis_id].s);
    $('#thesis-thema').text(data.theses[thesis_id].t);
    $('#thesis-text').text(data.theses[thesis_id].l);
    $('#thesis-more').hide();
    $('#thesis-more').text(data.theses[thesis_id].x);
    styleAnswerButtons();
}

function nextThesisAfterSelection() {
    styleAnswerButtons();
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        nextThesis();
    }, 200);
}

function nextThesis() {
    currentThesis++;
    if (currentThesis == Object.keys(data.theses).length) {
        showResults('weight');
        window.location = "#top";
    } else {
        loadThesis();
        window.location = "#these";
    }
}

function prevThesis() {
    currentThesis--;
    loadThesis();
}

function showResults(type = 'weight') {
    var maxAchievablePoints = 0;
    var results = [];
    for (var i = 0; i < answers.length; i++) {
        maxAchievablePoints += calculatePairPoints(answers[i], answers[i]);
    }
    if (type === 'weight') {
        $("#bottom").show(200).css("display", "inline-block");
    }

    if (type === 'result') {
        $("#btn-bitkomat-sachsen-show-weight").show(200).css("display", "inline-block");

        for (var list_id in data.lists) {
            var pointsForList = 0;
            for (var x = 0; x < answers.length; x++) {
                var thesis_id = "" + x;
                pointsForList += calculatePairPoints(answers[x], data.answers[list_id][thesis_id].selection);
            }
            var list = data.lists[list_id].name;
            results.push([list, pointsForList]);
        }
        results.sort(function (a, b) {
            return b[1] - a[1];
        });

        $('#' + type + '-summary').empty();
        for (var y = 0; y < results.length; y++) {
            var result = results[y];
            var ylist = result[0];
            var ypointsForList = result[1];
            addResultSummary(ylist, ypointsForList, maxAchievablePoints, type);
        }
    }
    updateResultDetailPlaceholders(type);
    showResult(type);
}

function updateResultDetailPlaceholders(type = 'weight') {
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] === "e" || answers[i] === "f" || answers[i] === "g" || answers[i] === "h") {
            $('#placeholder-your-choice-' + i).parent().addClass('bg-info');
        }
        let mychoice = '';
        if (type === 'result') {
            mychoice = '<span class=\"mychoice\">Ihre Wahl</span>';
        }
        $('#placeholder-your-choice-' + i).replaceWith(getSelectionMarker(mychoice, answers[i]), type);
    }
}

function addResultSummary(list, pointsForList, maxAchievablePoints, type) {
    var percentage = Math.round((pointsForList / maxAchievablePoints) * 100);
    var remaining_percentage = 100 - percentage;
    var text_percentage = t.achieved_points_text(pointsForList, maxAchievablePoints);
    var text_remaining_percentage = '';
    if (percentage < 20) {
        text_remaining_percentage = text_percentage;
        text_percentage = '';
    }

    $('#' + type + '-summary').append(getSummaryProgressBar(list, percentage, remaining_percentage, text_percentage, text_remaining_percentage));
}

function getSummaryProgressBar(list, percentage, remaining_percentage, text_percentage, text_remaining_percentage) {
    var bar =
        '<div style="background-color: #07262d; color: white;" class="text-left row result-summary-row">' +
        '<div class="col-12 col-md">' +
        list +
        '</div>' +
        '<div class="col-12 col-md-10">' +
        '<div class="progress" style="height: 2rem; background-color: #07262d; color: white;">';
    if (percentage == 0) {
        remaining_percentage = 0;
        text_percentage = " 0% ";
        text_remaining_percentage = text_percentage;
    }
    if (percentage > 0) {
        bar +=
            '<div class="progress-bar main-progress-bar" role="progressbar" style="width: ' +
            percentage +
            '%; color: #07262d; background-color: white;" aria-valuenow="' +
            percentage +
            '" aria-valuemin="0" aria-valuemax="100"> ' +
            text_percentage +
            "</div>";
    }
    if (remaining_percentage == 0) {
        bar +=
            '<div class="progress-bar remaining-progress-bar text-dark" role="progressbar" ' +
            'style="width: 3%; background-color: #fff !important; color: #07262d !important;" aria-valuenow="' +
            remaining_percentage +
            '" aria-valuemin="0" ' +
            'aria-valuemax="100"> ' +
            text_remaining_percentage +
            "</div></div>";
    }

    if (remaining_percentage > 0) {
        bar +=
            '<div class="progress-bar remaining-progress-bar text-dark" role="progressbar" style="width: ' +
            remaining_percentage +
            '%; background-color: #07262d; color: white;" aria-valuenow="' +
            remaining_percentage +
            '" aria-valuemin="0" aria-valuemax="100"> ' +
            text_remaining_percentage +
            "</div></div>";
    }
    bar += "</div></div></div>";
    return bar;
}

function calculatePairPoints(self, list) {
    var str = self + list;
    switch (str) {
        case "aa":
        case "bb":
        case "cc":
            return 2;
        case "ab":
        case "ba":
        case "bc":
        case "cb":
            return 1;
        case "ea":
        case "fb":
        case "gc":
        case "ee":
        case "ff":
        case "gg":
            return 4;
        case "eb":
        case "fa":
        case "fc":
        case "gb":
        case "ef":
        case "fe":
        case "fg":
        case "gf":
            return 2;
        default:
            return 0;
    }
}

function setResultDetailCallbacks(type = 'result') {
    $('.' + type + '-detail-header').click(function () {
        $(this).toggleClass('open');
        $(this).next('.' + type + '-details').slideToggle();
    });
    $('.' + type + '-detail-footer').click(function () {
        $(this).toggleClass('open');
        $(this).prev('.' + type + '-details').slideToggle();
    });
    $('.context-header').click(function () {
        $(this).toggleClass('open');
        $(this).next('.context-text').slideToggle();
    });
}

function setPaginationCallbacks() {
    $('.pagination-group').click(function () {
        $('.pagination-group').removeClass('active');
        $(this).toggleClass('active');
    });
}

function toggleThesisMore() {
    $('#thesis-more').slideToggle();
}

function initResultDetails(type = 'weight') {
    if (type === 'result') {
        window.location = "#top";
    }
    $('#' + type + '-detail').empty();

    for (var thesis_id in data.theses) {
        var thesisNumber = parseInt(thesis_id) + 1;
        let thesisGroupNumber = thesisNumber;
        if (thesisGroupNumber > 16) {
            thesisGroupNumber = 16;
        }

        let thesisGroup = data.theses[thesis_id].t;
        let group = "";
        let i = thesis_id;

        if (i == 0 || i == 4 || i == 9 || i == 14) {
            group = `<div class="card-group-name">
            ${thesisGroup}
            </div>`;
        }

        let myAnswer = answers[thesis_id];
        let gewichtung = "";
        let gewichten = "Thema doppelt gewichten?";

        if (myAnswer === 'e' || myAnswer === 'f' || myAnswer === 'g' || myAnswer === 'h') {
            gewichtung = "double";
            gewichten = "Doppelt gewichtet";
        }

        let weight = '"';
        if (type === 'weight') {
            weight = ` tip" data-toggle="tooltip" data-text="${gewichten}" onclick="doDouble(${thesis_id})"`;
        }

        var text = `<div class="border-bottom card ${type}-detail-card-${thesis_id} text-left">
${group}
        
        <div class="card-header ${type}-detail-header position-relative">`;

        if (type === 'weight') {
            text += `<span class="text-center answer-${myAnswer} ${gewichtung} ${weight} title=""><i class="fa fa-check-double"></i></span>`;
            text += getSelectionMarker('', myAnswer, 'me');
        }
        text += `   
            <span class="text-center answer-${myAnswer} ${gewichtung}${weight} title="${gewichten}"><i class="fa fa-check-double"></i></span>
            <span class="text-center thesis-number thesis-number-${thesisNumber}">${thesisNumber}</span>
            <span class="card-text tip" data-text="Erläuterung anzeigen." >${data.theses[thesis_id].s}</span>
`;

        text += `
            <span class="float-right closed"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
            <span class="float-right opened"><i class="fa fal fa-times" aria-hidden="true"></i></span>
        </div>

    <div class="${type}-details text-left">
        <div class="card-body">
            <p class="card-text ">${data.theses[thesis_id].l}</p>
        </div>
        <ul class="list-group list-group-flush">`;

        if (type === 'result') {
            text += `
        <li class="border-bottom list-group-item">
            <span class="badge badge-secondary" id="placeholder-your-choice-${thesis_id}">
            ${getSelectionMarker('<span class=\"mychoice\">Ihre Wahl</span>', answers[i], type)}
             <span class="list-item-two">&nbsp;</span>
        </li>`;

            for (var list_id in data.lists) {
                text += `
            <li class="border-bottom list-group-item">
               ${getSelectionMarker(data.lists[list_id].img, data.answers[list_id][thesis_id].selection, 'party')} 
               <span class="list-item-two">${statementOrDefault(data.answers[list_id][thesis_id].statement)}</span>
        </li>`;
            }
        }
        text += `
        </ul>
    </div>
</div>`;

        $('#' + type + '-detail').append(text);
    }

    setResultDetailCallbacks(type);
    $('.' + type + '-details').toggle();
    $('.context-text').toggle();

    if (type === 'result') {
        $("#text-result-edit").show(200).css("display", "inline-block");
        $("#btn-bitkomat-sachsen-show-weight").show(200).css("display", "inline-block");
        $("#btn-bitkomat-sachsen-show-results").hide();
    }
    if (type === 'weight') {
        $("#text-result-edit").show(200).css("display", "inline-block");
        $("#btn-bitkomat-sachsen-show-results").show(200).css("display", "inline-block");
        $("#btn-bitkomat-sachsen-show-weight").hide();
    }
    setPaginationCallbacks();
}

function statementOrDefault(statement) {
    if (statement === "") {
        return t.default_text_no_statement;
    } else {
        return statement;
    }
}

function getSelectionMarker(list, selection, who = 'party') {
    let textA = 'Stimmt diesem Thema zu';
    let textB = 'Steht diesem Thema neutral gegenüber';
    let textC = 'Stimmt diesem Thema nicht zu';
    let textD = 'Hat dieses Thema übersprungen';

    if (who === 'me') {
        textA = 'Ich stimme diesem Thema zu';
        textB = 'Ich stehe diesem Thema neutral gegenüber';
        textC = 'Ich stimme diesem Thema nicht zu';
        textD = 'Ich habe dieses Thema übersprungen';
    }

    let anfang = '<span class="list-item"><span class="badge badge-voted" ';
    if (selection === "a" || selection === "e") {
        return anfang + ' title="' + textA + '" data-text=""><i class="fa fa-smile-beam"></i> ' + list + '</span></span>';
    }
    if (selection === "b" || selection === "f") {
        return anfang + ' title="' + textB + '" data-text=""><i class="fas fa-meh"></i> ' + list + '</span></span>';
    }
    if (selection === "c" || selection === "g") {
        return anfang + ' title="' + textC + '" data-text=""><i class="fas fa-frown"></i> ' + list + '</span></span>';
    }
    if (selection === "d" || selection === "h") {
        return anfang + ' title="' + textD + '" data-text=""><i class="fas fa-angle-double-right"></i> ' + list + '</span></span>';
    }
    return 'getSelectionMarker: error';
}

function showBitkomatFirstThesis() {
    currentThesis = 0;
    showBitkomat('edit');
    recreatePagination(1, 1, currentThesis);
    if (_paq) {
        _paq.push(['trackEvent', 'result', 'edit']);
    }
    $("#text-result-edit").hide();
    $("#btn-bitkomat-sachsen-show-weight").show(200).css("display", "inline-block");
    $("#btn-bitkomat-sachsen-show-results").show(200).css("display", "inline-block");
}

function showBitkomat(status) {
    $("#start, #intro, #weight, #result, #header-body").hide();
    loadThesis();
    $("#bitkomat-sachsen").show();
    initResultDetails('weight');
    if (showSwypeInfo) {
        showSwypeInfo = false;
        $("#swype-info").show();
    }
    if (status == "edit") {
        window.location = "#top";
        $('#btn-bitkomat-sachsen-skip-remaining-theses').fadeIn().addClass('inline');
    }
}

function showResult(type = 'weight') {
    $("#start, #bitkomat-sachsen, #intro, #weight, #result, #header-body").hide();
    $("#" + type + "").fadeIn();
    animateBars();
    initResultDetails(type);
    if (_paq) {
        _paq.push(['trackEvent', 'result', type]);
    }
}

function animateBars() {
    $('#result-summary .main-progress-bar').each(function (index) {
        var self = $(this);
        var width = self.css('width');
        var transition = self.css("transition");
        self.css("transition", "none");
        self.css('width', 0);
        setTimeout(function () {
            self.css("transition", transition);
            self.css('width', width);
        }, 200 + (index * 200));
    });
}

function hideSwypeInfo() {
    $("#swype-info").hide();
}

function thesisOk(i) {
    switch (answers[i]) {
        case "a":
        case "e":
        case "f":
        case "g":
        case "b":
        case "c":
        case "d":
        case "h":
        default:
            return '<span id="btn-thesis-ok" class="btn" title="Thema bewertet"><i class="far fa-check-circle"></i></span>';
    }
}

function printImageFrom(selected) {
    const height = $(selected).height() + 30;
    const width = $(selected).width() + 20;
    const color = '#ffffff';
    const logo = $(".bitkomat.logo");

    logo.css({
        "background-color": color,
        "visibility": "visible",
        "display": "block",
        "padding": 4,
        "z-index": 99
    });

    html2canvas(document.querySelector(selected), {
        scrollX: 0,
        scrollY: 0,
        scale: 1,
        allowTaint: true,
        backgroundColor: color,
        height: height,
        width: width,
        useCORS: true,
        logging: false,
    }).then(canvas => {
        document.body.appendChild(canvas);

        const t = new T();
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD format

        const imageData = canvas.toDataURL('image/png');
        saveAs(imageData, `${formattedDate}-bitkomat-sachsen-ergebnis.png`);

        document.body.removeChild(canvas);
        logo.css({
            "visibility": "hidden",
            "display": "none",
            "z-index": 0
        });

        if (typeof _paq !== 'undefined' && _paq.push) {
            _paq.push(['trackEvent', 'result', 'store']);
            _paq.push(['trackLink', `${formattedDate}-bitkomat-sachsen-ergebnis.png`, 'download']);
            _paq.push(['trackPageView']);
            _paq.push(['setLinkTrackingTimer', 500]);
        }
    }).catch(error => {
        console.error('Error generating the image:', error);
    });
}

function saveAs(uri, filename) {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

function createParties(append) {
    $(append).empty();
    let oddEven = '';
    let i = 0;
    try {
        for (var list_id in data.lists) {
            i++;
            let partei = data.lists[list_id].name;
            let parteiLang = data.lists[list_id].name_x;
            oddEven = 'list-group-item-primary-' + i;
            $(append).append(
                '<li class="list-group-item ' + oddEven + '"><a class="share-button dark ' + list_id + '" href="' + list_id + '.html" title="' + parteiLang + '" target="_blank">' + partei + ' ' + parteiLang + '</a></li>'
            );
        }
    } catch (ex) {
        console.log(ex + ' ERROR! append empty or does not exist: ' + append);
    }
}

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click('download');
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}
