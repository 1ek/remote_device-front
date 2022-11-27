FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN chown -R node /app/node_modules

VOLUME ./

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]