FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG MONGO_URI
ENV MONGO_URI=$MONGO_URI

EXPOSE 5000

CMD ["npm", "start"]