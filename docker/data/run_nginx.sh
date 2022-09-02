#!/bin/sh

mkdir -p /var/lib/nginx/tmp/client_body


cd /etc/nginx/conf
rm nginx.conf

envsubst '
$$NAMESERVER
' < /etc/nginx/conf/nginx.conf.template > /etc/nginx/conf/nginx.conf
nginx -t
nginx -g "daemon off;"

