"use strict";

var data = null;
var answers = null;
var currentThesis = 0;
var timeout = null;
var showSwypeInfo = true;
var thesis_id = 0;
var t = new T();
$(function () {
    translate();
    $('#btn-start').prop('disabled', true);

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
    $.getJSON("config/data.json")
        .done(function (jsondata) {
            data = jsondata;
            currentThesis = 0;
            initOnclickCallbacks();
            initAnswers();
            initResultDetails();
            recreatePagination();
            loadThesis();
            $('#btn-start').prop('disabled', false);
        })
        .fail(function () {
            $('#error-msg').html('<div class="alert alert-danger" role="alert">' + t.error_loading_config_file + '</div>');
        });
}

function initOnclickCallbacks() {
    $('#swype-info').off('click').click(function () {
        hideSwypeInfo();
    });
    $('#btn-start').off('click').click(function () {
        showBitkomat();
    });
    $('#btn-start-show-qa').off('click').click(function () {
        showQA();
    });
    $('#btn-bitkomat-show-qa').off('click').click(function () {
        showQA();
    });
    $('#btn-bitkomat-show-qa-t').off('click').click(function () {
        showQA();
    });
    $('#btn-bitkomat-show-qa-3').off('click').click(function () {
        showQA();
    });
    $('#btn-results-show-qa').off('click').click(function () {
        showQA();
    });
    $('#btn-toggle-thesis-more').off('click').click(function () {
        toggleThesisMore();
    });
    $('#btn-important').off('click').click(function () {
        toggleImportant();
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
    $('#btn-bitkomat-show-start').off('click').click(function () {
        showStart();
    });
    $('#btn-bitkomat-skip-remaining-theses').off('click').click(function () {
        showResults();
    });
    $('#btn-results-show-start').off('click').click(function () {
        showStart();
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

function showQA() {
    $('#QAModal').modal('show');
}

function recreatePagination() {
    $('#pagination').empty();
    for (var i = 0; i < Object.keys(data.theses).length; i++) {
        $('#pagination').append('<li class="page-item"><button class="page-link' + getPaginationClasses(i) + '" onclick="loadThesisNumber(' + i + ')">' + (i + 1) + '</button></li>');
    }
}

function updateProgressBar() {
    var percentage = Math.round(100 * (currentThesis + 1) / Object.keys(data.theses).length);
    $('#overall-progress-bar').css('width', "" + percentage + "%");
}

function getPaginationClasses(i) {
    switch (answers[i]) {
        case "a":
        case "e":
        case "b":
        case "f":
        case "c":
        case "g":
        case "d":
        case "h":
        default:
            return " text-light"; // bg-success light
    }
}

function doYes() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'e';
    } else {
        answers[currentThesis] = 'a';
    }
    recreatePagination();
    nextThesisAfterSelection();
}

function doNeutral() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'f';
    } else {
        answers[currentThesis] = 'b';
    }
    recreatePagination();
    nextThesisAfterSelection();
}

function doNo() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'g';
    } else {
        answers[currentThesis] = 'c';
    }
    recreatePagination();
    nextThesisAfterSelection();
}

function doSkip() {
    if (isThesisMarkedImportant()) {
        answers[currentThesis] = 'h';
    } else {
        answers[currentThesis] = 'd';
    }
    recreatePagination();
    nextThesisAfterSelection();
}

function toggleImportant() {
    answers[currentThesis] = toggleImportantCharacter(answers[currentThesis]);
    if (isThesisMarkedImportant()) {
        setImportant();
    } else {
        unsetImportant();
    }
}

function unsetImportant() {
    $('#btn-important').addClass('btn-light');
    $('#btn-important').removeClass('btn-success');
    //$('#btn-important').text(t.btn_make_thesis_double_weight);
}

function setImportant() {
    $('#btn-important').removeClass('btn-light');
    $('#btn-important').addClass('btn-success');
    //$('#btn-important').text(t.btn_thesis_has_double_weight);
}

