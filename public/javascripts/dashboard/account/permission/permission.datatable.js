$(function () {
    $("#table").DataTable({
        dom: "Bfrtip",
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        serverMethod: "get",
        ajax: {
            url: '/dashboard/account/permission/fetch',
        },
        columns: [
            { 
                data: "id",
                width: "6%",
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            { data: "name" },
            { data: "description" },
            {
                data: "id", width: "20%",
                render: function (data, type, row, meta) {
                return type === "display"
                    ? 
                `                      
                <button type="button" id="btn-edit" class="btn btn-app bg-teal" data-toggle="modal"  data-id=${data} data-target="#staticBackdrop">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button type="button" id="btn-delete" class="btn btn-app bg-danger" data-id=${data}">
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