FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

RUN npm prune --production && \
    npm uninstall -g @nestjs/cli

EXPOSE 3000

CMD ["node", "dist/main"]