
// docker run --name demogproxy -v /home/dola_gcp:/ssl/docker --link website:website -p 443:443 -d codemog/demog-proxy


var sslobj={
        port: 443,
        key: 'ssl/docker/server.key',
        cert: 'ssl/docker/server.crt' //,  
        //ca: 'ssl/docker/ChainBundle2.crt'
};

var redbird = require('redbird')({ port: 443, xfwd: false, ssl: sslobj });
redbird.register('demography.dola.colorado.gov', 'http://website:4008', {ssl: true});


var http = require('redbird')({ port: 80 });
http.register('demography.dola.colorado.gov', 'https://demography.dola.colorado.gov');
