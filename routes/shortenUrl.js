var shortid = require('shortid');
var couchbaseHandler = require('./dbhandles/couchbase_handle');

shortenUrl = function (req, res) {
    var url = req.query.url;

        var generatedId = shortid.generate();
        var handler = couchbaseHandler;

        var insertKeyValue = function(result){
            if(!result){
                var value = {id:generatedId,url: url};
                handler.insertKeyValue(generatedId, value);
                return;
            }
            console.log("Already exists");
        };

        handler.getValue(generatedId,insertKeyValue);



    res.send(generatedId);
};

exports.shortenUrl = shortenUrl;