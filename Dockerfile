# Stage 1: Build dependencies
FROM node:22-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY /src /usr/src/app/src

# Set the host and port
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000
CMD ["npm","start"]