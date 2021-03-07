FROM node:current-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
ARG API_BASE_ROUTE
ENV API_BASE_ROUTE=${API_BASE_ROUTE}
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:current-alpine AS production
ARG API_BASE_ROUTE
ENV API_BASE_ROUTE=${API_BASE_ROUTE}
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

CMD npm run start