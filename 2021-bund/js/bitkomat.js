"use strict";
// build error to stop script
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
        var id = prop.replace(/_/g, '-');
        $('#' + id).html(t[prop]);
    }
}

function init() {
    // hide all: #result,
    $("#bitkomat, #start, #intro, #weight, #result,  #header-body, #bottom").hide();
    $.getJSON("config/data.json")
        .done(function (jsondata) {
            data = jsondata;
            initOnclickCallbacks();
            initAnswers();
            loadThesis();
            recreatePagination(1, 1, currentThesis);
            initResultDetails('weight');
            $('#btn-start').prop('disabled', false);
            $("#bitkomat").show();
            $("#spinner").hide();
        })
        .fail(function () {
            $('#error-msg').html('<div class="alert alert-danger" role="alert">' + t.error_loading_config_file + '</div>');
        });
}


function initOnclickCallbacks() {
    //$('#swype-info').off('click').click(function () {        hideSwypeInfo();    });
    $('#btn-start').off('click').click(function () {
        showBitkomat();
    });
    $('#btn-start-show-qa').off('click').click(function () {
        showModal('#QAModal', '#DATAModal', '#qa-modal-body');
    });
    $('#btn-results-show-qa').off('click').click(function () {
        showModal('#QAModal', '#DATAModal', '#qa-modal-body');
    });
    $('#btn-bitkomat-show-qa').off('click').click(function () {
        showModal('#QAModal', '#DATAModal', '#qa-modal-body');
    });
    $('#btn-bitkomat-show-data').off('click').click(function () {
        showModal('#DATAModal', '#QAModal', '#data-modal-body');
    });
    $('#btn-results-show-share').off('click').click(function () {
        showModal('#shareModal', '#QAModal', "#share-modal-body");
    });
    //$('#text-result-share').off('click').click(function () {showModal('#shareModal', '#QAModal', "#share-modal-body");  });
    //$('#btn-results-show-intro').off('click').click(function () { showModal('#introModal', '#shareModal', "#intro-modal-body");  });
    //$('#btn-bitkomat-parteien').off('click').click(function () {  createParties('#parteien-modal-body');    showModal('#parteienModal', '', '');    });
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
    $('#btn-bitkomat-skip-remaining-theses').off('click').click(function () {
        showResults('weight');
    });
    $('#btn-bitkomat-show-weight').off('click').click(function () {
        showResults('weight');
    });
    $('#btn-bitkomat-change-weight').off('click').click(function () {
        showResults('weight');
    });
    $('#btn-bitkomat-show-results').off('click').click(function () {
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
    //console.log('show: ' + id + ' ' + hide + ' ' + load);
    if (hide) {
        hideModal(hide);
    }
    if (load) {
        //console.log(load);
        let file = "";
        let ergebnis = '';
        if (ergebnis = load.match('data')) {
            file = "./datenschutzhinweise.html";
            if (_paq) {
                _paq.push(['trackEvent', 'datenschutz', 'show']);
            }
        }
        /**
         if (ergebnis = load.match('intro')) {
            file = "./intro.html";
            if(_paq) { _paq.push(['trackEvent', 'intro', 'show']); }
        }
         */
        if (ergebnis = load.match('qa')) {
            file = "./faq.html";
            if (_paq) {
                _paq.push(['trackEvent', 'faq', 'show']);
            }
        }

        let html = httpGet(file);
        $(load).html(html);
    }
    $(id).modal('show');
}

function hideModal(id) {
    $(id).modal('hide');
}

function recreatePagination(status, real, currentThesis) {
    if (status == 0) {
        return $('#pagination').empty();
    } else {
        $('#pagination').empty();

        for (var i = 0; i < Object.keys(data.theses).length; i++) {
            let current = "";
            let title = data.theses[i].s;
            let thema = data.theses[i].t;
            // 1. init first group
            let currentGroup = '';
            //console.log(currentThesis);
            if (currentThesis >= 0 && currentThesis <= 2 && i >= 0 && i < 2) {
                currentGroup = 'focused';
            }
            if (currentThesis > 2 && currentThesis <= 8 && i >= 2 && i < 8) {
                currentGroup = 'focused';
            }
            if (currentThesis > 8 && currentThesis <= 14 && i >= 8 && i < 14) {
                currentGroup = 'focused';
            }
            if (currentThesis > 14 && currentThesis <= 18 && i >= 14 && i < 18) {
                currentGroup = 'focused';
            }
            if (currentThesis > 18 && currentThesis <= 23 && i >= 18 && i < 23) {
                currentGroup = 'focused';
            }
            if (currentThesis > 23 && currentThesis <= 28 && i >= 23 && i < 28) {
                currentGroup = 'focused';
            }

            if (i == 0 || i == 3 || i == 9 || i == 15 || i == 19 || i == 24) {
                var listid = i;
                $('#pagination').append('<div class="pagination-group active ' + currentGroup + '" id="pagination-group-' + i + '">');
                currentGroup = '';
                $('#pagination-group-' + i).append('   <span>' + thema + '</span>');
                $('#pagination-group-' + i).append('   <ul class="pagination " id="pagination-list-' + i + '">');
            }
            currentGroup = '';

            $('#pagination-list-' + listid).append('       ' +
                '<li class="page-item item-' + (i + 1) + ' ' + getPaginationClasses(i) + ' ' + current + '" title="' + (i + 1) + '. ' + thema + ': ' + title + ' öffnen">' +
                '<button class="page-link" onclick="loadThesisNumber(' + i + ')">' + (i + 1) + '</button>' +
                '</li>');

            if (i == 0 || i == 3 || i == 9 || i == 15 || i == 19 || i == 24) {
                $('#pagination-group-' + i).append('</ul>');
                $('#pagination').append('</div>');
            }
        }
    }
}

/**
 * function updateProgressBar
 function updateProgressBar() {
    var percentage = 0;
    if (currentThesis > 0)
        var percentage = Math.round(100 * currentThesis / Object.keys(data.theses).length);
    $('#overall-progress-bar').css('width', "" + percentage + "%");
}
 */

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

/**
 * function doDouble
 * @param thisThesis
 */
function doDouble(thisThesis) {
    let char = answers[thisThesis];
    let doStatus = 0;
    if (char == 'e' || char == 'f' || char == 'g' || char == 'h') {
        doStatus = 1;
    }
    //console.log(doStatus)
    if (doStatus === 0) {
        if (char == 'a') {
            char = 'e';
        } else if (char == 'b') {
            char = 'f';
        } else if (char == 'c') {
            char = 'g';
        } else if (char == 'd')
        {
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
        } else if (char == 'h')
        {
            char = 'd';
        }
    }
    //console.log(char);
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
    console.log(currentThesis);
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
    // remove all old thesis-card-numbers from id #thesis-card:
    var thesisCards = $('html').find('#thesis-card');
    if (thesisCards) {
        for (var i = 0; i < thesisCards.length; i++) {
            thesisCards[i].className = thesisCards[i].className.replace(/thesis-card-[a-z1-9\-]*/, '');
        }
    }
    $('#thesis-card').addClass('thesis-card-' + (currentThesis + 1));

    $('#thesis-number').text(t.thesis_number(currentThesis + 1));
    $('#thesis-number').removeClass(['bg-success', 'bg-warning', 'bg-danger', 'text-dark', 'text-light']);
    $('#thesis-number').addClass(getPaginationClasses(currentThesis));
    $('#thesis-title').text(data.theses[thesis_id].s);
    $('#thesis-thema').text(data.theses[thesis_id].t);
    $('#thesis-text').text(data.theses[thesis_id].l);
    $('#thesis-more').hide();
    $('#thesis-more').text(data.theses[thesis_id].x);
    styleAnswerButtons();
    //updateProgressBar();
    //setPaginationCallbacks();
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
        // show bottom navigation
        // (500).css("display", "inline-block");
        $("#bottom").show(200).css("display", "inline-block");
    }

    if (type === 'result') {
        // show gewichten button
        $("#btn-bitkomat-show-weight").show(200).css("display", "inline-block");

        for (var list_id in data.lists) {
            var pointsForList = 0;
            for (var x = 0; x < answers.length; x++) {
                var thesis_id = "" + x;
                pointsForList += calculatePairPoints(answers[x], data.answers[list_id][thesis_id].selection);
            }
            var list = data.lists[list_id].name; // name_x
            results.push([list, pointsForList]);
        }
        results.sort(function (a, b) {
            if (a[1] == b[1]) {
                return 0;
            } else if (a[1] > b[1]) return -1;
            return 1;
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
    var percentage = Math.round(pointsForList / maxAchievablePoints * 100);
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
    var bar = '<div style="background-color: #07262d; color: white;" class="text-left row result-summary-row">\
<div class="col-12 col-md">' + list + '</div>\
<div class="col-12 col-md-10">\
<div class="progress" style="height: 2rem; background-color: #07262d; color: white;">';
    if (percentage == 0) {
        remaining_percentage = 0;
        text_percentage = ' 0% ';
        text_remaining_percentage = text_percentage;
    }
    if (percentage > 0) {
        bar += '<div class="progress-bar main-progress-bar" role="progressbar" style="width: ' + percentage +
            '%; color: #07262d; background-color: white;" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100"> ' + text_percentage + '</div>';
    }
    if (remaining_percentage == 0) {
        bar += '<div class="progress-bar remaining-progress-bar text-dark" role="progressbar" ' +
            'style="width: 3%; background-color: #fff !important; color: #07262d !important;" aria-valuenow="' + remaining_percentage + '" aria-valuemin="0" ' +
            'aria-valuemax="100"> ' + text_remaining_percentage + '</div>\
</div>';
    }

    if (remaining_percentage > 0) {
        bar += '<div class="progress-bar remaining-progress-bar text-dark" role="progressbar" style="width: ' + remaining_percentage +
            '%; background-color: #07262d; color: white;" aria-valuenow="' + remaining_percentage + '" aria-valuemin="0" aria-valuemax="100"> ' + text_remaining_percentage + '</div>\
</div>';
    }
    bar += '</div>\
</div>\
</div>';
    return bar;
}

/**
 * function calculatePairPoints
 * @param self
 * @param list
 * @returns {number}
 */
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
        console.log('clicked');
        console.log(thisThesis);
        $('.pagination-group').removeClass('active');
        $(this).toggleClass('active');
    });
}

function toggleThesisMore() {
    $('#thesis-more').slideToggle();
}

// ok
function initResultDetails(type = 'weight') {
    //console.log(type);
    if (type === 'result') {
        window.location = "#top";
    }
    $('#' + type + '-detail').empty();

    for (var thesis_id in data.theses) {
        var thesisNumber = parseInt(thesis_id) + 1;
        let thesisGroupNumber = thesisNumber;
        if (thesisGroupNumber > 28) {
            thesisGroupNumber = 28;
        }

        let thesisGroup = data.theses[thesis_id].t;
        let group = "";
        let i = thesis_id;
        // <!-- Thema Zuordnung: -->
        if (i == 0 || i == 3 || i == 9 || i == 15 || i == 19 || i == 24) {
            group = `<div class="card-group-name">
            ${thesisGroup}
            </div>`;
        }

        let myAnswer = answers[thesis_id];

        let gewichtung = "";
        let gewichten = "Thema doppelt gewichten?";
// gewichtung:
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
<!-- Thema: -->        
        <div class="card-header ${type}-detail-header position-relative" data-content-piece="show ${type} detail for thesis number ${thesisNumber}">`;
// gewichtung: tooltip" data-toggle="tooltip" data-text="Thema doppelt gewichten?"
        if (type === 'weight') {
            text += `<span class="text-center answer-${myAnswer} ${gewichtung} ${weight} title=""><i class="fa fa-check-double"></i></span>`;
            text += getSelectionMarker('', myAnswer, 'me');
        }
        text += `   
            <span class="text-center answer-${myAnswer} ${gewichtung}${weight} title="${gewichten}"><i class="fa fa-check-double"></i></span>
            <span class="text-center thesis-number thesis-number-${thesisNumber}">${thesisNumber}</span>
            <span class="card-text" >${data.theses[thesis_id].s}</span>
`;
//      text += getSelectionMarker('', myAnswer, 'me');
        text += `
            <span class="float-right closed"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
            <span class="float-right opened"><i class="fa fal fa-times" aria-hidden="true"></i></span>
        </div>

    <div class="${type}-details text-left">
        <div class="card-body">
            <!-- lead -->
            <p class="card-text ">${data.theses[thesis_id].l}</p>
        </div>
        <ul class="list-group list-group-flush">`
        ;

        if (type === 'result') {
            text += `
        <!-- meine Wahl -->
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
                <!-- Wissenschaftlicher Kontext hier einfügen  -->
             <span class="context list-item-three position-relative">
             <span class=" context-header" data-content-piece="show result detail context thesis number ${thesisNumber}">
                 <button type="button" class="btn btn-light" data-text="">
                     <span class="float-right closed"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                     <span class="float-right opened"><i class="fa fal fa-times" aria-hidden="true"></i></span>
                     Wissenschaftliche Einordnung
                </button>
            </span>
             <span class="context-text">
                <blockquote cite="//nrwschool.de"><span>NRW School of Governance:</span><br>"${statementOrDefault(data.answers[list_id][thesis_id].context)}"</blockquote></span>
             </span>
        </li>
`;
            }
        }
        text += `
        </ul>
    </div>
</div>
`;

        $('#' + type + '-detail').append(text);
    }

    setResultDetailCallbacks(type);
    $('.' + type + '-details').toggle();
    $('.context-text').toggle();

    // toggle & switch weight result nav buttons in bottom:
    if (type === 'result') {
        $("#text-result-edit").show(200).css("display", "inline-block");
        $("#btn-bitkomat-show-weight").show(200).css("display", "inline-block");
        $("#btn-bitkomat-show-results").hide();
        console.log('hide button show results, show weight');
    }
    if (type === 'weight') {
        $("#text-result-edit").show(200).css("display", "inline-block");
        $("#btn-bitkomat-show-results").show(200).css("display", "inline-block");
        $("#btn-bitkomat-show-weight").hide()
        console.log('hide button show weight, show result');
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
    let textsA = 'stimme zu';
    let textsB = 'neutral';
    let textsC = 'stimme nicht zu';
    let textsD = 'übersprungen';

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
    // tip ?
    let anfang = '<span class="list-item"><span class="badge badge-voted" ';
    if (selection === "a" || selection === "e") { // badge-success
        return anfang + ' title="' + textA + '" data-text=""><i class="fa fa-smile-beam"></i> ' + list + '</span></span>';
    }
    if (selection === "b" || selection === "f") { // badge-warning
        return anfang + ' title="' + textB + '" data-text=""><i class="fas fa-meh"></i> ' + list + '</span></span>';
    }
    if (selection === "c" || selection === "g") { // badge-danger
        return anfang + ' title="' + textC + '" data-text="">  <i class="fas fa-frown"></i> ' + list + '</span></span>';
    }
    if (selection === "d" || selection === "h") { // badge-secondary
        return anfang + ' title="' + textD + '" data-text=""> <i class="fas fa-angle-double-right"></i> ' + list + '</span></span>';
    }
    return 'getSelectionMarker: error';
}

