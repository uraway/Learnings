var https   = require('https');
var request = require('request');

var HATENAID = 'uraway';
var BLOGID = 'uraway.hatenablog.com';
var APIKEY = 'tp65cffdkz';
var url = 'https://blog.hatena.ne.jp/'+HATENAID+'/'+BLOGID+'/atom/entry';
var auth = 'Basic ' + new Buffer(HATENAID+':'+APIKEY).toString('base64');


var options = {
  url: url,
  method: 'GET',
  headers: {
    'Authorization': auth
  }
}

https.request(options, function(res) {

  console.log(res.statusCode);
  console.log(res.headers);

  var body = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function() {
    console.log(body);
  });

}).on('error', function(e) {
  console.log(e.message);
}).end();
