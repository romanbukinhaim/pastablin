var pastaItemListTemplate = null;

$(function(){
    $.when(
        $.get("/pasta-item-list.hbs"),
        $.get("/api/get-cap-pasta")
    ).done((hbs_tmpl, pastaCap) => {
        pastaItemListTemplate = Handlebars.compile(hbs_tmpl[0]);
        Handlebars.registerPartial("pastaItemList", hbs_tmpl[0]);
        var pastaListTmpl = Handlebars.compile(
            "{{#each this}}\
                {{>pastaItemList .}}\
            {{/each}}"
        );
        $("#pastaCap_block").append(pastaListTmpl(pastaCap[0]));
    })
})