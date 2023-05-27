FROM node:18.16.0-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "start"]