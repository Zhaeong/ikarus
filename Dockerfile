FROM node:14.15.4-alpine

RUN mkdir -p /usr/src/ikarus
WORKDIR /usr/src/ikarus

RUN apk update && apk upgrade
RUN apk add git
RUN apk add python make g++

COPY ./ikarus /usr/src/ikarus
RUN npm install

RUN npm run build


#EXPOSE 3000
ENV HOST=0.0.0.0

ENV PORT=$PORT

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=$PORT

CMD npm start -- --port=$PORT --host='0.0.0.0'