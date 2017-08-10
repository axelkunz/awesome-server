# use image that includes node and npm
# FROM node:boron
FROM mhart/alpine-node:latest

# Create app directory inside the image
# if using . it refers to this workdir
WORKDIR /usr/src/app

# install global dependencies like angular-cli or nodemon

# Install app dependencies
# copied files are being watched for changes
COPY package.json .
COPY yarn.lock .
RUN yarn

# Bundle app source
# the first . is where the Dockerfile is located
COPY . .

# port used by express
EXPOSE 3000

CMD ["npm", "run", "start-server"]