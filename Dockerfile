FROM node:20-alpine

ENV NODE_ENV development

RUN apk add --no-cache libc6-compat

# add turborepo
RUN npm install -g turbo

# Set working directory
WORKDIR /app

COPY  ["package-lock.json", "package.json", "./"] 

COPY . .

RUN npm install

EXPOSE 3005 3006 3001 3000

CMD ["npm", "run", "dev:docker"]