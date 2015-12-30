var http = require('http');
var url = 'http://cloud.feedly.com/v3/search/feeds?query=' + qeryTerm;
var qeryTerm = "";

http.get(url, function(res) {

    var body = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
      // parse JSON
        var obj = eval("(" + body + ")");
        for (var i = 0; i < obj.results.length; i ++) {
          var deliciousTags = obj.results[i].deliciousTags;
          var feedId = obj.results[i].feedId;
          var language = obj.results[i].language;
          var title = obj.results[i].title;
          var velocity = obj.results[i].velocity;
          var subscribers = obj.results[i].subscribers;
          var lastUpdated = obj.results[i].lastUpdated;
          var website = obj.results[i].website;
          var description = obj.results[i].description;
          var iconUrl = obj.results[i].iconUrl;
          var twitterScreenName = obj.results[i].twitterScreenName;
          var coverColor = obj.results[i].coverColor;
          var twitterFollowers = obj.results[i].twitterFollowers;
          var related = obj.related;

          console.log = function(feedId) {
            document.getElementById('content').innerHTML += obj.results[i].feedId + "<br>";
          };
          console.log(feedId);
          console.log(language);
          console.log(title);

        }

    });

}).on('error', function(e) {
    console.log(e.message);
});
