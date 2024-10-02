// import { API_KEY } from './secret.js';
let flag = true;
let luckyContent = '';
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };
    // var apiKey = Environment.GetEnvironmentVariable("BING_API_KEY");

    $.ajax({
        url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '<API_KEY>'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<div class="item"><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>:<br /> ${data.webPages.value[i].snippet}</div><br />`;
            }
            if (flag==true)
            {
                luckyContent = results;
                flag = false;
            }

            $('#searchResults').html(results);
            $('#searchResults').css('display', 'block');
            $('#searchResults').dialog(
                {
                    autoOpen: false,
                    position: { my: "left top", at: "left bottom", of: button }
                }
            );
        })
        .fail(function () {
            alert('error');
        });
}
function lucky(){
    if(luckyContent=='')
    {
        alert('Please search first');
        return;
    }
    $('#searchResults').html(luckyContent);
    $('#searchResults').css('display', 'block');
    $('#searchResults').dialog(
        {
            autoOpen: false,
            position: { my: "left top", at: "left bottom", of: button }
        }
    );
}

function search()
{
    apiSearch();
}
function checkEnter(e)
{
    if(e.keyCode==13)
    {
        apiSearch();
    }
}

function displayTime() {
    var date = new Date();
    var time = date.toLocaleTimeString();
    $('#time').html(time);
    $('#time').css('display', 'block');
    $('#time').dialog({
        position: { my: "left top", at: "left bottom", of: button }
    });
}
let counter = 1;
function changeBackground() {
    counter=((counter)%2)+1;
    if (counter==2)
    {
        document.getElementById("header").style.color="rgb(18, 97, 43)";
        $('body').css('background-image', 'url("img/bg-1.jpg")');

    }
    else
    {
        document.getElementById("header").style.color="white";
        $('body').css('background-image', 'url("img/bg-2.jpg")');
    }

}


