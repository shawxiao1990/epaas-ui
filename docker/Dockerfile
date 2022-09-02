# Step 1
FROM harbor.emotibot.com/image-base/node:10.9.0-jessie AS build-env
MAINTAINER bingjunxiao

# RUN cd build && npm --registry https://registry.npm.taobao.org install

# Build Context should be repo's top level
# ADD . build

ADD build build/build
ADD config build/config
ADD static build/static
ADD src build/src
ADD .babelrc .postcssrc.js .eslintrc.js .eslintignore index.html package.json build/
# ADD docker/health_check.sh build/health_check.sh
RUN cd build && npm --registry https://registry.npm.taobao.org install && npm run build
# ADD dist build/dist

# Step 2

FROM harbor.emotibot.com/image-base/alpine-nginx:v1.20.1_20210608

USER nginx

RUN mkdir -p /home/nginx/build/dist

WORKDIR /home/nginx/build/dist

RUN touch check.do

COPY /docker/data/conf/nginx.conf.template /etc/nginx/conf/nginx.conf.template

COPY --from=build-env /build/dist/index.html /home/nginx/build/dist/
COPY --from=build-env /build/dist/login.html /home/nginx/build/dist/
COPY --from=build-env /build/dist/version.html /home/nginx/build/dist/
COPY --from=build-env /build/dist/static /home/nginx/build/dist/static

COPY /docker/data/entrypoint.sh entrypoint.sh
COPY /docker/data/run_nginx.sh run_nginx.sh

# ARG ARG_build_env
# RUN echo "${ARG_build_env}" > /build/dist/uiversion.html

HEALTHCHECK CMD curl -f http://localhost:1080/ || exit 1
ENTRYPOINT ["./entrypoint.sh"]
