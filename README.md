# demog-proxy
Proxy container for demography.dola.colorado.gov

The purpose of this container is to route port 4008 (the internal port that the Demography Website is running from) to port 443, and to add SSL encryption in the process.

This is accomplished very efficiently using the NPM [Redbird](https://github.com/OptimalBits/redbird) library.



Free SSL is provided by [Let's Encrypt](https://letsencrypt.org/).  In the 'Spirit of Docker', all updates to SSL can be run through a temporary Docker container that is executed, then removed.  To update SSL, the demogproxy container must be temporarily stopped.

The full SSL update process is as follows:

```
docker stop demogproxy

docker run -it --rm -p 443:443 -p 80:80 --name certbot -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" quay.io/letsencrypt/letsencrypt:latest renew

docker restart demogproxy
```

Adapted from: http://letsencrypt.readthedocs.io/en/latest/using.html#running-with-docker
