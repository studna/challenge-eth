FROM node:latest

WORKDIR /app

COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["node", "/app/src/index.js"]