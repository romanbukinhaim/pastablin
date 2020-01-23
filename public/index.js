var pastaItemListTemplate = null;

$(function(){
    $('.ui.dropdown').dropdown()
    $('.ui.checkbox').checkbox()

    $('form#postPasta').form({
        fields: {
            title: {
                identifier: 'title',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Введите наименование пасты'
                    },
                    {
                        type   : 'maxLength[256]',
                        prompt : 'Наименование пасты слишком длинное! Максисмальное кол-во символов 256'
                    }
                ]
            },
            text: {
                identifier: 'text',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Введите текст пасты'
                    },
                    {
                        type   : 'maxLength[1024]',
                        prompt : 'Паста слишком длинная! Максисмальное кол-во символов 1024'
                    }
                ]
            }
        }
    });

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


function copy2clipboard(place){
    var $temp = $("<input>");
    $("body").append($temp);
    if (place == "nav_string") $temp.val(document.location.href).select();
    else if (place == "pasta_text") $temp.val($("pre.prettyprint")[0].innerText).select();
    document.execCommand("copy");
    $temp.remove();
}