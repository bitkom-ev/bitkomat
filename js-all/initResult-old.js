function initResultDetails() {
    $('#result-detail').empty();

    for (var thesis_id in data.theses) {
        var thesisNumber = parseInt(thesis_id) + 1;
        let thesisGroupNumber = thesisNumber;
        if (thesisGroupNumber > 28) {
            thesisGroupNumber = 28;
        }

        var thesisGroup = data.theses[thesis_id].t;
        var thesisGroupAfter = data.theses[thesisGroupNumber].t;
        var group = "";
        var text = `<div class="border-bottom card result-detail-card-${thesis_id} text-left">
<!-- Thema Zuordnung: -->${group}
<!-- These: -->        
        <div class="card-header result-detail-header position-relative">
            <span class="text-center thesis-number thesis-number-${thesisNumber}">${thesisNumber}</span>
            <span class="card-text" >${data.theses[thesis_id].s}</span>
            <span class="float-right closed"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
            <span class="float-right opened"><i class="fa fal fa-times" aria-hidden="true"></i></span>
    </div>
    <div class="result-details text-left">
        <div class="card-body">
            <!-- lead -->
            <p class="card-text ">${data.theses[thesis_id].l}</p>
        </div>
        <ul class="list-group list-group-flush">
        <!-- meine Wahl -->
        <li class="border-bottom list-group-item">
            <span class="badge badge-secondary" id="placeholder-your-choice-${thesis_id}"><span class="mychoice">PLACEHOLDER</span></span>
             <span class="list-item-two">&nbsp;</span>
        </li>
`;
        /**
         <!-- Wissenschaftlicher Kontext  -->
         <span class="context list-item-three">
         <span class=" context-header">
         <button type="button" class="btn btn-light">
         <span class="float-left closed"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
         <span class="float-left opened"><i class="fa fal fa-times" aria-hidden="true"></i></span>
         wissenschaftliche Einordnung
         </button>
         </span>
         <span class="context-text">${statementOrDefault(data.answers[list_id][thesis_id].context)}</span>
         </span>
         */
        for (var list_id in data.lists) {
            text += `
            <li class="border-bottom list-group-item">
                ${getSelectionMarker(data.lists[list_id].img, data.answers[list_id][thesis_id].selection)} 
                <span class="list-item-two">${statementOrDefault(data.answers[list_id][thesis_id].statement)}</span>
<!-- Wissenschaftlicher Kontext hier einfügen -->
            </li>
`;
        }
        text += `
        </ul>
    </div>
</div>
`;

        $('#result-detail').append(text);
    }
    setResultDetailCallbacks();
    $('.result-details').toggle();
    $('.context-text').toggle();
    //setPaginationCallbacks();
}