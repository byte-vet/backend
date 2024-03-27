FROM node:21-alpine3.18

RUN mkdir -p /app/

WORKDIR /app/src 

COPY ./package*.json ./ 

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start" ]
