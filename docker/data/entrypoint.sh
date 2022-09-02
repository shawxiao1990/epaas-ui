#!/bin/sh
set -e

export NAMESERVER=`cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' '`

env

#supervisord -c /etc/supervisord.conf
/home/nginx/build/dist/run_nginx.sh $@