/**
 function showIntro() {
    $("#header-body").show();
    //$('#element').fadeIn().addClass('inline');
}
 */
function showBitkomatFirstThesis() {
    currentThesis = 0;
    showBitkomat('edit');
    recreatePagination(1, 1, currentThesis);
    // track edit result:
    if (_paq) {
        _paq.push(['trackEvent', 'result', 'edit']);
    }
    //setPaginationCallbacks();
    $("#text-result-edit").hide();
    $("#btn-bitkomat-show-weight").show(200).css("display", "inline-block");
    $("#btn-bitkomat-show-results").show(200).css("display", "inline-block");

}

// Themen bewerten id bitkomat
function showBitkomat(status) {
    $("#start, #intro, #weight, #result, #header-body").hide();
    loadThesis();
    $("#bitkomat").show();
    initResultDetails('weight');
    if (showSwypeInfo) {
        showSwypeInfo = false;
        $("#swype-info").show();
    }
    if (status = "edit") {
        window.location = "#top";
        $('#btn-bitkomat-skip-remaining-theses').fadeIn().addClass('inline');
    }
}

function showResult(type = 'weight') {
    $("#start, #bitkomat, #intro, #weight, #result, #header-body").hide();
    $("#" + type + "").fadeIn();
    animateBars();
    initResultDetails(type);
    // track show result:
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
            return "<span id=\"btn-thesis-ok\" class=\"btn \" title=\"Thema bewertet\"><i class=\"far fa-check-circle\"></i></span>";

    }
}

