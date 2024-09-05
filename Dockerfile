FROM node:22.8.0-bookworm-slim
WORKDIR /var/www/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./ .
COPY ./config.prod.js /var/www/app/config.js
RUN ["npm", "run", "build"]
ENTRYPOINT ["npm", "run", "start"]
