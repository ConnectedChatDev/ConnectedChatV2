$(function () {

    $('#loginbut').click(function () {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: '/login',
            data: //JSON.stringify(
            {
                userName: $('#username').val(),
                password: $('#password').val()
            },
            //),
            //, dataType: 'json',
            success: function () {
                window.location.href = '/Main/main.html';
            }
        }).fail(function (error) {
            alert('Login failed.');
        });

        return false;
    });

});