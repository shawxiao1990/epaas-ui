#!/bin/sh
set -e

export NAMESERVER=`cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' '`

env

#supervisord -c /etc/supervisord.conf
cd /etc/nginx/conf
rm nginx.conf

envsubst '
$$NAMESERVER
' < /etc/nginx/conf/nginx.conf.template > /etc/nginx/conf/nginx.conf
nginx -t
nginx -g "daemon off;"