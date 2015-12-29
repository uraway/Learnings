// Generated by CoffeeScript 1.10.0
(function() {
  var HatenaBlog, _, https, moment, request;

  https = require('https');

  request = require('request');

  moment = require('moment');

  _ = require('underscore');

  module.exports = HatenaBlog = (function() {
    function HatenaBlog() {
      this.isPublic = null;
      this.description = "";
      this.entryBody = "";
    }

    HatenaBlog.prototype.getHatenaId = function() {
      return atom.config.get("hatena-blog.hatenaId");
    };

    HatenaBlog.prototype.getBlogId = function() {
      return atom.config.get("hatena-blog.blogId");
    };

    HatenaBlog.prototype.getApiToken = function() {
      return atom.config.get("hatena-blog.apiToken");
    };

    HatenaBlog.prototype.post = function(callback) {
      var draftStatus, options, requestBody;
      draftStatus = this.isPublic ? 'no' : 'yes';
      requestBody = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<entry xmlns=\"http://www.w3.org/2005/Atom\"\n       xmlns:app=\"http://www.w3.org/2007/app\">\n  <title>" + this.description + "</title>\n  <author><name>" + (this.getHatenaId()) + "</name></author>\n  <content type=\"text/plain\">\n    " + (_.escape(this.entryBody)) + "\n  </content>\n  <updated>" + (moment().format('YYYY-MM-DDTHH:mm:ss')) + "</updated>\n  <app:control>\n    <app:draft>" + draftStatus + "</app:draft>\n  </app:control>\n</entry>";
      options = {
        hostname: 'blog.hatena.ne.jp',
        path: "/" + (this.getHatenaId()) + "/" + (this.getBlogId()) + "/atom/entry",
        auth: (this.getHatenaId()) + ":" + (this.getApiToken()),
        method: 'POST',
        headers: {
          'Content-Length': Buffer.byteLength(requestBody, 'utf-8')
        }
      };
      request = https.request(options, function(res) {
        var body;
        res.setEncoding("utf8");
        body = '';
        res.on("data", function(chunk) {
          return body += chunk;
        });
        return res.on("end", function() {
          return callback(body);
        });
      });
      request.write(requestBody);
      return request.end();
    };

    return HatenaBlog;

  })();

}).call(this);
