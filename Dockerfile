FROM node:latest
WORKDIR /app/

RUN npm i -g typescript

COPY package*.json /app/
RUN npm i

COPY . /app/
RUN tsc

ENV PORT 5000
EXPOSE $PORT
CMD ["node", "dist/index.js"]
