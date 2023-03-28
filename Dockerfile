FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY dist dist
COPY apps apps

EXPOSE 7000

VOLUME ["/app/apps", "/app/runtime"]

ENV NODE_ENV development

CMD ["node", "dist/lib/backend/start.js"]