function isThesisMarkedImportant() {
    return answers[currentThesis] === 'e' ||
        answers[currentThesis] === 'f' ||
        answers[currentThesis] === 'g' ||
        answers[currentThesis] === 'h';
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
        case "e":
        case "f":
        case "g":
        case "h":
            setImportant();
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
}

function loadThesis() {
    if (currentThesis < 0) {
        currentThesis = 0;
    }
    if (currentThesis >= Object.keys(data.theses).length) {
        currentThesis = Object.keys(data.theses).length - 1;
    }

    var thesis_id = "" + currentThesis;
    $('#btn-toggle-thesis-more').fadeOut(200);
    $('#thesis-text').fadeOut(200, function () {
        $('#thesis-text').text(data.theses[thesis_id].l);
        $('#thesis-text').fadeIn(200);
        if (data.theses[thesis_id].x !== "") {
            $('#btn-toggle-thesis-more').fadeIn(200);
        }
    });
    $('#thesis-number').text( t.thesis_number(currentThesis + 1) );
    $('#thesis-title').text(data.theses[thesis_id].s);
    $('#thesis-thema').text(data.theses[thesis_id].t);
    $('#thesis-text').text(data.theses[thesis_id].l);
    $('#thesis-more').hide();
    $('#thesis-more').text(data.theses[thesis_id].x);

    styleAnswerButtons();
    updateProgressBar();
}

function nextThesisAfterSelection() {
    styleAnswerButtons();
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        nextThesis();
    }, 300);
}

function nextThesis() {
    currentThesis++;
    if (currentThesis == Object.keys(data.theses).length) {
        showResults();
    } else {
        loadThesis();
    }
}

function prevThesis() {
    currentThesis--;
    loadThesis();
}

function showResults() {
    var maxAchievablePoints = 0;
    var results = [];
    for (var i = 0; i < answers.length; i++) {
        maxAchievablePoints += calculatePairPoints(answers[i], answers[i]);
    }
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

    $('#result-summary').empty();
    for (var y = 0; y < results.length; y++) {
        var result = results[y];
        var ylist = result[0];
        var ypointsForList = result[1];
        addResultSummary(ylist, ypointsForList, maxAchievablePoints);
    }
    updateResultDetailPlaceholders();
    showResult();
}

function updateResultDetailPlaceholders() {
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] === "e" || answers[i] === "f" || answers[i] === "g" || answers[i] === "h")
            $('#placeholder-your-choice-' + i).parent().addClass('bg-info');
        $('#placeholder-your-choice-' + i).replaceWith(getSelectionMarker(t.label_your_choice, answers[i]));
    }
}

function addResultSummary(list, pointsForList, maxAchievablePoints) {
    var percentage = Math.round(pointsForList / maxAchievablePoints * 100);
    var remaining_percentage = 100 - percentage;
    var text_percentage = t.achieved_points_text(pointsForList, maxAchievablePoints);
    var text_remaining_percentage = '';
    if (percentage < 20) {
        text_remaining_percentage = text_percentage;
        text_percentage = '';
    }

    $('#result-summary').append(getSummaryProgressBar(list, percentage, remaining_percentage, text_percentage, text_remaining_percentage));
}

