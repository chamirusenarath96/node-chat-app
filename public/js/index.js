var socket = io();

function scrollToBottom () {
    var message = jQuery('#messages');

    var clientHeight = message.prop('clientHeight');
    var scrollTop  = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessage = message.children('li:last-child');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        console.log('Should Scroll');
    }

};

socket.on('connect', () => {
    console.log('Connected to the Server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the Server');
});

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();

});

socket.on('newLocationMessage', function (message) {  
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
        messageTextBox.val('');
    });
});

var locationButton  = jQuery('#send-location') 
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location ....');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        console.log(position);
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    })
})
