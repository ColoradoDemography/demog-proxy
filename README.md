# demog-proxy
Proxy container for demography.dola.colorado.gov

The purpose of this container is to route port 4008 (the internal port that the Demography Website is running from) to port 443, and to add SSL encryption in the process.

This is accomplished very efficiently using the NPM [Redbird](https://github.com/OptimalBits/redbird) library.



Free SSL is provided by [Let's Encrypt](https://letsencrypt.org/).  In the 'Spirit of Docker', all updates to SSL can be run through a temporary Docker container that is executed, then removed.  To update SSL, the demogproxy container must be temporarily stopped.

The full SSL update process is as follows:

1) Change the digits in the sslobj variable in the index.js file to increase by 1 digit (e.g. cert2.pem becomes cert3.pem) the commit and wait for the image to rebuild on dockerhub.


2) Run these commands:

```
docker stop demogproxy

docker rm demogproxy

docker run -it --rm -p 443:443 -p 80:80 --name certbot -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" quay.io/letsencrypt/letsencrypt:latest renew

docker pull codemog/demog-proxy 

docker run --restart unless-stopped  --name demogproxy -v /etc/letsencrypt/archive/demography.dola.colorado.gov:/ssl/docker --link website:website -p 443:443 -p 80:80 -d codemog/demog-proxy

```

3) Check expiration dates:

```
openssl x509 -noout -dates -in /etc/letsencrypt/live/demography.dola.colorado.gov/cert.pem

```

__USE THIS SITE IF YOU NEED A NEW CERTIFICATE__

Adapted from: http://letsencrypt.readthedocs.io/en/latest/using.html#running-with-docker

&

https://certbot.eff.org/docs/using.html#renewal
