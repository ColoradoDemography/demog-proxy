
//   docker run --name demogproxy -v /etc/letsencrypt/archive/demography.dola.colorado.gov:/ssl/docker --link website:website -p 443:443 -p 80:80 -d codemog/demog-proxy

  
// http://heyrod.com/snippets/redirect-http-to-https-in-expressjs.html
var http = require('http');
var express = require('express');
const { constants } = require('crypto');
var HTTP_PORT  = 80;
var HTTPS_PORT = 443;

var http_app = express();
http_app.set('port', HTTP_PORT);

http_app.all('/*', function(req, res, next) {
  if (/^http$/.test(req.protocol)) {
    var host = req.headers.host.replace(/:[0-9]+$/g, ""); // strip the port # if any
    if ((HTTPS_PORT != null) && HTTPS_PORT !== 443) {
      return res.redirect("https://" + host + ":" + HTTPS_PORT + req.url, 301);
    } else {
      return res.redirect("https://" + host + req.url, 301);
    }
  } else {
    return next();
  }
});

http.createServer(http_app).listen(HTTP_PORT).on('listening', function() {
  return console.log("HTTP to HTTPS redirect app launched.");
});

// redbird

var sslobj={
        port: 443,
        key: 'ssl/docker/privkey37.pem',
        cert: 'ssl/docker/fullchain37.pem',  
        ca: 'ssl/docker/chain36.pem',
        secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
};

var redbird = require('redbird')({ port: 443, xfwd: false, ssl: sslobj });
redbird.register('demography.dola.colorado.gov', 'http://website2:4020', {ssl: true});
//redbird.register('demography.dola.colorado.gov', 'http://website:4008', {ssl: true});
redbird.register('demography.dola.colorado.gov/apps', 'http://shiny-server:3838', {ssl: true});

