FROM nginx
ADD ./docker/default.conf /etc/nginx/conf.d/default.conf

ADD ./dist/* /usr/share/nginx/html/

ADD ./docker/init /init
CMD /init
