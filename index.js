
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
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

redbird.register('demography.dola.colorado.gov/', 'http://website:4008', {ssl: true});

