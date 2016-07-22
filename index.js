
// docker run --name demogproxy -v /home/dola_gcp:/ssl/docker --link website:website -p 443:443 -d codemog/demog-proxy


var sslobj={
        port: 443,
        key: 'ssl/docker/gis_dola_colorado_gov.key',
        cert: 'ssl/docker/ServerCertificate.crt',
        ca: 'ssl/docker/ChainBundle2.crt'
};

var redbird = require('redbird')({
  port: 80//,
  //ssl: sslobj
});

redbird.register('demography.dola.colorado.gov/', 'http://website:4008', {ssl: false});

