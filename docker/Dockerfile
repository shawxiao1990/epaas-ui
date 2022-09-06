# Step 1
FROM harbor.emotibot.com/image-base/node:10.9.0-jessie AS build-env

# RUN cd build && npm --registry https://registry.npm.taobao.org install

# Build Context should be repo's top level
# ADD . build

ADD build build/build
#ADD config build/config
#ADD static build/static
ADD src build/src
ADD package.json build/
ADD webpack.config.js build/
ADD .eslintignore .eslintrc.js babel.config.js jest.config.js jsconfig.json postcss.config.js build/
# ADD docker/health_check.sh build/health_check.sh
RUN cd build && npm --registry https://registry.npm.taobao.org install && npm run webpack-cli
# ADD dist build/dist

# Step 2

FROM harbor.emotibot.com/image-base/alpine-nginx:v1.20.1_20210608



RUN mkdir -p /home/nginx/build/dist  && chown -R nginx:nginx /home/nginx

WORKDIR /home/nginx/build/dist

#RUN touch check.do

COPY --chown=nginx:nginx /docker/data/conf/nginx.conf.template /etc/nginx/conf/nginx.conf.template

COPY --from=build-env --chown=nginx:nginx /build/dist/ /home/nginx/build/dist/

COPY /docker/data/entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

# ARG ARG_build_env
# RUN echo "${ARG_build_env}" > /build/dist/uiversion.html

HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
ENTRYPOINT ["./entrypoint.sh"]
