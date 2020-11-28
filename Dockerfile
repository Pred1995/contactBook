FROM node:10-alpine
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app
COPY . .
RUN npm set progress=false && npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]
