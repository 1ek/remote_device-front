FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

VOLUME ./

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]