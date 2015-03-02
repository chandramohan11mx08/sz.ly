var couchbase = require('couchbase');
var cluster = new couchbase.Cluster();

var getCouchbaseConnection = function () {
    var bucket = cluster.openBucket('szly', function (err) {
        if (err) {
            console.log("Connection to couchbase failed");
            throw err;
        }
    });
    return bucket;
};

var getValue =  function (key,callBack) {
    console.log("Inside getValue "+key);
    var bucket = getCouchbaseConnection();
    bucket.get(key, function (err, result) {
        if(callBack){
            callBack(result);
        }
    });
};

var insertKeyValue=  function (key,value,callBack) {
    var bucket = getCouchbaseConnection();
    bucket.upsert(key,value,function (err) {
        if (err) {
            console.log("Error on inserting:"+key);
        }
        else{
            console.log("Inserted "+key +" and value "+value);
        }
        if(callBack){
            callBack();
        }
    });
};



exports.getValue= getValue;
exports.insertKeyValue = insertKeyValue;