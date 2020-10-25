$(function () {

    var elUserName = $('#username'); //username textbox element! (not the value)
    var elPassword = $('#password'); //password textbox element! (not the value)
    var elEmail = $('#email'); //email textbox element! (not the value)
    var elConfirmPass = $('#comfirmpass'); //confirmpass textbox element! (not the value)



    $('#confirmbtn').click(function () {
        event.preventDefault();
        if (elUserName.val() != "" && elPassword.val() != "" && elEmail.val() != "" && elConfirmPass.val() != "") {
            if (elPassword.val() == elConfirmPass.val()) {
                postRegister();
            } else {
                alert("The two passwords don't match");

            }
        } else {
            alert("Fill all the textboxes.");
        }



        return false;
    });

    function postRegister() {
        $.ajax({
            type: "POST",
            url: '/register',
            data: //JSON.stringify(
            {
                username: $('#username').val(),
                password: $('#password').val(),
                email: $('#email').val(),
                confirmpass: $('#confirmpass').val()
            },
            //),
            //, dataType: 'json',
            success: function () {
                window.location.href = '/Login&Register/login.html';
            }
        }).fail(function (error) {
            alert(error.responseJSON.errorMessage);
        });
    }

});