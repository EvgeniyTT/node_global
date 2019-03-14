FROM node:latest

WORKDIR /node_global
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build

WORKDIR /node_global/dist
EXPOSE 8080
CMD ["npm", "start"]