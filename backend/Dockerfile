# use the official node.js image
FROM node:18

# set the working directory in the container
WORKDIR /user/src/app

# copy the package.json and package-lock.json files to the container
COPY package.json ./

# install the dependencies
RUN npm install

# copy the rest of the application files to the container
COPY . .

# Expose backend port 
EXPOSE 3000

# start the application
CMD [ "npm", "start" ]