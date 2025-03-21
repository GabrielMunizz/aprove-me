FROM node:20.10.0-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start"]