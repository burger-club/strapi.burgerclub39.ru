FROM strapi/base

WORKDIR /my-path

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install --frozen-lockfile \
   && yarn cache clean

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
