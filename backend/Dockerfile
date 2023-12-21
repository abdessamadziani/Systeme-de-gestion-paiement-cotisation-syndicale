#  Dockerfile for Node Express Backend

FROM node:18-alpine

# Create App Directory
WORKDIR /app/backend


COPY . .

# RUN npm config set proxy null
# RUN npm config set https-proxy null
# RUN npm set registry=https://registry.npmjs.org/


RUN npm install --force

# Copy app source code


# Exports
EXPOSE 8000

CMD ["npm","run","dev"]