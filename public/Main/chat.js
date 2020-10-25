$(function () {

    var LEFT_BUBBLE_START = '<div class="bubble left">';
    var RIGHT_BUBBLE_START = '<div class="bubble right">';
    var BUBBLE_END = '</div><div class="clearfix"></div>';

    var chatHub = new ChatHub('http://localhost');

    function createBubble(side, text) {
        var start = (side == 'right') ? RIGHT_BUBBLE_START : LEFT_BUBBLE_START;
        return start + text.trim().replaceAll('\n', '<br/>') + BUBBLE_END;
    }

    function scrollToBotton() {
        $("#chat-container").animate({
            scrollTop: $('#chat-container').prop("scrollHeight")
        }, 1000);
    }

    $('#sendbtn')
        .click(function (e) {
            var text = $('#msgbox').val();
            var htmlBubble = $(createBubble('left', text));
            $('#chat-container').append(htmlBubble);
            $('#msgbox').val("");
            scrollToBotton();
            chatHub.sendMessage(text);
        });

    chatHub.onMessageReceive(function (message) {
        var htmlBubble = $(createBubble('right', message.text));
        $('#chat-container').append(htmlBubble);
        scrollToBotton();
    });
});