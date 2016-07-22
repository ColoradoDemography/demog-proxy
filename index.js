
// docker run --name demogproxy -v /home/dola_gcp:/ssl/docker --link website:website -p 443:443 -d codemog/demog-proxy


var sslobj={
        port: 443,
        key: 'home/dola_gcp/server.key',
        cert: 'home/dola_gcp/server.crt'
};

var redbird = require('redbird')({
  port: 443,
  ssl: sslobj
});

redbird.register('demography.dola.colorado.gov/', 'http://website:4008', {ssl: true});

