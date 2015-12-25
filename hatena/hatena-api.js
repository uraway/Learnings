var https = require('https');

var body =
'<?xml version="1.0" encoding="utf-8"?>' +
'<entry xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app">' +
  '<title>' + entryTitle + '</title>' +
  '<author><name>' + hatenaId + '</name></author>' +
  '<content type="text/plain">' +
    entryContent +
  '</content>' +
'<updated>' + '2016-01-01T00:00:00' + '</updated>' +
  '<category />' +
  '<app:control>' +
    '<app:draft>' + draftStatus + '</app:draft>' +
  '</app:control>' +
'</entry>'


var postRequest = {
    host: "blog.hatena.ne.jp",
    path: "/" + hatenaId + "/" + blogId + "/atom/entry",
    auth: "uraway: tp65cffdkz",
    method: "POST",
    headers: {
        'Cookie': "cookie",
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
    }
};

var hatenaId = "uraway";
var blogId = "uraway.hatenablog.com";
var apiKey = "tp65cffdkz";

var entryTitle = "test";
var entryContent= "test";
var draftStatus = "yes";

var buffer = "";

var req = https.request( postRequest, function( res ) {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data",function( data ) { buffer = buffer + data; } );
   res.on( "end",function( data ) { console.log( buffer ); } );

});

req.on('error',function(e) {
    console.log('problem with request: ' + e.message);
});

req.write( body );
req.end();
