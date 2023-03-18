
$(document).ready(function () {
    setInterval( function () {
        $("#table").DataTable().ajax.reload(null, false)
    }, 30000 )

    $('#btn-input').on('click', function(){
        $('.form-input-data')
            .prop('id', 'form-input')
            .attr('action', `/dashboard/book/book`)
            .show()
            .trigger('reset')
        $('.form-input-data select')
            .val('')
            .trigger('change')
        pond.removeFile()
        $('#btn-submit')
            .attr('form', 'form-input')
            .text('Add')
    })

    $('#table').on('click', 'button#btn-edit', function(event){
        let id = $(this).attr('data-id')
        $('.form-input-data')
            .prop('id', 'form-edit')
            .attr('action', `/dashboard/book/book/${ id }?_method=PUT`)
            .show()
            
        $('#btn-submit')
            .attr('form', 'form-edit')
            .text('Edit')
        
        event.preventDefault()

        $.ajax({
            url: `/dashboard/book/book/${ id }`,
            type: "GET",
            success: function(data){
                pond.addFile(data.cover)
                $('#form-edit #title')
                    .val(data.title)
                $('#form-edit #isbn')
                    .val(data.isbn)
                $('#form-edit #author')
                    .val(data.author.id)
                    .trigger('change')
                $('#form-edit #category')
                    .val(data.category.id)
                    .trigger('change')
                $('#form-edit #publish')
                    .val(data.publish)
                $('#form-edit #total_pages')
                    .val(data.total_pages)
                $('#form-edit #description')
                    .val(data.description)
            }
        })
    })

    $("#form-input").on("submit", function(event){
        event.preventDefault()
        
        let formData = new FormData(this)
        $.ajax({
            url:  $(this).attr('action'),
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data){
                $('#staticBackdrop').modal('hide')
                $(document).Toasts('create', {
                    class: 'bg-success',
                    title: 'Success',
                    autohide: true,
                    delay: 750,
                    body: data.status
                })
                setTimeout(function(){
                    $("#table").DataTable().ajax.reload(null, false)
                }, 2000)
            }
        })  
    }) 

    $("#form-edit").on("submit", function(event){
        event.preventDefault()

        $.ajax({
            url: $(this).attr('action'),
            type: "PUT",
            data: $(this).serializeArray(),
            dataType: "JSON",
            success: function(){
                $('#staticBackdrop').modal('hide')
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

    $('#table').on('click', 'button#btn-delete', function(event){
        event.preventDefault()

        let id = $(this).attr('data-id')

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: `/dashboard/book/book/${ id }?_method=DELETE`,
                type: "DELETE",
                success: function(){
                    $('#staticBackdrop').modal('hide')
                    
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    $("#table").DataTable().ajax.reload(null, false)
                }
            })
        }
        })
    })
})