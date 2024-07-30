FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["./wait-for-it.sh", "postgres:5432", "--", "npm", "run", "start:dev"]