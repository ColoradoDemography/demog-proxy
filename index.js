
// docker run --name demogproxy -v /home/dola_gcp:/ssl/docker --link website:website -p 443:443 -p 80:80 -d codemog/demog-proxy

var LEX = require('letsencrypt-express').testing();

// Change these two lines!
var DOMAIN = 'demography.dola.colorado.gov';
var EMAIL = 'royhobbstn@yahoo.com';

console.log('homedir: ' + require('os').homedir());

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc'
, approveRegistration: function (hostname, approve) { // leave `null` to disable automatic registration
    if (hostname === DOMAIN) { // Or check a database or list of allowed domains
      approve(null, {
        domains: [DOMAIN]
      , email: EMAIL
      , agreeTos: true
      });
      continueprogram();
    }
  }
});



function continueprogram(){
  
  console.log('continue-ing');
  
// http://heyrod.com/snippets/redirect-http-to-https-in-expressjs.html
var http = require('http');
var express = require('express');
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
        key: 'ssl/docker/server.key',
        cert: 'ssl/docker/server.crt' //,  
        //ca: 'ssl/docker/ChainBundle2.crt'
};

var redbird = require('redbird')({ port: 443, xfwd: false, ssl: sslobj });
redbird.register('demography.dola.colorado.gov', 'http://website:4008', {ssl: true});



  
}
