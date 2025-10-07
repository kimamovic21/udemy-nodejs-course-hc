# Base image
FROM ubuntu

# Install Node.js
RUN apt-get update
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install -y nodejs
RUN npx tsx

# Copying the source code to docker image
COPY index.ts /home/app/index.ts
COPY package-lock.json /home/app/package-lock.json
COPY package.json /home/app/package.json
COPY tsconfig.json /home/app/tsconfig.json

# Set working directory
WORKDIR /home/app/

# Install node modules
RUN npm install
