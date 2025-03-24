FROM node:18-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .
COPY next.config.mjs ./next.config.mjs
COPY tailwind.config.ts ./tailwind.config.ts

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
