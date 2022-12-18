FROM node:16.16.0-alpine

USER root
WORKDIR /usr/local
COPY *.json ./
COPY *.js ./

RUN npm install
ENV PATH /usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app
COPY app ./

EXPOSE 3000
USER node

#ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["npm", "start"]
