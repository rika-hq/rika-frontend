FROM node:18-alpine3.15 AS builder

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
WORKDIR /usr/share/nginx
COPY --from=builder /app/dist /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf