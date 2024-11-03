FROM node:18.20.3-alpine as build
ARG VITE_BASE_URL
ARG VITE_DEFAULT_LIMIT_VALUE
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_DEFAULT_LIMIT_VALUE=$VITE_DEFAULT_LIMIT_VALUE
WORKDIR /app
COPY . .
RUN echo "VITE_BASE_URL=$VITE_BASE_URL" > .env && \
    echo "VITE_DEFAULT_LIMIT_VALUE=$VITE_DEFAULT_LIMIT_VALUE" >> .env
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]