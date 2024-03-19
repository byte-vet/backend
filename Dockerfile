FROM node:21-alpine3.18

RUN mkdir -p /src

WORKDIR /src

COPY ./package.json ./package-lock.json ./ 

RUN npm install

COPY src/ .

EXPOSE 3000

CMD ["npm", "start"]