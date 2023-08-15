function initWeightDetails() {
    $('#weight-detail').empty();

    for (var thesis_id in data.theses) {
        var thesisNumber = parseInt(thesis_id) + 1;
        let thesisGroupNumber = thesisNumber;
        if (thesisGroupNumber > 28) {
            thesisGroupNumber = 28;
        }

        var thesisGroup = data.theses[thesis_id].t;
        var group = "";
        var i = thesis_id;
        if (i == 0 || i == 3 || i == 9 || i == 15 || i == 19 || i == 24) {
            group = `<div class="card-group-name">
            <!-- These Zuordnung: -->${thesisGroup}
            </div>`;
        }

        var text = `<div class="border-bottom card weight-detail-card-${thesis_id} text-left">
${group}
<!-- These: -->        
        <div class="card-header weight-detail-header position-relative" data-content-piece="show weight detail for thesis number ${thesisNumber}">
<!-- meine Wahl -->            
<span class="badge badge-secondary" id="placeholder-your-choice-${thesis_id}"><span class="mychoice">PLACEHOLDER</span></span>
            
            <span class="text-center thesis-number thesis-number-${thesisNumber}">${thesisNumber}</span>
            <span class="card-text" >${data.theses[thesis_id].s}</span>
            <span class="float-right mr-3 closed"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
            <span class="float-right mr-3 opened"><i class="fa fal fa-times" aria-hidden="true"></i></span>
    </div>
    <div class="weight-details text-left">
        <div class="card-body">
            <!-- lead -->
            <p class="card-text ">${data.theses[thesis_id].l}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="border-bottom list-group-item">
        </li>
`;
        for (var list_id in data.lists) {
            text += `
            <li class="border-bottom list-group-item">
                ${getSelectionMarker(data.lists[list_id].img, data.answers[list_id][thesis_id].selection)}
                <span class="list-item-two">${statementOrDefault(data.answers[list_id][thesis_id].statement)}</span>
            </li>
`;
        }
        text += `
        </ul>
    </div>
</div>
`;

        $('#weight-detail').append(text);
    }
    setWeightDetailCallbacks();
    $('.weight-details').toggle();
    $('.context-text').toggle();
    //setPaginationCallbacks();
}