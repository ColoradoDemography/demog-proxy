
// docker run --name demogproxy -v /home/dola_gcp:/ssl/docker --link website:website -p 443:443 -d codemog/demog-proxy


var sslobj={
        port: 443,
        key: 'home/dola_gcp/server.key',
        cert: 'home/dola_gcp/server.crt'
};

var redbird = require('redbird')({ port: 443, xfwd: false, ssl: sslobj });

redbird.register('23.236.54.199', 'http://website:4008', {ssl: true});



// var proxy = require('redbird')({port: 80, xfwd: false});


// // Route from hostnames as well as paths
// proxy.register("23.236.54.199", "http://website:4008", {ssl: true});
