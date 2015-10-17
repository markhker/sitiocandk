$(function() {
    

	var form = $('#contact-form');
	$(form).submit(function(e) {
		e.preventDefault();
		var formData = $(form).serialize();
        
        $('#sender').click(function() {
            $('#form-progress').removeClass("form-sending");
        });

		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function() {
			Materialize.toast('<i class="material-icons">cloud_done</i> Tu mensaje fué enviado!', 8000, 'rounded');
             
            $('#form-progress').addClass("form-sending");
			$('#name').val('');
			$('#email').val('');
			$('#phone').val('');
            $('#business').val('');
            $('#message').val('');
		})
		.fail(function(data) {
			Materialize.toast('<i class="material-icons">cloud_off</i> Error. Favor de volver a intentar.', 8000, 'rounded');
            
		});

	});

});
