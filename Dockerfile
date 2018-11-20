FROM node:alpine
RUN npm install typescript -g
RUN npm install pm2 -g
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run tsc

EXPOSE 8201

CMD pm2 start app.json ; /bin/sh