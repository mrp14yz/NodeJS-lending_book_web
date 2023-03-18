
$(document).ready(function () {
    setInterval( function () {
        $("#table").DataTable().ajax.reload(null, false)
    }, 30000 )
    
    $('#btn-input').on('click', function(){
        $('.form-input-data')
            .prop('id', 'form-input')
            .attr('action', `/dashboard/account/user`)
            .show()
            .trigger('reset')
        $('.form-input-data select')
            .val('')
            .trigger('change')
        $('#btn-submit')
            .attr('form', 'form-input')
            .text('Add')
    })

    $('#table').on('click', 'button#btn-edit', function(event){
        let id = $(this).attr('data-id')
        $('.form-input-data')
            .prop('id', 'form-edit')
            .attr('action', `/dashboard/account/user/${ id }?_method=PUT`)
            .show()
        $('#btn-submit')
            .attr('form', 'form-edit')
            .text('Edit')
        
        event.preventDefault()

        $.ajax({
            url: `/dashboard/account/user/${ id }`,
            type: "GET",
            success: function(data){
                $('#form-edit #name')
                    .val(data.name)
                $('#form-edit #email')
                    .val(data.email)
                $('#form-edit #password')
                    .val(data.password)
                $('#form-edit #phone')
                    .val(data.phone)
                $('#form-edit #address')
                    .val(data.address)
                $('#form-edit #role')
                    .val(data.role.id)
                    .trigger('change')
            }
        })
    })

    $("#form-input").on("submit", function(event){
        event.preventDefault()

        $.ajax({
            url:  $(this).attr('action'),
            type: "POST",
            data: $(this).serializeArray(),
            dataType: "JSON",
            success: function(data){
                if(!data.error){
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
                    
                }else{
                    $(document).Toasts('create', {
                        class: 'bg-danger',
                        title: 'Error',
                        autohide: true,
                        delay: 3000,
                        body: data.message
                    })
                }
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
            success: function(data){
                if(!data.error){   
                    $('#staticBackdrop').modal('hide')
                    $(document).Toasts('create', {
                        class: 'bg-success',
                        title: 'Success',
                        autohide: true,
                        delay: 750,
                        body: data.status
                    })
                    $("#table").DataTable().ajax.reload(null, false)
                }else{
                    $(document).Toasts('create', {
                        class: 'bg-danger',
                        title: 'Error',
                        autohide: true,
                        delay: 1500,
                        body: data.message
                    })
                }
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
                url: `/dashboard/account/user/${ id }?_method=DELETE`,
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