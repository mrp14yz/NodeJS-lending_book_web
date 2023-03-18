$(document).ready(function () {
    $("header").on('click', '.dropdown-toggle', function () {
        $.ajax({
            url: `/category/fetch`,
            type: "GET",
            success: function(data){
                let html = ''
                data.forEach(category => {
                    html += `<li><a class="dropdown-item" href="/category/${ category.slug }">${ category.name }</a></li>`
                })
                
                $('header .dropdown-menu').html(html)
            }
        })
    })
})