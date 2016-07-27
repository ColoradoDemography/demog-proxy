# demog-proxy
Proxy container for demography.dola.colorado.gov




Free SSL is provided by [Let's Encrypt](https://letsencrypt.org/).  In the Spirit of Docker, all updates to SSL can be run through a temporary Docker container that is executed, then removed.  To update SSL, the demogproxy container must be temporarily stopped.

The full SSL update process is as follows:

```

docker stop demogproxy

docker run -it --rm -p 443:443 -p 80:80 --name certbot -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" quay.io/letsencrypt/letsencrypt:latest renew

docker restart demogproxy


```
