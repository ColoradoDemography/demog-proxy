
// docker run --name demogproxy --link website:website -p 443:4008 -d codemog/demog-proxy
// change 80 to 443 when SSL installed

var sslobj={
        port: 443,
        key: 'ssl/docker/gis_dola_colorado_gov.key',
        cert: 'ssl/docker/ServerCertificate.crt',
        ca: 'ssl/docker/ChainBundle2.crt'
};

var redbird = require('redbird')({
  port: 443
  ,ssl: sslobj
});

redbird.register('23.236.54.199/', 'http://website:4008', {ssl: true});

