FROM node:latest
RUN mkdir -p -v /usr/src/app
WORKDIR /usr/src/app
RUN npm i -g @nestjs/cli
COPY package.json /usr/src/app
RUN npm install
EXPOSE 6000
ENTRYPOINT ['npm', 'start']