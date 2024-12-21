# FROM node:22-alpine 
FROM node:22
# RUN apk update && apk add bind-tools

WORKDIR /App

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]