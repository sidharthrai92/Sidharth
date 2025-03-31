FROM node:22-alpine3.19 AS client-build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]
