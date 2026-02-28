FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build:storybook

# --- production stage ---
FROM nginx:alpine

COPY --from=builder /app/storybook-static /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]