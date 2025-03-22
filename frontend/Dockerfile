FROM node:18-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN yarn install --immutable

COPY . .
COPY next.config.ts ./next.config.ts

# RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
