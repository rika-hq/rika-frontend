FROM node:18.18-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]