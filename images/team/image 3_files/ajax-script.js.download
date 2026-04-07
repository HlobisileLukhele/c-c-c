// JavaScript Document
	
// Contact form //
jQuery.validator.addMethod('answercheck', function (value, element) {
			return this.optional(element) || /^\bcat\b$/.test(value);
}, "type the correct answer -_-");
	
	// validate contact form
jQuery(function($) {
	$('#contactform').validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true
				},
				answer: {
					required: true,
					answercheck: true
				}
			},
			messages: {
				name: {
					required: "Name required",
					minlength: "your name must consist of at least 2 characters"
				},
				email: {
					required: "no email, no message"
				},
				message: {
					required: "You have to write something to send this form.",
					minlength: "thats all? really?"
				},
				answer: {
					required: "sorry, wrong answer!"
				}
			},
			submitHandler: function(form) {
				
				var temuri = $('#contactform').find('#tmpuri').val();
				var htrap = $('#contactform').find('#htrap').val();
				
				var form_dt = $(form).serialize();
				
				if( htrap == "" )
				{
					$(form).ajaxSubmit({
						type: 'POST',
						url: temuri+"/wp-admin/admin-ajax.php",						
						data: $(form).serialize(),
						dataType: 'html',
						_ajax_nonce: $('#txo_email_ajax_nonce').data('nonce'),
						success: function(responseData) {
							$('#contactform :input').attr('disabled', 'disabled');
							$('#contactform').fadeTo( "slow", 0.15, function() {
								$(this).find(':input').attr('disabled', 'disabled');
								$(this).find('label').css('cursor','default');
								$('#success').fadeIn();
								//$('#result').append("Result: "+responseData);
							});
						},
						error: function(responseData) {
							$('#contactform').fadeTo( "slow", 0.15, function() {
								$('#error').fadeIn();
							});
						}
					});					
					
				}
			}
		});
});