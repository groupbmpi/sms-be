FROM node:current-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY tsconfig*.json ./
COPY . .
RUN npm run prisma:generate
RUN npm run build


FROM node:current-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add --no-cache tini
WORKDIR /usr/src/app
COPY package*.json ./
RUN chown -R node:node .
USER node
COPY --chown=node:node --from=builder /usr/src/app/prisma/ prisma/
RUN npm install --only=production
COPY --chown=node:node --from=builder /usr/src/app/dist/ dist/
EXPOSE 3002
ENTRYPOINT [ "npm", "run", "start" ]%
FROM node:current-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY tsconfig*.json ./
COPY . .
RUN npm run prisma:generate
RUN npm run build


FROM node:current-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add --no-cache tini
WORKDIR /usr/src/app
COPY package*.json ./
RUN chown -R node:node .
USER node
COPY --chown=node:node --from=builder /usr/src/app/prisma/ prisma/
RUN npm install --only=production
COPY --chown=node:node --from=builder /usr/src/app/dist/ dist/
EXPOSE 3002
ENTRYPOINT [ "npm", "run", "start" ]%