function getSummaryProgressBar(list, percentage, remaining_percentage, text_percentage, text_remaining_percentage) {
    var bar = '<div class="text-left row result-summary-row">\
<div class="col-12 col-md">' + list + '</div>\
<div class="col-12 col-md-10">\
<div class="progress" style="height: 2rem;">';
    if (percentage > 0) {
        bar += '<div class="progress-bar main-progress-bar" role="progressbar" style="width: ' + percentage +
            '%" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100"> ' + text_percentage + '</div>';
    }
    if (remaining_percentage > 0) {
        bar += '<div class="progress-bar remaining-progress-bar text-dark" role="progressbar" style="width: ' + remaining_percentage +
            '%" aria-valuenow="' + remaining_percentage + '" aria-valuemin="0" aria-valuemax="100"> ' + text_remaining_percentage + '</div>\
</div>';
    }
    bar += '</div>\
</div>\
</div>';
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

function setResultDetailCallbacks() {
    $('.result-detail-header').click(function () {
        $(this).next('.result-details').slideToggle();
    });
    $('.result-detail-footer').click(function () {
        $(this).prev('.result-details').slideToggle();
    });
}

function toggleThesisMore() {
    $('#thesis-more').slideToggle();
}

function initResultDetails() {
    $('#result-detail').empty();

    for (var thesis_id in data.theses) {
        var thesisNumber = parseInt(thesis_id) + 1;
/** <small>' + t.thesis_number(thesisNumber) + '</small>\ **/
        var text = `
    <div class="border-bottom card result-detail-card text-left">
<!-- These: -->        
        <div class="card-header result-detail-header position-relative">
            <span class="text-center thesis-number-${thesisNumber}">${thesisNumber}</span>
            <span class="card-text" >${data.theses[thesis_id].s}</span>
            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
    </div>
    <div class="result-details text-left">
        <div class="card-body">
            <!-- lead -->
            <p class="card-text ">${data.theses[thesis_id].l}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li className="border-bottom list-group-item">
        <span className="badge badge-secondary" id="placeholder-your-choice-${thesis_id}">PLACEHOLDER</span>
        </li>
`;
        for (var list_id in data.lists) {
            text += `
            <li class="border-bottom list-group-item">
                ${ getSelectionMarker(data.lists[list_id].name, data.answers[list_id][thesis_id].selection) } 
                <span class="list-item-two">${statementOrDefault(data.answers[list_id][thesis_id].statement)}</span>
            </li>
`;
        }
        text += `
        </ul>
    </div>
</div>
`;
/**
<div class="card-footer result-detail-footer">
<span class="badge badge-secondary" id="placeholder-your-choice-${thesis_id}">PLACEHOLDER</span>
`;
for (list_id in data.lists) {
text += getSelectionMarker(data.lists[list_id].name_x, data.answers[list_id][thesis_id].selection);
}
text += `
</div>
*/
        $('#result-detail').append(text);
    }
    setResultDetailCallbacks();
    $('.result-details').toggle();
}

function statementOrDefault(statement) {
    if (statement === "") {
        return t.default_text_no_statement;
    } else {
        return statement;
    }
}

function getSelectionMarker(list, selection) {
    if (selection === "a" || selection === "e") {
        return '<span class="list-item"><span class="badge badge-success" title="stimme zu" data-text="Ich stimme dieser These zu">' + list + '</span></span>';
    }
    if (selection === "b" || selection === "f") {
        return '<span class="list-item"><span class="badge badge-warning" title="neutral" data-text="Ich stehe dieser These neutral gegenüber">' + list + '</span></span>';
    }
    if (selection === "c" || selection === "g") {
        return '<span class="list-item"><span class="badge badge-danger" title="stimme nicht zu" data-text="Ich stimme dieser These nicht zu">' + list + '</span></span>';
    }
    if (selection === "d" || selection === "h") {
        return '<span class="list-item"><span class="badge badge-secondary" title="übersprungen" data-text="Ich habe diese These übersprungen">' + list + '</span></span>';
    }
    return 'ERROR';
}

function showStart() {
    init();
    $("#bitkomat,#result").hide();
    $("#start").show();
}

function showBitkomatFirstThesis() {
    currentThesis = 0;
    showBitkomat();
}

function showBitkomat() {
    loadThesis();
    initResultDetails();
    $("#start,#result").hide();
    $("#bitkomat").fadeIn();
    if (showSwypeInfo) {
        showSwypeInfo = false;
        $("#swype-info").show();
    }
}

function showResult() {
    $("#start,#bitkomat").hide();
    $("#result").fadeIn();
    animateBars();
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
