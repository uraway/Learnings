var $ = require('jquery');
var request = require('request');

var baseUrl = 'http://cloud.feedly.com/v3/search/feeds?query=';
var queryUrl = 'http://uraway.hatenablog.com/feed';
var url = baseUrl + queryUrl;

function getFeedly(url) {
  request(url, function(err, response, body) {
    body = JSON.parse(body);

    console.log(body.results[0].subscribers);
  });
}

function ajaxGet(url) {
  $.ajax({
    url: url,
    dataType: 'JSON',
    type: 'GET',
    success: function(res) {
      console.log(res);
    },

    error: function(err) {
      console.log(err);
    },

  });
}

getFeedly(url);
ajaxGet(url);