/**
 *  function printImageFrom to generate png with html2canvas
 */
function printImageFrom(selected) {
    let height = $(selected).height();
    let width = $(selected).width();
    let color = '#fff';
    let logo = $("#bitkomat-logo");
    logo.css({
        "visibility": "visible",
        "display": "block",
        "z-index": 99
    });

    html2canvas(document.querySelector(selected), {
            scrollX: 0,
            scrollY: 0,
            scale: '1',
            allowTaint: true,
            backgroundColor: color,
            height: height,
            letterRendering: 1,
            logging: 1,
            width: width,
            useCORS: 1,
            onrendered: function (canvas) {
                setDPI('canvas', 300);
                document.body.appendChild(canvas);
            }
        }
    ).then(canvas => {
        document.body.appendChild(canvas);

        // get translations:
        var t = new T();

        // build now date:
        let dt = new Date();
        let month = "" + (dt.getMonth() + 1);
        let day = "" + dt.getDate();
        let year = dt.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        let now = [year, month, day].join("-")

        //let name = prompt(t.pdf_print_name);
        let imageData = canvas.toDataURL('image/png')
// -' + name + '
        saveAs(imageData, now + '-bitkomat-ergebnis.png');
        document.body.removeChild(canvas);
        // reset:
        logo.css({
            "visibility": "hidden",
            "display": "none",
            "z-index": 0
        });
        // matomo track download:
        if (_paq) {
            _paq.push(['trackEvent', 'result', 'store']);
            _paq.push(['trackLink', now + '-bitkomat-ergebnis.png', 'download'])
            _paq.push(['trackPageView']);
            _paq.push(['setLinkTrackingTimer', 500]); // 500 250 milliseconds
        }

    });
}

/**
 * createParties from list
 * @param status
 */
function createParties(append) {
    // init: clear:
    $(append).empty();
    let oddEven = '';
    let i = 0;
    try {
        for (var list_id in data.lists) {
            i++;
            let partei = data.lists[list_id].name;
            let parteiLang = data.lists[list_id].name_x;
            oddEven = 'list-group-item-primary-' + i;
            $(append).append('' +
                '<!-- ' + partei + ' --><li class="list-group-item ' + oddEven + '"><a class="share-button dark ' + list_id + '" href="' + list_id + '.html" title="' + parteiLang + '" target="_blank">' + partei + ' ' + parteiLang + '</a></li>');
        }
    } catch (ex) {
        console.log(ex + ' ERROR! append empty or does not exist: ' + append);   // continue regardless of error
    }

}


/**
 * function saveAs
 * @param uri
 * @param filename
 */
function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click('download');

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}