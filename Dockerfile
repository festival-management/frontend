FROM node:18.20.3-alpine as build
ARG VITE_BASE_URL
ARG VITE_DEFAULT_LIMIT_VALUE
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_DEFAULT_LIMIT_VALUE=$VITE_DEFAULT_LIMIT_VALUE
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]