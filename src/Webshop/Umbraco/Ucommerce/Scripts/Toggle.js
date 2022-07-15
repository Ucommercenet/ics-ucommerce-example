window.addEventListener('DOMContentLoaded', (event) => {
    var html = "<span class='hide-checked'><button type='button' class='umb-toggle' checked='checked' show-labels='false' label-position='right' label-on='' label-off=''><div class='umb-toggle__toggle'><div class='umb-toggle__handler shadow-depth-1'></div><i class='umb-toggle__icon umb-toggle__icon--right icon-wrong'></i></div></button></span><span class='show-checked'><button type='button' class='umb-toggle umb-toggle--checked' checked='checked' show-labels='false' label-position='right' label-on='' label-off=''><div class='umb-toggle__toggle'><i class='umb-toggle__icon umb-toggle__icon--left icon-check'></i><div class='umb-toggle__handler shadow-depth-1'></div></div></button></span>";

    $("span.ucommerce-toggle-check-box input[type='checkbox']").toArray().forEach(function (item) {
        {
            item.parentNode.insertAdjacentHTML("beforeEnd", html);
        }
    });
});