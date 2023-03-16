$(function () {
    $("#table").DataTable({
        dom: "Bfrtip",
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        serverMethod: "get",
        ajax: {
            url: '/dashboard/lending_book/fetch',
        },
        columns: [
            { 
                data: "id",
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            { 
                data: "user", 
                render: function (data, type, row, meta) {
                    return type == "display" ?
                    `
                        <p data-user-id="${data.id}">${data.name}</p>
                    ` : data.name
                }
            },
            { data: "book.title" },
            { 
                data: "createdAt",
                render: function (data, type, row, meta) {
                    return data.split('T')[0]
                }
            },
            { data: "isLate" },
            { data: "status" },
            {
                data: null, width: "20%",
                render: function (data, type, row, meta) {
                return type === "display"
                    ? 
                `
                    <select id='status-lending' data-id='${ data.id }'>
                        <option ${ data.status == 'process' ? "selected" : "" } value="process">Process</option>
                        <option ${ data.status == 'accepted' ? "selected" : "" } value="accepted">Accepted</option>
                        <option ${ data.status == 'declined' ? "selected" : "" } value="declined">Declined</option>
                        <option ${ data.status == 'returned' ? "selected" : "" } value="returned">Returned</option>
                    </select>
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