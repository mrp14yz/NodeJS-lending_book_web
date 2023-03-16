
$(document).ready(function () {
    setInterval( function () {
        $("#table").DataTable().ajax.reload(null, false)
    }, 30000 )

    $('#table').on('change', 'select#status-lending', function(event) {
        event.preventDefault()
        let id = $(this).attr('data-id')

        $.ajax({
            url: `/dashboard/lending_book/${ id }?_method=PUT`,
            type: "PUT",
            data: {
                status: $(this).val()
            },
            dataType: "JSON",
            success: function(data){
                $(document).Toasts('create', {
                    class: 'bg-success',
                    title: 'Success',
                    autohide: true,
                    delay: 750,
                    body: data.status
                })
                $("#table").DataTable().ajax.reload(null, false)
            }
        })
    })
})