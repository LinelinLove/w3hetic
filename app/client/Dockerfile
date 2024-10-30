# FROM node:21 as dev

# WORKDIR /app/client

# COPY package.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:21-alpine as dev
WORKDIR /app/client
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]