FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install pm2 -g && npm install && npm cache clean --force --loglevel=error && pm2 install typescript

COPY ./ ./

CMD ["npm", "run", "watch"]
