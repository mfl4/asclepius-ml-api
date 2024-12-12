FROM node:22-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY /src /app/src

FROM gcr.io/distroless/nodejs22

WORKDIR /app
COPY --from=build /app /app
COPY .env /app

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]