# FROM node:18-alpine as prod
# ENV NODE_ENV prod
# USER node
# WORKDIR /usr/src/app
# COPY --chown=node:node package*.json ./
# RUN npm ci
# COPY --chown=node:node . .
# RUN npm run build
# CMD [ "node", "dist/main.js" ]



FROM node:18-alpine
ENV NODE_ENV dev
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]