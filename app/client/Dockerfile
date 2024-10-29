FROM node:23 as dev

WORKDIR /app/client

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]