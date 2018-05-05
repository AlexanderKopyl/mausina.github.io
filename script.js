var latitude;
var longitude;
var people;
var peoples;
var time = new Date();
// var cords ={lat: -25.363, lng: 131.044};
var cords;
cords ={lat: -25.363, lng: 131.044};


function initMap() {


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: cords
    });

    var marker = new google.maps.Marker({
        position: cords,
        map: map,
        title: 'Hello World!'
    });


    setInterval(function () {

        $.ajax({
            url: "http://api.open-notify.org/iss-now.json",
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        })
            .done(function (data) {
                if (console && console.log) {
                    var datas = "";
                    var location;
                    datas = data;
                    location = JSON.parse(datas);
                    latitude = location.iss_position.latitude;
                    longitude = location.iss_position.longitude;
                    cords.lat = parseFloat(latitude);
                    cords.lng = parseFloat(longitude);
                    marker.setPosition(cords);

                    // console.log( "Sample of data:", cords);
                }
            })
        $('.Location').html("longitude:" + cords.lng + "," + "latitude:" + cords.lat);
        $('.TimeDay').html(moment().format(' dddd Do  MMMM YYYY '));
        $('.Time').html('Curent UTC TIME: ' + time.getUTCHours() + " : " + time.getUTCMinutes());
        $('.TotalAmount').html('TotalAmount:' + " " + peoples.length + " people on ISS");

    }, 5000);
        $('<div>', {class: 'LocationBox'}).appendTo('.box');
        $('<span>', {class: 'LocationHeader', text: 'ISS is now Located at:'}).appendTo('.LocationBox');

        $('<span>', {
            class: 'Location',
            text: "longitude:" + cords.lng + "," + "latitude:" + cords.lat
        }).appendTo('.LocationBox');
       
    $.ajax({
        url: "http://api.open-notify.org/astros.json",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
    })
        .done(function (data) {
            if (console && console.log) {
                people = JSON.parse(data);
                peoples = people.people;
                $('<span>', {
                    class: 'Time',
                    text: 'Curent UTC TIME: ' + time.getUTCHours() + " : " + time.getUTCMinutes()
                }).appendTo('.time-box');
                $('<span>', {class: 'TimeDay', text: moment().format(' dddd Do  MMMM YYYY ')}).appendTo('.time-box');

                for (var i = 0; i < peoples.length; i++) {
                    $('<div>', {class: 'astonavts peopl' + i, text: peoples[i]['name']}).appendTo('.people-box');

                }
                $('<img>', {src: 'img/people.jpg', width: '20', height: '20'}).appendTo('.astonavts');
                $('<span>', {
                    class: 'TotalAmount',
                    text: 'TotalAmount:' + " " + peoples.length + " people on ISS"
                }).appendTo('.people-box');

                // console.log(peoples.length);
                // console.log( "Sample of data:", cords);
            }
        });

}