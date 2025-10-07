# Base image
FROM node:20.17.0-alpine3.19

# Set working directory
WORKDIR /home/app/

# Copying the source code to docker image
COPY package-lock.json package-lock.json
COPY package.json package.json

# Install node modules
RUN npm install

COPY index.ts index.ts
COPY tsconfig.json tsconfig.json
COPY Dockerfile Dockerfile

EXPOSE 8000-8010

CMD ["npm", "start"]