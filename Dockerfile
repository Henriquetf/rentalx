FROM node:lts

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333
EXPOSE 9229

USER node

CMD ["yarn", "dev"]
