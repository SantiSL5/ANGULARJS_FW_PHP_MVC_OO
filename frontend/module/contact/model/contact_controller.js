function validate_contact() {
    var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    validate=true;

    if ($('#email-contact').val().length === 0) {
        validate=true;
    }else if (!emailre.test($('#email-contact').val())) {
        $('#error-email-contact').text('Introduce un email válido');
        validate=false;
    }else {
        $('#error-user-contact').text('');
    }

    if ($('#message-contact').val().length === 0) {
        $('#error-message-contact').text('Introduce un mensaje');
        validate=false;
    }else if ($('#message-contact').val().length <= 8) {
        $('#error-message-contact').text('El mensaje tiene que tener 8 o más caracteres');
        validate=false;
    }else {
        $('#error-message-contact').text('');
    }

    return validate;
}

function contact_click() {
    $('#contact-btn').on('click', function() {
        if (validate_contact()==true) {
            friendlyURL('?page=contact&op=contact').then(function(url) {
                console.log($('#message-contact').val());
                ajaxPromise(url,'POST','JSON',{'email':$('#email-contact').val(), 'message':$('#message-contact').val()}).then(function(data){
                    toastr.info("Mensaje enviado");
                }).catch(function(textStatus){
                    console.log(textStatus);
                });
            });
        }
    });
}

$(document).ready(function() {
    contact_click();
});
