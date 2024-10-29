FROM node:23

WORKDIR /app/client

RUN npm init -y

RUN npm install -D typescript @types/express @types/node

RUN sed -i 's/"scripts": {/"scripts": { "start": "echo \\"Le serveur React démarre...\\" && tail -f \/dev\/null",/' package.json
EXPOSE 3000

CMD ["npm", "start"]