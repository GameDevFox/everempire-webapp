FROM nginx
ADD ./docker/default.conf /etc/nginx/conf.d/default.conf
ADD ./docker/init /init

ADD ./dist /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/
CMD /init
