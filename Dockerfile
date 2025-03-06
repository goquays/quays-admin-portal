FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder

ARG APP_ENV
ARG APP_HOST
ARG APP_CLIENT_KEY

WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules

ENV NEXT_PUBLIC_CLIENT_KEY=$APP_CLIENT_KEY
ENV NEXT_PUBLIC_BASE_URL=$APP_HOST
ENV NEXT_PUBLIC_APP_STAGE=$APP_ENV

RUN echo "App host url is $APP_HOST"

RUN yarn build

FROM node:lts as runner
WORKDIR /my-project

# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /my-project/next.config.mjs ./
COPY --from=builder /my-project/postcss.config.mjs ./
COPY --from=builder /my-project/eslint.config.mjs ./
COPY --from=builder /my-project/.prettierrc.js ./
COPY --from=builder /my-project/tailwind.config.ts ./
COPY --from=builder /my-project/tsconfig.json ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
