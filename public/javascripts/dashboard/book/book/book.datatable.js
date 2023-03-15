$(function () {
    $("#table").DataTable({
        dom: "Bfrtip",
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        serverMethod: "get",
        ajax: {
            url: '/dashboard/book/book/fetch',
        },
        columns: [
            { 
                data: "id",
                width: "5%",
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            { data: "title" },
            { data: "slug", visible: false, searchable: false },
            { data: "isbn", visible: false, searchable: false },
            { 
                data: "cover",
                width: '20%',
                render: function (data, type, row, meta) {
                    return type == "display" ? `
                        <img src="${data}" alt="${data}" class="img-fluid" data-toggle="modal" data-target="#modal-image">
                    ` : data
                }
            },
            { data: "author.name" },
            { data: "category.name" },
            { 
                data: "publish", 
                visible: false, 
                searchable: false,
                render: function (data, type, row, meta) {
                    return data ? data.split('T')[0] : null
                }
            },
            { data: "total_pages", visible: false, searchable: false },
            { data: "description", visible: false, searchable: false },
            { 
                data: "createdAt", 
                visible: false, 
                searchable: false,
                render: function (data, type, row, meta) {
                    return data.split('T')[0]
                }
            },
            {
                data: "id",
                width: '10%',
                render: function (data, type, row, meta) {
                return type === "display"
                    ? 
                `                      
                <button type="button" id="btn-edit" class="btn btn-app bg-teal" data-toggle="modal"  data-id=${data} data-target="#staticBackdrop">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button type="button" id="btn-delete" class="btn btn-app bg-danger" data-id=${data}>
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
                `
                    : data;
                },
            },
        ],
        buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
    })
    .buttons()
    .container()
    .appendTo("#table_wrapper .col-md-6:eq(0)")
})

$(document).ready(function () {
    $('.select2').select2()
    $('[data-mask]').inputmask()

    $('#table').on('click', 'img.img-fluid', function(event){
        $('#img-modal').attr('src', $(this).attr('src'))
    })
})