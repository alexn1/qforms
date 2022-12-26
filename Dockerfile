FROM node:16-alpine
#FROM node:16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --production

COPY . .

EXPOSE 3000

VOLUME [ "/app/runtime" ]

ENV NODE_ENV development

CMD ["node", "dist/lib/backend/start.js", "host=0.0.0.0"]
