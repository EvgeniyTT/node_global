FROM node:latest

WORKDIR /node_global
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

WORKDIR /node_global/dist
EXPOSE 3000
CMD ["npm", "start"]