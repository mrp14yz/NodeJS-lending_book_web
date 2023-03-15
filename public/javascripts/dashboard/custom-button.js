$(document).ready(function () {
    $(".buttons-colvis").on("click", function () {
        $(".dt-button-collection .dropdown-menu").css("display", "block")
    })

    $('a.buttons-columnVisibility').on('click', function(){
        let column = $('#table').DataTable().column($(this).attr('data-cv-idx'))
        column.searchable(column.visible())
    })
})