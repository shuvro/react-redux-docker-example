FROM node:8.17
RUN apt-get update
RUN apt-get install -y apt-transport-https ca-certificates

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y --no-install-recommends yarn

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN yarn install
EXPOSE 3000
CMD yarn start
