var $resultContainer = $('#result_container');
var $inputBox = $('#input_url');
var getRegExForUrlValidation = function (){
    var regex = new RegExp(
        "^" +
            // protocol identifier
            "(?:(?:https?|ftp)://)?" +
            // user:pass authentication
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
            // host name
            "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
            "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
            "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
            ")" +
            // port number
            "(?::\\d{2,5})?" +
            // resource path
            "(?:/\\S*)?" +
            "$", "i"
    );
    return regex;
};

var validateUrl = function(url){
    var regexForUrlValidation = getRegExForUrlValidation();
    return regexForUrlValidation.test(url);
};

var displayErrorMessage = function (message, isUrl) {
    $resultContainer.empty();
    $resultContainer.html(message);
};

var displayShortenUrl = function(message, isUrl){
    var anchorTag = "<a href="+message+" target='blank'>"+message+"</a>";
    $resultContainer.empty();
    $resultContainer.html(anchorTag);
};

var getAbsoluteShortenedUrl = function (hostName, shortId) {
    return "http://" + hostName + "/" + shortId;
};

function shortenUrlAjax() {
    var formParams = $('#shorten_url').serialize();
    $.ajax({type: 'GET', url: '/shortenUrl', data: formParams,
        success: function (response) {
            var shortId = response;
            var hostName = location.hostname;
            var shortUrl = getAbsoluteShortenedUrl(hostName, shortId);
            displayShortenUrl(shortUrl);
        },
        error: function (xhr, status, error) {
            displayErrorMessage("Something went wrong. Please try again");
        },
        async: false

    });
}

$(document).ready(function(){

    $inputBox.bind('input',function(){
        displayErrorMessage("");
    });

    $('#shortenUrl').click(function(){

        var inputUrl = $inputBox.val();
        var isValidUrl = validateUrl(inputUrl);
        if(isValidUrl){
            shortenUrlAjax();
        }
        else{
            displayErrorMessage("Provide a valid URL");
        }
    });
});